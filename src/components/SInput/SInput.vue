<script setup lang="ts">
import { computed, type FunctionalComponent, useSlots, ref } from 'vue';

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

const slots = useSlots();

const model = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});

const inputHasFocus = ref(false);

const roundedClass = {
  left: 'rounded-l-lg',
  right: 'rounded-r-lg',
  both: 'rounded-lg',
  none: '',
};

const isRightRounded = computed(() => {
  return props.rounded === 'right' || props.rounded === 'both';
});

const isLeftRounded = computed(() => {
  return props.rounded === 'left' || props.rounded === 'both';
});

const leftContent = computed(() => props.icon || props.prefix);
const rightContent = computed(() => props.endIcon || props.suffix || slots.options);

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
      'relative flex w-full border border-gray-300 bg-white placeholder:text-gray-400',
      inputHasFocus && 's-ring',
      roundedClass[rounded],
    ]"
  >
    <div v-if="leftContent" :class="['flex items-center', isLeftRounded && 'rounded-l-lg']">
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
        roundedClass[rounded],
      ]"
      :disabled="disabled"
      :id="id"
      :label="label"
      :name="name"
      :placeholder="placeholder"
      :type="type"
      :value="value ?? modelValue"
      @focus="inputHasFocus = true"
      @blur="inputHasFocus = false"
    />
    <div v-if="rightContent" :class="['focus-within:s-ring -m-px border border-transparent flex items-center', isRightRounded && 'rounded-r-lg']">
      <select v-if="$slots.options" class="text-gray-500 text-sm border-none focus:ring-0 rounded-lg">
        <slot name="options" />
      </select>
      <span v-else-if="suffix" class="mr-3 text-gray-500">{{ suffix }}</span>
      <component v-else-if="endIcon" :is="endIcon" class="mr-3 h-6 w-6 text-gray-500" />
    </div>
  </div>
</template>
