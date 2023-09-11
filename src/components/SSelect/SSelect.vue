<script setup lang="ts">
const emits = defineEmits<{
  (e: 'update:modelValue', value: string | number): void;
}>();

const props = withDefaults(
  defineProps<{
    disabled?: boolean;
    error?: boolean;
    id?: string;
    modelValue: string | number;
    name?: string;
    placeholder?: string;
    rounded: keyof typeof roundedClass;
  }>(),
  {
    disabled: false,
    error: false,
    id: undefined,
    name: undefined,
    placeholder: undefined,
    rounded: 'both',
  }
);

const roundedClass = {
  left: 'rounded-l-lg',
  right: 'rounded-r-lg',
  both: 'rounded-lg',
  none: '',
};
</script>

<template>
  <select
    :disabled="disabled"
    :id="id"
    :name="name"
    :class="[
      'block pl-3 pr-8 py-2 text-base border text-gray-800 focus:z-10',
      error ? 'border-red-500 focus:s-ring-error' : 'border-gray-300 focus:s-ring',
      roundedClass[rounded],
    ]"
    :value="modelValue"
    @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
  >
    <option v-if="placeholder" disabled value="">{{ placeholder }}</option>
    <slot />
  </select>
</template>
