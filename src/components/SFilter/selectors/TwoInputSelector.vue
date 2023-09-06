<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { SInput } from '../../SInput';
import type { TField } from '../types';
import { translator } from '../../../helpers';

const emit = defineEmits(['update:modelValue']);

const props = defineProps<{
  modelValue?: string[] | number[];
  field: TField;
}>();

const { t } = translator('filter');

const value1 = ref(props.modelValue?.[0]);
const value2 = ref(props.modelValue?.[1]);

watch([value1, value2], () => {
  emit('update:modelValue', [value1.value, value2.value]);
});

const inputType = computed(() => {
  if (props.field.type === 'number') return 'number';
  if (props.field.type === 'date') return 'date';
  return 'text';
});
</script>

<template>
  <div class="flex gap-4">
    <SInput class="w-48" v-model="value1" :type="inputType" :placeholder="t('inputSelectorPlaceholder')" />
    <SInput class="w-48" v-model="value2" :type="inputType" :placeholder="t('inputSelectorPlaceholder')" />
  </div>
</template>
