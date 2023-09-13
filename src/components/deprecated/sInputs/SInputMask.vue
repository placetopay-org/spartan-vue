<script setup lang="ts">
import { computed } from 'vue';
import { useIMask } from 'vue-imask';

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const props = defineProps<{
  label?: string;
  name?: string;
  id?: string;
  placeholder?: string;
  disabled?: boolean;
  invalid?: boolean;
  modelValue: string;
  mask: string | Array<{mask: string}>;
}>();

const maskComputed = computed(() => {
  if (props.mask instanceof Array) {
    return props.mask.length ? props.mask : Number;
  }
  return props.mask ? [props.mask] : Number;
});

const { el, masked } = useIMask(
  {
    // @ts-ignore
    mask: maskComputed.value,
  },
  {
    onAccept: () => {
      emit('update:modelValue', masked.value);
    },
    onComplete: () => {
      emit('update:modelValue', masked.value);
    },
  }
);
</script>

<template>
    <div>
      <label v-if="label" :for="id" class="block mb-1 text-sm font-medium text-gray-700">
        {{ label }}
      </label>
      <div class="flex rounded-lg shadow-sm">
        <slot name="left"></slot>
        <input
          :id="id"
          ref="el"
          :value="modelValue"
          type="text"
          :name="name"
          :placeholder="placeholder"
          :class="[
            $slots.right ? 'rounded-r-0 -mr-px' : 'rounded-r-lg',
            $slots.left ? 'rounded-l-0 -ml-px' : 'rounded-l-lg',
            invalid
              ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-100'
              : '',
            disabled ? 'opacity-50' : '',
            'block w-full border-gray-300 text-base text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary-300 focus:ring focus:ring-primary-100',
          ]"
          :disabled="disabled"
          autocomplete="off"
        />
        <slot name="right"></slot>
      </div>
    </div>
</template>
  