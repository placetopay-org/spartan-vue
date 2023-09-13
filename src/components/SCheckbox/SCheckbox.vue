<script setup lang="ts">
import { computed, ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import { hasSlotContent } from '../../helpers';

defineOptions({ inheritAttrs: false });

const emit = defineEmits<{
  (event: 'update:modelValue', value: boolean): void;
}>();

const props = defineProps<{
  disabled?: boolean;
  id?: string;
  modelValue: boolean;
  name?: string;
  reverse?: boolean;
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

const computedId = computed(() => props.id ?? uuidv4());
</script>

<template>
  <div :class="['flex w-full', (!hasSlotContent($slots.default) || !hasSlotContent($slots.description)) && 'items-center', reverse ? 'flex-row-reverse justify-between' : ' gap-3']">
    <input
      :class="[
        'border border-gray-300 bg-white focus:s-ring focus:ring-offset-0 rounded text-primary-600 accent-primary-600 cursor-pointer',
        disabled && 'opacity-50 pointer-events-none',
      ]"
      type="checkbox"
      :disabled="disabled"
      :id="computedId"
      :name="name"
      :value="value"
      v-bind="$attrs"
      v-model="model"
    />
    <div
      v-if="hasSlotContent($slots.default) || hasSlotContent($slots.description)"
      :class="['flex flex-col', $slots.default && $slots.description && 'gap-1']"
    >
      <label
        v-if="hasSlotContent($slots.default)"
        :for="computedId"
        class="text-gray-900 font-semibold text-sm leading-3"
        ><slot
      /></label>
      <p v-if="hasSlotContent($slots.description)" class="text-sm text-gray-500 font-normal">
        <slot name="description" />
      </p>
    </div>
  </div>
</template>
