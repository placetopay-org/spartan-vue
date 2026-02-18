<script setup lang="ts">
import { ref, reactive, computed, shallowRef, provide, markRaw, watch, onMounted, onUnmounted } from 'vue'
import type { ChipProps } from '@nuxt/ui'
import type { PreviewStore, ControlDefinition } from '~/composables/usePreview'

const { highlight } = useShikiHighlighter()

const props = withDefaults(defineProps<{
    /** Path relative to docs/examples/, without extension. e.g. "SButton/basic" */
    file: string
    /** Add overflow-hidden to preview area */
    overflowHidden?: boolean
}>(), {})

// ─── 1. PreviewStore — provided to the child example component ────────────────

const store = reactive<PreviewStore>({
    definition: {},
    slotDefinition: {},
    values: {},
    slotValues: {},
    mode: 'feature',
    component: '',
    staticAttrs: {},
    imports: {},
})
provide('spartan-preview', store)

// ─── 2. Load example component + raw source ───────────────────────────────────

const exampleModules = import.meta.glob('../../../examples/**/*.vue')
const rawModules = import.meta.glob('../../../examples/**/*.vue', { query: '?raw', import: 'default' })

const exampleComponent = shallowRef<any>(null)
const rawSource = ref('')
const codeHtml = ref('')
const loadError = ref(false)

async function loadExample(file: string) {
    const key = `../../../examples/${file}.vue`
    const loader = exampleModules[key]
    const rawLoader = rawModules[key]
    if (!loader) {
        loadError.value = true
        console.warn(`[ComponentPreview] Example not found: ${key}`)
        return
    }
    loadError.value = false
    store.definition = {}
    store.slotDefinition = {}
    store.mode = 'feature'
    store.component = ''
    store.staticAttrs = {}
    store.imports = {}
    Object.keys(store.values).forEach(k => delete store.values[k])
    Object.keys(store.slotValues).forEach(k => delete store.slotValues[k])
    const [mod, raw] = await Promise.all([
        loader() as Promise<{ default: any }>,
        rawLoader ? (rawLoader() as Promise<string>) : Promise.resolve(''),
    ])
    exampleComponent.value = markRaw(mod.default)
    rawSource.value = typeof raw === 'string' ? raw : ''
}

await loadExample(props.file)
watch(() => props.file, loadExample)

// ─── 3. Live code generation ──────────────────────────────────────────────────

const liveCode = computed(() => {
    // Extract component name from store or from raw source
    const name = store.component || rawSource.value.match(/<([A-Z]\w+)/)?.[1] || 'Component'
    const attrParts: string[] = []

    for (const [key, ctrl] of Object.entries(store.definition)) {
        const val = store.values[key]
        const def = (ctrl as ControlDefinition).default ?? null
        if ((ctrl as ControlDefinition).type === 'boolean') {
            if (val === true) attrParts.push(key)
            continue
        }
        if (!((ctrl as ControlDefinition).required) && (val === def || val === null || val === undefined)) continue
        if ((ctrl as ControlDefinition).type === 'number') {
            attrParts.push(`:${key}="${val}"`)
        } else {
            attrParts.push(`${key}="${val}"`)
        }
    }

    // Append static attributes (e.g. icons, complex props)
    for (const [attr, val] of Object.entries(store.staticAttrs)) {
        attrParts.push(attr.startsWith(':') ? `${attr}="${val}"` : `${attr}="${val}"`)
    }

    const attrsStr = attrParts.length ? ' ' + attrParts.join(' ') : ''

    // Build slot content — Prettier will handle indentation
    const defaultSlotContent = store.slotValues.default
        ?? (Object.keys(store.slotDefinition).length > 0 ? Object.values(store.slotValues)[0] : undefined)

    let templateCode: string
    if (defaultSlotContent !== undefined) {
        templateCode = !defaultSlotContent
            ? `<${name}${attrsStr} />`
            : `<${name}${attrsStr}>${defaultSlotContent}</${name}>`
    } else {
        // No slot definition — check raw source for text content between tags
        const rawContent = rawSource.value.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)<\\/${name}>`))?.[1]?.trim()
        templateCode = !rawContent
            ? `<${name}${attrsStr} />`
            : `<${name}${attrsStr}>${rawContent}</${name}>`
    }

    // Build import lines grouped by package
    const importEntries = Object.entries(store.imports)
    if (importEntries.length === 0) return templateCode

    const grouped: Record<string, string[]> = {}
    for (const [name, pkg] of importEntries) {
        ;(grouped[pkg] ??= []).push(name)
    }
    const importLines = Object.entries(grouped)
        .map(([pkg, names]) => `import { ${names.join(', ')} } from '${pkg}'`)
        .join('\n')

    // Use \x3C escape for '<' so the Vue SFC parser doesn't detect these as real tags
    return `\x3Cscript setup>\n${importLines}\n\x3C/script>\n\n\x3Ctemplate>\n  ${templateCode}\n\x3C/template>`
})

let _codeHighlightTimer: ReturnType<typeof setTimeout> | null = null

function scheduleHighlight(code: string) {
    if (_codeHighlightTimer !== null) clearTimeout(_codeHighlightTimer)
    _codeHighlightTimer = setTimeout(async () => {
        codeHtml.value = await highlight(code)
        _codeHighlightTimer = null
    }, 150)
}

watch(liveCode, scheduleHighlight, { flush: 'post' })

// Initial highlight once the store is populated (after child mounts)
// We use a nextTick-style watch that fires once
const _stopInitWatch = watch(
    () => [store.component, Object.keys(store.definition).length],
    async () => {
        codeHtml.value = await highlight(liveCode.value)
        _stopInitWatch()
    },
    { immediate: false }
)

// Fallback: highlight raw source when no store definition (no usePreview call)
watch(rawSource, async (src) => {
    if (Object.keys(store.definition).length === 0 && Object.keys(store.slotDefinition).length === 0) {
        codeHtml.value = await highlight(src)
    }
}, { immediate: true })

// ─── 4. UI state ─────────────────────────────────────────────────────────────

const showCode = ref(false)
const copied = ref(false)
const hasControls = computed(() =>
    Object.keys(store.definition).length > 0 ||
    Object.keys(store.slotDefinition).length > 0
)
const hasSlots = computed(() => Object.keys(store.slotDefinition).length > 0)
const isPlayground = computed(() => store.mode === 'playground')

async function copyCode() {
    try {
        await navigator.clipboard.writeText(liveCode.value)
        copied.value = true
        setTimeout(() => { copied.value = false }, 2000)
    } catch {}
}

// ─── 5. Preview resize ───────────────────────────────────────────────────────

const previewAreaRef = ref<HTMLElement | null>(null)
const previewAreaWidth = ref(0)
// null = full width (desktop); number = pixel width of the content zone
const previewWidth = ref<number | null>(null)
const isDragging = ref(false)

const MIN_PREVIEW_WIDTH = 200
// Must match the `w-4` (16px) Tailwind class on the drag handle element
const HANDLE_WIDTH = 16

onMounted(() => {
    const el = previewAreaRef.value
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
        previewAreaWidth.value = entry.contentRect.width
    })
    ro.observe(el)
    onUnmounted(() => ro.disconnect())
})

const isNarrowed = computed(() => previewWidth.value !== null)

// ─── 6. Drag handle ──────────────────────────────────────────────────────────

function updatePreviewWidth(clientX: number) {
    const el = previewAreaRef.value
    if (!el) return
    const containerLeft = el.getBoundingClientRect().left
    const newWidth = Math.round(clientX - containerLeft)
    const maxWidth = previewAreaWidth.value - HANDLE_WIDTH
    if (newWidth >= maxWidth - 10) {
        previewWidth.value = null
    } else {
        previewWidth.value = Math.max(MIN_PREVIEW_WIDTH, newWidth)
    }
}

function onHandleMousedown(e: MouseEvent) {
    e.preventDefault()
    isDragging.value = true
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onPointerEnd)
}

function onHandleTouchstart(e: TouchEvent) {
    e.preventDefault()
    isDragging.value = true
    window.addEventListener('touchmove', onTouchMove, { passive: false })
    window.addEventListener('touchend', onPointerEnd)
    window.addEventListener('touchcancel', onPointerEnd)
}

function onMouseMove(e: MouseEvent) {
    updatePreviewWidth(e.clientX)
}

function onTouchMove(e: TouchEvent) {
    e.preventDefault()
    updatePreviewWidth(e.touches[0].clientX)
}

function onPointerEnd() {
    isDragging.value = false
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseup', onPointerEnd)
    window.removeEventListener('touchmove', onTouchMove)
    window.removeEventListener('touchend', onPointerEnd)
    window.removeEventListener('touchcancel', onPointerEnd)
}

onUnmounted(() => {
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseup', onPointerEnd)
    window.removeEventListener('touchmove', onTouchMove)
    window.removeEventListener('touchend', onPointerEnd)
    window.removeEventListener('touchcancel', onPointerEnd)
})

// ─── 7. Code panel transition (JS hooks for smooth height animation) ──────────

function onCodeEnter(el: Element) {
    const e = el as HTMLElement
    e.style.height = '0'
    e.style.overflow = 'hidden'
    e.style.opacity = '0'
    requestAnimationFrame(() => {
        e.style.transition = 'height 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.3s cubic-bezier(0.4,0,0.2,1)'
        e.style.height = e.scrollHeight + 'px'
        e.style.opacity = '1'
    })
}
function onCodeAfterEnter(el: Element) {
    const e = el as HTMLElement
    e.style.cssText = ''
}
function onCodeLeave(el: Element) {
    const e = el as HTMLElement
    e.style.height = e.scrollHeight + 'px'
    e.style.overflow = 'hidden'
    e.style.opacity = '1'
    requestAnimationFrame(() => {
        e.style.transition = 'height 0.3s cubic-bezier(0.4,0,0.2,1), opacity 0.2s cubic-bezier(0.4,0,0.2,1)'
        e.style.height = '0'
        e.style.opacity = '0'
    })
}
function onCodeAfterLeave(el: Element) {
    const e = el as HTMLElement
    e.style.cssText = ''
}

// ─── 8. Zoom ─────────────────────────────────────────────────────────────────

const manualZoom = ref<number | null>(null)
const zoom = computed(() => manualZoom.value ?? 1)
const zoomPercent = computed(() => Math.round(zoom.value * 100))

function adjustZoom(delta: number) {
    const next = parseFloat(Math.max(0.2, Math.min(2, zoom.value + delta)).toFixed(2))
    manualZoom.value = next
}

function resetZoom() {
    manualZoom.value = null
}

// ─── 9. Animated zoom ────────────────────────────────────────────────────────

const displayZoom = ref(zoom.value)

let _rafId: number | null = null
let _animFrom = zoom.value
let _animTarget = zoom.value
let _animStart = 0
const ANIM_DURATION = 280

function _ease(t: number) { return t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2 }

function _animFrame(now: number) {
    const t = Math.min((now - _animStart) / ANIM_DURATION, 1)
    displayZoom.value = _animFrom + (_animTarget - _animFrom) * _ease(t)
    if (t < 1) {
        _rafId = requestAnimationFrame(_animFrame)
    } else {
        displayZoom.value = _animTarget
        _rafId = null
    }
}

function _startAnim(target: number) {
    if (typeof requestAnimationFrame === 'undefined') { displayZoom.value = target; return }
    if (_rafId !== null) cancelAnimationFrame(_rafId)
    _animFrom = displayZoom.value
    _animTarget = target
    _animStart = performance.now()
    _rafId = requestAnimationFrame(_animFrame)
}

watch(zoom, _startAnim)
onUnmounted(() => { if (_rafId !== null) cancelAnimationFrame(_rafId) })
</script>

<template>
    <div class="my-5" :style="{ '--ui-header-height': '4rem' }">
        <!-- Error state -->
        <div v-if="loadError" class="rounded-md border border-red-300 bg-red-50 p-4 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-400">
            Example file not found: <code class="font-mono">docs/examples/{{ file }}.vue</code>
        </div>

        <template v-else>
            <!-- ══ PLAYGROUND MODE controls (full panel) ════════════════════ -->
            <div
                v-if="hasControls && isPlayground"
                class="rounded-t-md border border-b-0 border-muted overflow-hidden"
            >
                <!-- Props row -->
                <div v-if="Object.keys(store.definition).length > 0" class="px-4 py-3 flex flex-wrap gap-x-5 gap-y-3 items-end border-b border-muted/60">
                    <div class="text-[10px] font-semibold uppercase tracking-widest text-muted self-center shrink-0 w-8">
                        Props
                    </div>
                    <template v-for="(ctrl, key) in store.definition" :key="key">
                        <!-- Select control -->
                        <div v-if="(ctrl as ControlDefinition).type === 'select'" class="flex flex-col gap-1">
                            <label class="text-[10px] font-medium text-muted uppercase tracking-wide">
                                {{ (ctrl as ControlDefinition).label ?? String(key) }}
                            </label>
                            <USelect
                                :model-value="store.values[key]"
                                :items="((ctrl as ControlDefinition).options ?? []).map((o: any) => ({ value: o, label: String(o) }))"
                                value-key="value"
                                color="neutral"
                                variant="soft"
                                size="sm"
                                class="min-w-20"
                                :class="[String(key).toLowerCase().endsWith('color') && 'pl-6']"
                                :ui="{ itemLeadingChip: 'w-2' }"
                                @update:model-value="store.values[key] = $event"
                            >
                                <template v-if="String(key).toLowerCase().endsWith('color')" #leading="{ modelValue, ui }">
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
                        </div>

                        <!-- Boolean control: toggle switch -->
                        <div v-else-if="(ctrl as ControlDefinition).type === 'boolean'" class="flex flex-col gap-1.5">
                            <label class="text-[10px] font-medium text-muted uppercase tracking-wide">
                                {{ (ctrl as ControlDefinition).label ?? String(key) }}
                            </label>
                            <div class="flex items-center h-[30px]">
                                <USwitch
                                    :model-value="store.values[key]"
                                    color="primary"
                                    size="sm"
                                    @update:model-value="store.values[key] = $event"
                                />
                            </div>
                        </div>

                        <!-- Number control -->
                        <div v-else-if="(ctrl as ControlDefinition).type === 'number'" class="flex flex-col gap-1">
                            <label class="text-[10px] font-medium text-muted uppercase tracking-wide">
                                {{ (ctrl as ControlDefinition).label ?? String(key) }}
                            </label>
                            <UInput
                                :model-value="store.values[key]"
                                type="number"
                                :min="(ctrl as ControlDefinition).min"
                                :max="(ctrl as ControlDefinition).max"
                                :step="(ctrl as ControlDefinition).step"
                                color="neutral"
                                variant="soft"
                                size="sm"
                                class="w-20"
                                @update:model-value="store.values[key] = Number($event)"
                            />
                        </div>

                        <!-- Text control -->
                        <div v-else class="flex flex-col gap-1">
                            <label class="text-[10px] font-medium text-muted uppercase tracking-wide">
                                {{ (ctrl as ControlDefinition).label ?? String(key) }}
                            </label>
                            <UInput
                                :model-value="store.values[key]"
                                type="text"
                                color="neutral"
                                variant="soft"
                                size="sm"
                                class="min-w-24"
                                @update:model-value="store.values[key] = $event"
                            />
                        </div>
                    </template>
                </div>

                <!-- Slots row -->
                <div v-if="hasSlots" class="px-4 py-3 flex flex-wrap gap-x-5 gap-y-3 items-end bg-elevated/30">
                    <div class="text-[10px] font-semibold uppercase tracking-widest text-muted self-center shrink-0 w-8">
                        Slots
                    </div>
                    <template v-for="(slotDef, key) in store.slotDefinition" :key="key">
                        <div class="flex flex-col gap-1 flex-1 min-w-32">
                            <label class="text-[10px] font-medium text-muted uppercase tracking-wide">
                                {{ slotDef.label ?? String(key) }}
                            </label>
                            <UInput
                                :model-value="store.slotValues[key]"
                                type="text"
                                color="neutral"
                                variant="soft"
                                size="sm"
                                @update:model-value="store.slotValues[key] = $event"
                            />
                        </div>
                    </template>
                </div>
            </div>

            <!-- ══ FEATURE MODE controls (minimal pill bar) ═════════════════ -->
            <div
                v-else-if="hasControls && !isPlayground"
                class="rounded-t-md border border-b-0 border-muted px-4 py-2.5 flex flex-wrap items-center gap-4"
            >
                <template v-for="(ctrl, key) in store.definition" :key="key">
                    <!-- Select → pill toggle group -->
                    <div v-if="(ctrl as ControlDefinition).type === 'select'" class="flex items-center gap-2">
                        <span class="text-[10px] font-semibold uppercase tracking-widest text-muted shrink-0">
                            {{ (ctrl as ControlDefinition).label ?? String(key) }}
                        </span>
                        <div class="flex items-center gap-1">
                            <button
                                v-for="opt in (ctrl as ControlDefinition).options"
                                :key="String(opt)"
                                class="pill-btn"
                                :class="store.values[key] === opt ? 'pill-btn--active' : 'pill-btn--idle'"
                                @click="store.values[key] = opt"
                            >
                                {{ String(opt) }}
                            </button>
                        </div>
                    </div>

                    <!-- Boolean → toggle switch -->
                    <div v-else-if="(ctrl as ControlDefinition).type === 'boolean'" class="flex items-center gap-2">
                        <span class="text-[10px] font-semibold uppercase tracking-widest text-muted shrink-0">
                            {{ (ctrl as ControlDefinition).label ?? String(key) }}
                        </span>
                        <USwitch
                            :model-value="store.values[key]"
                            color="primary"
                            size="sm"
                            @update:model-value="store.values[key] = $event"
                        />
                    </div>

                    <!-- Number → compact input -->
                    <div v-else-if="(ctrl as ControlDefinition).type === 'number'" class="flex items-center gap-2">
                        <span class="text-[10px] font-semibold uppercase tracking-widest text-muted shrink-0">
                            {{ (ctrl as ControlDefinition).label ?? String(key) }}
                        </span>
                        <UInput
                            :model-value="store.values[key]"
                            type="number"
                            :min="(ctrl as ControlDefinition).min"
                            :max="(ctrl as ControlDefinition).max"
                            :step="(ctrl as ControlDefinition).step"
                            color="neutral"
                            variant="soft"
                            size="xs"
                            class="w-20"
                            @update:model-value="store.values[key] = Number($event)"
                        />
                    </div>

                    <!-- Text → compact input -->
                    <div v-else class="flex items-center gap-2">
                        <span class="text-[10px] font-semibold uppercase tracking-widest text-muted shrink-0">
                            {{ (ctrl as ControlDefinition).label ?? String(key) }}
                        </span>
                        <UInput
                            :model-value="store.values[key]"
                            type="text"
                            color="neutral"
                            variant="soft"
                            size="xs"
                            class="min-w-24"
                            @update:model-value="store.values[key] = $event"
                        />
                    </div>
                </template>

                <!-- Slot text inputs (inline, same style as prop controls) -->
                <template v-for="(slotDef, key) in store.slotDefinition" :key="`slot-${String(key)}`">
                    <div class="flex items-center gap-2">
                        <span class="text-[10px] font-semibold uppercase tracking-widest text-muted shrink-0">
                            {{ slotDef.label ?? String(key) }}
                        </span>
                        <UInput
                            :model-value="store.slotValues[key]"
                            type="text"
                            color="neutral"
                            variant="soft"
                            size="xs"
                            class="min-w-24"
                            @update:model-value="store.slotValues[key] = $event"
                        />
                    </div>
                </template>
            </div>

            <!-- ── Toolbar: zoom ──────────────────────────────────────────── -->
            <div
                class="relative flex items-center border border-b-0 border-muted"
                :class="[!hasControls ? 'rounded-t-md' : '']"
            >
                <!-- Zoom controls — right side -->
                <div class="ml-auto flex items-center gap-0.5 pr-2">
                    <UButton
                        icon="i-lucide-zoom-out"
                        size="xs"
                        variant="ghost"
                        color="neutral"
                        :disabled="zoom <= 0.2"
                        aria-label="Zoom out"
                        @click="adjustZoom(-0.1)"
                    />
                    <button
                        class="w-11 rounded px-1 py-0.5 text-center font-mono text-xs text-muted transition-colors hover:bg-elevated hover:text-highlighted"
                        title="Reset zoom"
                        @click="resetZoom"
                    >
                        {{ zoomPercent }}%
                    </button>
                    <UButton
                        icon="i-lucide-zoom-in"
                        size="xs"
                        variant="ghost"
                        color="neutral"
                        :disabled="zoom >= 2"
                        aria-label="Zoom in"
                        @click="adjustZoom(0.1)"
                    />
                </div>
            </div>

            <!-- ── Preview area ────────────────────────────────────────────── -->
            <div
                ref="previewAreaRef"
                class="preview-grid relative flex min-h-48 overflow-hidden border border-b-0 border-muted"
                :class="{ 'select-none cursor-ew-resize touch-none': isDragging }"
            >
                <!-- Dot grid background (covers full area including dead space) -->
                <div class="preview-grid__dots pointer-events-none absolute inset-0" />
                <!-- Vignette fade -->
                <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,var(--ui-bg)_100%)]" />

                <!-- Content zone: occupies the "active viewport" width -->
                <div
                    class="relative z-10 flex flex-shrink-0 items-center justify-center overflow-hidden self-stretch"
                    :class="!isNarrowed ? 'flex-1' : ''"
                    :style="isNarrowed ? { width: `${previewWidth}px` } : {}"
                >
                    <!-- Width badge: shown inside the content zone when narrowed -->
                    <div
                        v-if="isNarrowed"
                        class="pointer-events-none absolute left-1/2 top-2 z-20 -translate-x-1/2"
                    >
                        <span class="preview-frame__label">{{ previewWidth }}px</span>
                    </div>

                    <div class="flex w-full items-center justify-center p-8" :style="{ zoom: String(displayZoom) }">
                        <ClientOnly>
                            <component :is="exampleComponent" v-if="exampleComponent" />
                        </ClientOnly>
                    </div>
                </div>

                <!-- Drag handle: vertical bar at the right edge of the content zone -->
                <div
                    class="relative z-20 flex w-4 flex-shrink-0 cursor-ew-resize items-center justify-center self-stretch border-l transition-colors"
                    :class="isDragging
                        ? 'border-primary/50 bg-primary/5'
                        : 'border-muted hover:border-primary/30 hover:bg-muted/20'"
                    @mousedown="onHandleMousedown"
                    @touchstart="onHandleTouchstart"
                >
                    <!-- 2 × 3 grip dots -->
                    <div class="flex gap-[2px]">
                        <div v-for="col in 2" :key="col" class="flex flex-col gap-[3px]">
                            <span
                                v-for="row in 3"
                                :key="row"
                                class="block h-[3px] w-[3px] rounded-full transition-colors"
                                :class="isDragging ? 'bg-primary/70' : 'bg-muted'"
                            />
                        </div>
                    </div>
                </div>

                <!-- Dead space: fills remaining width when preview is narrowed -->
                <div v-if="isNarrowed" class="preview-dead-space flex-1 self-stretch" />
            </div>

            <!-- ── Code toggle footer ─────────────────────────────────────── -->
            <button
                class="code-toggle-footer group flex w-full items-center justify-between border border-muted px-4 py-2.5 transition-colors"
                :class="showCode ? 'border-b-0 rounded-b-none' : 'rounded-b-md'"
                @click="showCode = !showCode"
            >
                <div class="flex items-center gap-2">
                    <UIcon name="i-lucide-code-2" class="size-3.5 text-muted transition-colors group-hover:text-highlighted" />
                    <span class="text-xs font-medium text-muted transition-colors group-hover:text-highlighted">Code</span>
                </div>
                <UIcon
                    name="i-lucide-chevron-down"
                    class="size-3.5 text-muted transition-all duration-300 group-hover:text-highlighted"
                    :class="showCode ? '-rotate-180' : ''"
                />
            </button>

            <!-- ── Code area ───────────────────────────────────────────────── -->
            <Transition
                @enter="onCodeEnter"
                @after-enter="onCodeAfterEnter"
                @leave="onCodeLeave"
                @after-leave="onCodeAfterLeave"
            >
                <div v-if="showCode" class="group relative">
                    <div v-html="codeHtml" class="shiki-block" />
                    <UButton
                        :icon="copied ? 'i-lucide-check' : 'i-lucide-copy'"
                        size="xs"
                        color="neutral"
                        variant="subtle"
                        :aria-label="copied ? 'Copied' : 'Copy code'"
                        class="absolute right-2 top-2"
                        :class="copied ? 'text-green-500!' : ''"
                        @click="copyCode"
                    />
                </div>
            </Transition>
        </template>
    </div>
</template>

<style scoped>
.preview-grid {
    background-color: var(--ui-bg);
}

.preview-grid__dots {
    background-image: radial-gradient(circle, var(--preview-dot) 1px, transparent 1px);
    background-size: 24px 24px;
    background-position: center center;
    --preview-dot: color-mix(in oklch, var(--ui-text-muted) 30%, transparent);
}

:global(.dark) .preview-grid__dots {
    --preview-dot: color-mix(in oklch, var(--ui-text-muted) 18%, transparent);
}

/* Code toggle footer */
.code-toggle-footer {
    background-color: var(--ui-bg);
}
.code-toggle-footer:hover {
    background-color: color-mix(in oklch, var(--ui-text-muted) 5%, var(--ui-bg));
}

/* Dead space: subtle overlay to indicate it's outside the active viewport */
.preview-dead-space {
    background-color: color-mix(in oklch, var(--ui-text-muted) 6%, transparent);
}

:global(.dark) .preview-dead-space {
    background-color: color-mix(in oklch, var(--ui-bg) 60%, transparent);
}



/* Width badge shown inside the content zone */
.preview-frame__label {
    display: inline-block;
    font-family: ui-monospace, monospace;
    font-size: 10px;
    line-height: 1;
    white-space: nowrap;
    color: var(--ui-text-muted);
    background: color-mix(in oklch, var(--ui-bg) 85%, transparent);
    padding: 3px 8px;
    border-radius: 9999px;
    border: 1px solid color-mix(in oklch, var(--ui-text-muted) 25%, transparent);
    backdrop-filter: blur(4px);
}

/* ── Feature mode: pill toggle buttons ───────────────────────────────────── */
.pill-btn {
    display: inline-flex;
    align-items: center;
    padding: 0.125rem 0.625rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    line-height: 1.5;
    border: 1px solid;
    cursor: pointer;
    transition: color 0.15s, background-color 0.15s, border-color 0.15s;
    white-space: nowrap;
}

.pill-btn--idle {
    color: var(--ui-text-muted);
    border-color: color-mix(in oklch, var(--ui-text-muted) 40%, transparent);
    background: transparent;
}

.pill-btn--idle:hover {
    border-color: color-mix(in oklch, var(--ui-color-primary-500) 40%, transparent);
    color: var(--ui-text-highlighted);
}

.pill-btn--active {
    color: var(--ui-color-primary-600);
    border-color: color-mix(in oklch, var(--ui-color-primary-500) 50%, transparent);
    background-color: color-mix(in oklch, var(--ui-color-primary-500) 10%, transparent);
    font-weight: 500;
}

:global(.dark) .pill-btn--active {
    color: var(--ui-color-primary-400);
}

</style>

<style>
/* Shiki dual-theme: class-based dark mode swap (must be global, unscoped) */
html.dark .shiki,
html.dark .shiki span {
    color: var(--shiki-dark) !important;
    background-color: var(--shiki-dark-bg) !important;
}

/* Each Shiki line span must be a block so lines stack vertically */
.shiki code .line {
    display: block;
    min-height: 1lh;
}
</style>
