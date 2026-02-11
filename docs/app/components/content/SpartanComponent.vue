<!-- eslint-disable no-useless-escape -->
<script setup lang="ts">
import * as prettier from "prettier";
import type { ChipProps } from '@nuxt/ui'
import json5 from 'json5'
import { upperFirst, camelCase, kebabCase } from 'scule'
import { hash } from 'ohash'
import { get, set } from '#ui/utils'
const parseMarkdown = useMarkdownParser()

const props = withDefaults(defineProps<{
  prefix?: string
  /** Override the slug taken from the route */
  slug?: string
  class?: any
  /** List of props to ignore in selection */
  ignore?: string[]
  /** List of props to hide from code and selection */
  hide?: string[]
  /** List of props to externalize in script setup */
  external?: string[]
  /** The types of the externalized props */
  externalTypes?: string[]
  /** List of props to use with `v-model` */
  model?: string[]
  /** List of props to cast from code and selection */
  cast?: { [key: string]: string }
  /** List of items for each prop */
  items?: { [key: string]: string[] }
  props?: { [key: string]: any }
  slots?: { [key: string]: any }
  /**
   * Whether to format the code with Prettier
   * @defaultValue true
   */
  prettier?: boolean
  /**
   * Whether to collapse the code block
   * @defaultValue false
   */
  collapse?: boolean
  /**
   * A list of line numbers to highlight in the code block
   */
  highlights?: number[]
  /**
   * Whether to add overflow-hidden to wrapper
   */
  overflowHidden?: boolean
  /**
   * Whether to add background-elevated to wrapper
   */
  elevated?: boolean
}>(), {
  prettier: true
})

const route = useRoute()

const camelName = camelCase(props.slug ?? route.path.split('/').pop() ?? '')
const name = `S${upperFirst(camelName)}`
const component = defineAsyncComponent(() => {
  return import(`../../../../src/components/spartan/${name}/${name}.vue`)
})

const componentProps = reactive({
  ...Object.fromEntries(Object.entries(props.props || {}).map(([key, value]) => {
    return [key, value]
  }))
})
const componentEvents = reactive({
  ...Object.fromEntries((props.model || []).map(key => [`onUpdate:${key}`, (e: any) => setComponentProp(key, e)])),
  ...(componentProps.modelValue ? { [`onUpdate:modelValue`]: (e: any) => setComponentProp('modelValue', e) } : {})
})
const componentSlots = reactive({
  ...Object.fromEntries(Object.entries(props.slots || {}).map(([key, value]) => [key, value]))
})

function getComponentProp(name: string) {
  return get(componentProps, name) ?? undefined
}

function setComponentProp(name: string, value: any) {
  set(componentProps, name, value)
}

function getComponentSlot(name: string) {
  return get(componentSlots, name) ?? undefined
}

function setComponentSlot(name: string, value: any) {
  set(componentSlots, name, value)
}

function mapKeys(obj: object, parentKey = ''): any {
  return Object.entries(obj || {}).flatMap(([key, value]: [string, any]) => {
    if (typeof value === 'object' && !Array.isArray(value)) {
      return mapKeys(value, key)
    }

    const fullKey = parentKey ? `${parentKey}.${key}` : key

    return !props.ignore?.includes(fullKey) && !props.hide?.includes(fullKey) ? fullKey : undefined
  }).filter(Boolean)
}

const options = computed(() => {
  const keys = mapKeys(props.props || {})

  const propOptions = keys.map((key: string) => {
    const propItems = get(props.items, key, [])
    const currentValue = get(componentProps, key)

    let items = []

    // If items are explicitly provided, use them
    if (propItems.length) {
      items = propItems.map((item: any) => ({
        value: item,
        label: String(item),
        chip: key.toLowerCase().endsWith('color') ? { color: item } : undefined
      }))
    }
    // If the current value is boolean, provide true/false options
    else if (typeof currentValue === 'boolean') {
      items = [
        { value: true, label: 'true' },
        { value: false, label: 'false' }
      ]
    }
    // Otherwise, check for theme variants
    else {
      items = Object.keys({}).filter((variant) => {
        return variant !== 'true' && variant !== 'false'
      }).map(variant => ({
        value: variant,
        label: variant,
        chip: key.toLowerCase().endsWith('color') ? { color: variant } : undefined
      }))
    }

    return {
      name: key,
      label: key,
      type: props?.cast?.[key],
      items,
      isSlot: false
    }
  })

  const slotOptions = Object.keys(props.slots || {})
    .filter(key => !props.hide?.includes(key))
    .map(key => ({
      name: key,
      label: `slot:${key}`,
      type: 'string',
      items: [],
      isSlot: true
    }))

  return [...propOptions, ...slotOptions]
})

const code = computed(() => {
  let code = ''

  if (props.collapse) {
    code += `::code-collapse
`
  }

  code += `\`\`\`vue${props.highlights?.length ? ` {${props.highlights.join('-')}}` : ''}`

  if (props.external?.length) {
    code += `
<script setup lang="ts">
`
    // Collect imports from cast types
    const importsBySource = new Map<string, Set<string>>()

    // Generate import statements
    for (const [source, names] of importsBySource) {
      code += `import { ${Array.from(names).join(', ')} } from '${source}'
`
    }

    if (props.externalTypes?.length) {
      const removeArrayBrackets = (type: string): string => type.endsWith('[]') ? removeArrayBrackets(type.slice(0, -2)) : type

      const types = props.externalTypes.map(type => removeArrayBrackets(type))
      code += `import type { ${types.join(', ')} } from '@nuxt/ui'
`
    }

    if (importsBySource.size > 0 || props.externalTypes?.length) {
      code += `
`
    }

    for (const [i, key] of props.external.entries()) {
      const cast = props.cast?.[key]
      const value = json5.stringify(componentProps[key], null, 2)?.replace(/,([ |\t\n]+[}|\]])/g, '$1')
      const type = props.externalTypes?.[i] ? `<${props.externalTypes[i]}>` : ''
      const refType = cast ? 'shallowRef' : 'ref'

      code += `const ${key === 'modelValue' ? 'value' : key} = ${refType}${type}(${value})
`
    }
    code += `<\/script>
`
  }

  code += `
<template>
  <${name}`
  for (const [key, value] of Object.entries(componentProps)) {
    if (key === 'modelValue') {
      code += ` v-model="value"`
      continue
    }

    if (props.model?.includes(key)) {
      code += ` v-model:${key}="${key}"`
      continue
    }

    if (value === undefined || value === null || value === '' || props.hide?.includes(key)) {
      continue
    }

    const propName = kebabCase(key)

    if (typeof value === 'boolean') {
      code += value ? ` ${propName}` : ` :${propName}="false"`
    } else if (typeof value === 'object') {
      const parsedValue = !props.external?.includes(key) ? json5.stringify(value, null, 2).replace(/,([ |\t\n]+[}|\]])/g, '$1') : key
      code += ` :${propName}="${parsedValue}"`
    } else {
      code += ` ${typeof value === 'number' ? ':' : ''}${propName}="${value}"`
    }
  }

  if (componentSlots && Object.keys(componentSlots).length > 0) {
    code += `>`
    for (const [key, value] of Object.entries(componentSlots)) {
      if (key === 'default') {
        code += componentSlots.default
      } else {
        code += `
  <template #${key}>
    ${value}
  </template>\n`
      }
    }
    code += (Object.keys(componentSlots).length > 1 ? '\n' : '') + `</${name}>`
  } else {
    code += ' />'
  }
  code += `\n</template>
\`\`\`
`

  if (props.collapse) {
    code += `
::`
  }

  return code
})

const codeKey = computed(() => `component-code-${name}-${hash(props)}`)

const { data: ast } = await useAsyncData(codeKey, async () => {
  if (!props.prettier) {
    return parseMarkdown(code.value)
  }

  let formatted = ''
  try {
    formatted = await prettier.format(code.value, {
      trailingComma: 'none',
      semi: false,
      singleQuote: true,
      printWidth: 100,
      parser: 'vue',
      htmlWhitespaceSensitivity: 'ignore',
    })
  } catch {
    formatted = code.value
  }

  return parseMarkdown(formatted)
}, { watch: [code] })
</script>

<template>
  <div class="my-5" :style="{ '--ui-header-height': '4rem' }">
    <div ref="wrapperContainer" class="relative group/component">
      <div v-if="options.length" class="flex flex-wrap items-center gap-2.5 border border-muted border-b-0 relative rounded-t-md px-4 py-2.5 overflow-x-auto">
        <template v-for="option in options" :key="option.name">
          <UFormField
            :label="option.label"
            size="sm"
            class="inline-flex ring ring-accented rounded-sm"
            :ui="{
              wrapper: 'bg-elevated/50 rounded-l-sm flex border-r border-accented',
              label: 'text-muted px-2 py-1.5',
              container: 'mt-0'
            }"
          >
            <USelect
              v-if="option.items?.length && !option.isSlot"
              :model-value="getComponentProp(option.name)"
              :items="option.items"
              value-key="value"
              color="neutral"
              variant="soft"
              class="rounded-sm rounded-l-none min-w-12"
              :class="[option.name.toLowerCase().endsWith('color') && 'pl-6']"
              :ui="{ itemLeadingChip: 'w-2' }"
              @update:model-value="setComponentProp(option.name, $event)"
            >
              <template v-if="option.name.toLowerCase().endsWith('color')" #leading="{ modelValue, ui }">
                <UChip
                  v-if="modelValue"
                  inset
                  standalone
                  :color="(modelValue as any)"
                  :size="(ui.itemLeadingChipSize() as ChipProps['size'])"
                  class="size-2"
                />
              </template>
            </USelect>
            <UInput
              v-else
              :type="!option.isSlot && option.type?.includes('number') && typeof getComponentProp(option.name) === 'number' ? 'number' : 'text'"
              :model-value="option.isSlot ? getComponentSlot(option.name) : getComponentProp(option.name)"
              color="neutral"
              variant="soft"
              :ui="{ base: 'rounded-sm rounded-l-none min-w-12' }"
              @update:model-value="option.isSlot ? setComponentSlot(option.name, $event) : setComponentProp(option.name, $event)"
            />
          </UFormField>
        </template>
      </div>

      <div v-if="component" ref="componentContainer" class="flex justify-center border border-b-0 border-muted relative p-4 z-1" :class="[!options.length && 'rounded-t-md', props.class, { 'overflow-hidden': props.overflowHidden, 'dark:bg-neutral-950/50': props.elevated }]">
        <component :is="component" v-bind="{ ...componentProps, ...componentEvents }">
          <template v-for="slot in Object.keys(componentSlots || {})" :key="slot" #[slot]>
            <slot :name="slot" mdc-unwrap="p">
              {{ componentSlots?.[slot] }}
            </slot>
          </template>
        </component>
      </div>
    </div>

    <MDCRenderer v-if="ast" :body="ast.body" :data="ast.data" class="[&_pre]:rounded-t-none! [&_div.my-5]:mt-0!" />
  </div>
</template>