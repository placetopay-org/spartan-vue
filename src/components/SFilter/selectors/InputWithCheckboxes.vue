<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { SInput } from '../../SInput';
import type { TFilter } from '../types';

const emit = defineEmits(['update:modelValue']);

const props = defineProps<{
  modelValue?: string;
  filter: TFilter;
}>();

const search = ref('');
const checked = ref([]);

watch([search, checked], () => {
  emit('update:modelValue', [search.value, checked.value]);
});

const inputType = computed(() => {
  if (props.filter.type === 'number') return 'number';
  if (props.filter.type === 'date') return 'date';
  return 'text';
});

const computedOptions = computed(() => {
  return props.filter.options?.filter((option) => option.toLowerCase().includes(search.value.toLowerCase())) ?? [];
});
</script>

<template>
  <div class="flex flex-col gap-4">
    <SInput v-model="search" :type="inputType" placeholder="Selecciona una o varias opciones" />
    <div>
      <div class="flex gap-2 items-center" v-for="option in computedOptions">
        <SInput :id="option" v-model="checked" :value="option" type="checkbox" />
        <label :for="option" class="text-sm text-gray-900 font-medium">{{ option }}</label>
      </div>
    </div>
  </div>
</template>