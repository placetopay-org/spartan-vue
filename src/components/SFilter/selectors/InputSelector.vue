<script setup lang="ts">
import { computed } from 'vue';
import { SInput } from '../../SInput';
import type { TFilter } from '../types';

const emit = defineEmits(['update:modelValue']);

const props = defineProps<{
  modelValue: string;
  filter: TFilter;
}>();

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});

const inputType = computed(() => {
  if (props.filter.type === 'number') return 'number';
  if (props.filter.type === 'date') return 'date';
  return 'text';
});
</script>

<template>
  <SInput v-model="value" :type="inputType" placeholder="Escribe un valor" />
</template>
