<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { SInput } from '../../SInput';
import type { TFilter } from '../types';

const emit = defineEmits(['update:modelValue']);

const props = defineProps<{
  modelValue?: string;
  filter: TFilter;
}>();

const value1 = ref(props.modelValue?.[0]);
const value2 = ref(props.modelValue?.[1]);

watch([value1, value2], () => {
  emit('update:modelValue', [value1.value, value2.value]);
});

const inputType = computed(() => {
  if (props.filter.type === 'number') return 'number';
  if (props.filter.type === 'date') return 'date';
  return 'text';
});
</script>

<template>
  <div class="flex gap-4">
    <SInput v-model="value1" :type="inputType" placeholder="Escribe un valor" />
    <SInput v-model="value2" :type="inputType" placeholder="Escribe un valor" />
  </div>
</template>
