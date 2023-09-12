<script setup lang="ts">
import { computed, ref } from 'vue';

const emit = defineEmits<{
  (event: 'update:modelValue', value: boolean): void;
}>();

const props = defineProps<{
  disabled?: boolean;
  id?: string;
  modelValue: boolean;
  name?: string;
  value: string;
}>();

const internalValue = ref(props.modelValue);
const model = computed({
  get() {
    return props.modelValue ?? internalValue.value;
  },
  set(newValue) {
    internalValue.value = newValue;
    emit('update:modelValue', newValue);
  },
});
</script>

<template>
  <input
    type="radio"
    :class="[
      'border bg-white focus:s-ring focus:ring-offset-0 rounded-full text-primary-600 accent-primary-600 cursor-pointer',
      disabled && 'opacity-50 pointer-events-none',
    ]"
    :disabled="disabled"
    :id="id"
    :name="name"
    :value="value"
    v-model="model"
  />
</template>
