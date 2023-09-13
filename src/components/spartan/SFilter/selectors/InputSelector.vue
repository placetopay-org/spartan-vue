<script setup lang="ts">
import { computed } from 'vue';
import { SInput } from '@spartan';
import type { TField } from '../types';
import { translator } from '@/helpers';

const emit = defineEmits(['update:modelValue']);

const props = defineProps<{
  modelValue?: string | number;
  field: TField;
}>();

const { t } = translator('filter');

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});

const inputType = computed(() => {
  if (props.field.type === 'number') return 'number';
  if (props.field.type === 'date') return 'date';
  return 'text';
});
</script>

<template>
  <SInput v-model="value" :type="inputType" :placeholder="t('inputSelectorPlaceholder')" />
</template>
