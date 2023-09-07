<script setup lang="ts">
import { computed, ref, type FunctionalComponent } from 'vue';

const emit = defineEmits(['update:modelValue']);

const props = withDefaults(
  defineProps<
    Partial<{
      disabled: boolean;
      endIcon: FunctionalComponent;
      icon: FunctionalComponent;
      id: string;
      label: string;
      modelValue: string | string[] | boolean | number;
      rounded: keyof typeof roundedClass;
      name: string;
      placeholder: string;
      prefix: string;
      suffix: string;
      type: string;
      value: string;
    }>
  >(),
  {
    disabled: false,
    endIcon: undefined,
    icon: undefined,
    id: undefined,
    label: undefined,
    modelValue: undefined,
    rounded: 'both',
    name: undefined,
    placeholder: undefined,
    prefix: undefined,
    suffix: undefined,
    type: 'text',
    value: undefined,
  }
);

const model = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});

const roundedClass = {
  left: 'rounded-l-lg',
  right: 'rounded-r-lg',
  both: 'rounded-lg',
  none: '',
};

const leftContent = computed(() => props.icon || props.prefix);
const rightContent = computed(() => props.endIcon || props.suffix);

if (props.type === 'checkbox') {
  console.error(
    'The <SCheckbox /> component should be used instead of the <SInput /> with the property type="checkbox"'
  );
}

if (props.type === 'radio') {
  console.error('The <SRadio /> component should be used instead of the <SInput /> with the property type="radio"');
}
</script>

<template>
  <div
    :class="[
      'relative flex items-center w-full overflow-hidden border border-gray-300 bg-white placeholder:text-gray-400 s-focus-within',
      roundedClass[rounded],
    ]"
  >
    <div v-if="leftContent">
      <span v-if="prefix" class="ml-3 text-gray-500">{{ prefix }}</span>
      <component v-else-if="icon" :is="icon" class="ml-3 h-6 w-6 text-gray-500" />
    </div>
    <input
      v-model="model"
      :class="[
        'w-full border-none focus:ring-0',
        leftContent && 'pl-2',
        rightContent && 'pr-2',
        disabled && 'opacity-50 pointer-events-none',
      ]"
      :disabled="disabled"
      :id="id"
      :label="label"
      :name="name"
      :placeholder="placeholder"
      :type="type"
      :value="value ?? modelValue"
    />
    <div v-if="rightContent">
      <span v-if="suffix" class="mr-3 text-gray-500">{{ suffix }}</span>
      <component v-else-if="endIcon" :is="endIcon" class="mr-3 h-6 w-6 text-gray-500" />
    </div>
  </div>
</template>
