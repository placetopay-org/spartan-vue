<script setup lang="ts">
import { computed } from 'vue';
import { SBadge } from '../SBadge';
import { Oper, type TFilter } from './types';

defineEmits<{
  (event: 'remove', filter: TFilter): void;
}>();

const props = defineProps<{
  filter: TFilter;
}>();

const value = computed(() => {
  const { filter } = props.filter;
  
  if (!filter) return;

  if (filter.operator === Oper.EX) return;
  if (filter.operator === Oper.NEX) return `no existe`;
  if (filter.operator === Oper.EQ) {return filter.value;}
  if (filter.operator === Oper.NEQ) return `no es ${filter.value}`;
  if (filter.operator === Oper.IN) return filter.value.slice(0, 2).join(', ');
  if (filter.operator === Oper.NIN) return `no es ${filter.value.slice(0, 2).join(', ')}`;
  if (filter.operator === Oper.GT) return `mayor que ${filter.value}`;
  if (filter.operator === Oper.GTE) return `mayor o igual que ${filter.value}`;
  if (filter.operator === Oper.LT) return `menor que ${filter.value}`;
  if (filter.operator === Oper.LTE) return `menor o igual que ${filter.value}`;
  if (filter.operator === Oper.BETWEEN) return `${filter.value[0]} - ${filter.value[1]}`;
  if (filter.operator === Oper.NBETWEEN) return `no esta entre ${filter.value[0]} - ${filter.value[1]}`;
  if (filter.operator === Oper.CONTAINS) return `contiene ${filter.value}`;
  if (filter.operator === Oper.NCONTAINS) return `no contiene ${filter.value}`;
  if (filter.operator === Oper.STARTSWITH) return `empieza con ${filter.value}`;
  if (filter.operator === Oper.ENDSWITH) return `termina con ${filter.value}`;

  return '';
});
</script>

<template>
  <SBadge v-if="filter.filter" color="gray" class="whitespace-nowrap" pill removable @removed="$emit('remove', filter)">
    <span class="font-bold max-w-[144px]">{{ `${filter.field} |&nbsp;` }}</span>
    <span class="truncate max-w-[144px]">{{ value }}</span>
  </SBadge>
</template>
