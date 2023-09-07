<script setup lang="ts">
import { computed } from 'vue';

const emit = defineEmits(['update:modelValue']);
const props = withDefaults(
  defineProps<
    Partial<{
      disabled: boolean;
      id: string;
      label: string;
      modelValue: string | string[] | boolean | number;
      rounded: keyof typeof roundedClass;
      name: string;
      placeholder: string;
      type: string;
      value: string;
    }>
  >(),
  {
    disabled: false,
    id: undefined,
    label: undefined,
    modelValue: undefined,
    rounded: 'both',
    name: undefined,
    placeholder: undefined,
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

const inputTypeStyle = computed(() => {
  if (props.type !== 'checkbox' && props.type !== 'radio') return 'px-3 py-2 w-full';
  return (
    'w-4 h-4 text-primary-600 accent-primary-600 cursor-pointer ' +
    (props.type === 'checkbox' ? 'rounded' : 'rounded-full')
  );
});
</script>

<template>
  <div>
    <label v-if="id && label" :for="id" class="block text-sm font-medium text-gray-700 mb-1">{{ label }}</label>
    <input
      :class="[
        'border border-gray-300 bg-white placeholder:text-gray-400 s-focus transition focus:border-primary-300',
        inputTypeStyle,
        roundedClass[rounded],
        disabled && 'opacity-50 pointer-events-none',
      ]"
      :disabled="disabled"
      :id="id"
      :label="label"
      :name="name"
      :placeholder="placeholder"
      :type="type"
      :value="value ?? modelValue"
      v-model="model"
    />
  </div>
</template>
