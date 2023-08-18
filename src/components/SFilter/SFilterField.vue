<script setup lang="ts">
import { computed } from 'vue';
import { SBadge } from '../SBadge';
import { COND, type TFilter } from './types';

const props = defineProps<{
  filter: TFilter;
}>();

const value = computed(() => {
  const { field, filter } = props.filter;
  
  if (filter.condition === COND.EQ) return field;
  if (filter.condition === COND.IN) return filter.value.slice(0, 2).join(', ');
  if (filter.condition === COND.GT) return `> ${filter.value}`;
  if (filter.condition === COND.GTE) return `>= ${filter.value}`;
  if (filter.condition === COND.LT) return `< ${filter.value}`;
  if (filter.condition === COND.LTE) return `<= ${filter.value}`;
  if (filter.condition === COND.BETWEEN) return `${filter.value[0]} - ${filter.value[1]}`;
  if (filter.condition === COND.CONTAINS) return `[... ${filter.value} ...]`;
  if (filter.condition === COND.STARTSWITH) return `[${filter.value}...]`;
  if (filter.condition === COND.ENDSWITH) return `[...${filter.value}]`;

  return '';
});
</script>

<template>
  <SBadge color="gray" class="whitespace-nowrap" pill removable>
    <span class="font-bold max-w-[144px]">{{ `${filter.field} |&nbsp;` }}</span>
    <span class="truncate max-w-[144px]">{{ value }}</span>
  </SBadge>
</template>
