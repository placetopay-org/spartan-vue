<script setup lang="ts">
import { computed } from 'vue';
import { RadioGroup } from '@headlessui/vue';

const emit = defineEmits(['update:modelValue']);
const props = withDefaults(
  defineProps<
    Partial<{
      disabled: boolean;
      id: string;
      label: string;
      modelValue: string | string[] | boolean | number;
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
    emit('update:modelValue', value);
  },
});
</script>

<template>
  <RadioGroup v-model="model">
    <slot />
  </RadioGroup>
</template>
