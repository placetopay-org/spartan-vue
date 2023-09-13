<script setup lang="ts">
import { computed, ref } from 'vue';

export type TSelectProps = {
  disabled: boolean;
  error: boolean;
  id: string;
  modelValue: string;
  name: string;
  placeholder: string;
  rounded: keyof typeof roundedClass;
};

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | undefined): void;
}>();

const props = withDefaults(defineProps<Partial<TSelectProps>>(), {
  disabled: false,
  error: false,
  id: undefined,
  name: undefined,
  modelValue: undefined,
  placeholder: undefined,
  rounded: 'both',
});

const value = ref(props.modelValue);
const model = computed({
  get() {
    return props.modelValue ?? value.value;
  },
  set(newValue) {
    value.value = newValue;
    emit('update:modelValue', newValue);
  },
});

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
    v-model="model"
  >
    <option v-if="placeholder" disabled :value="undefined">{{ placeholder }}</option>
    <slot />
  </select>
</template>
