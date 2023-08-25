<script setup lang="ts">
import { computed } from 'vue';

const emit = defineEmits(['update:modelValue']);
const props = withDefaults(
  defineProps<
    Partial<{
      disabled: boolean;
      id: string;
      label: string;
      modelValue: string | string[] | boolean;
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
    emit("update:modelValue", value);
  },
});
</script>

<template>
  <div>
    <label v-if="id && label" :for="id" class="block text-sm font-medium text-gray-700 mb-1">{{ label }}</label>
    <input
      :class="[
        'border border-gray-300 bg-white placeholder:text-gray-400 s-focus-primary transition focus:border-primary-300',
        type === 'checkbox' ? 'w-4 h-4 rounded text-primary-600 cursor-pointer' : 'px-3 py-2 w-full rounded-lg',
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
