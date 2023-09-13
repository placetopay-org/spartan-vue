<script setup lang="ts">
import { computed } from 'vue';
import { SInput, SLabel, type TInputProps } from '@spartan';

defineOptions({ inheritAttrs: false });

const emit = defineEmits(['update:modelValue']);

const props = withDefaults(
  defineProps<Partial<{ error: string; helpText: string; label: string }> & Omit<Partial<TInputProps>, 'error'>>(),
  {
    error: undefined,
    label: undefined,
  }
);

const inputProps = computed(() => {
  const { error, helpText, label, ...rest } = props;
  return { ...rest, error: Boolean(error) };
});
</script>

<template>
  <div>
    <SLabel v-if="label" :for="id">{{ label }}</SLabel>
    <SInput v-bind="inputProps" />
    <div class="flex flex-col">
      <span v-if="helpText" class="text-gray-500 text-xs font-normal mt-1">{{ helpText }}</span>
      <span v-if="error" class="text-red-500 text-xs font-normal mt-1">{{ error }}</span>
    </div>
  </div>
</template>
