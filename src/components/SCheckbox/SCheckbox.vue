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
  inline?: boolean;
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
  <div
    :class="[
      'flex w-full gap-3',
      reverse && 'flex-row-reverse justify-between',
      disabled && 'opacity-50 pointer-events-none',
    ]"
  >
    <input
      class="border border-gray-300 bg-white focus:s-ring focus:ring-offset-0 rounded text-primary-600 accent-primary-600 cursor-pointer"
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
      :class="[
        'flex flex-col justify-center',
        $slots.default && $slots.description && 'gap-1',
        hasSlotContent($slots.description) ? '-mt-1' : '-mt-0.5',
      ]"
    >
      <label v-if="hasSlotContent($slots.default) && !inline" :for="computedId" class="label">
        <slot />
      </label>
      <p v-if="hasSlotContent($slots.description)" :class="['text-sm text-gray-500 font-normal', inline && '']">
        <label v-if="hasSlotContent($slots.default) && inline" :for="computedId" class="label">
          <slot />
        </label>
        <slot name="description" />
      </p>
    </div>
  </div>
</template>

<style>
.label {
  @apply text-gray-900 font-semibold text-sm;
}
</style>
