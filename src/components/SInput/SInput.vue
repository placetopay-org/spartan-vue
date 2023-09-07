<script setup lang="ts">
import { computed, ref, type FunctionalComponent } from 'vue';

const emit = defineEmits(['update:modelValue']);

const props = withDefaults(
  defineProps<
    Partial<{
      disabled: boolean;
      endIcon: FunctionalComponent;
      icon: FunctionalComponent;
      id: string;
      label: string;
      modelValue: string | string[] | boolean | number;
      rounded: keyof typeof roundedClass;
      name: string;
      placeholder: string;
      type: string;
      value: string;
    }>
  >(),
  {
    disabled: false,
    endIcon: undefined,
    icon: undefined,
    id: undefined,
    label: undefined,
    modelValue: undefined,
    rounded: 'both',
    name: undefined,
    placeholder: undefined,
    type: 'text',
    value: undefined,
  }
);

const model = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});

const inputIsFocused = ref();

const roundedClass = {
  left: 'rounded-l-lg',
  right: 'rounded-r-lg',
  both: 'rounded-lg',
  none: '',
};

// const inputTypeStyle = computed(() => {
//   if (props.type !== 'checkbox' && props.type !== 'radio') return 'px-3 py-2 w-full';
//   return (
//     'w-4 h-4 text-primary-600 accent-primary-600 cursor-pointer ' +
//     (props.type === 'checkbox' ? 'rounded' : 'rounded-full')
//   );
// });

if (props.type === 'checkbox') {
  console.warn(
    'The <SCheckbox /> component should be used instead of the <SInput /> with the property type="checkbox"'
  );
}

if (props.type === 'radio') {
  console.warn('The <SRadio /> component should be used instead of the <SInput /> with the property type="radio"');
}
</script>

<template>
  <div class="relative">
    <component
      v-if="icon"
      :is="icon"
      :class="['absolute left-3 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-500', inputIsFocused && 'text-primary-500']"
    />
    <component
      v-if="endIcon"
      :is="endIcon"
      :class="['absolute right-3 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-500', inputIsFocused && 'text-primary-500']"
    />
    <input
      v-model="model"
      :class="[
        'w-full border border-gray-300 bg-white placeholder:text-gray-400 s-focus',
        roundedClass[rounded],
        icon && 'pl-10',
        endIcon && 'pr-10',
        disabled && 'opacity-50 pointer-events-none',
      ]"
      :disabled="disabled"
      :id="id"
      :label="label"
      :name="name"
      :placeholder="placeholder"
      :type="type"
      :value="value ?? modelValue"
      @focus="inputIsFocused = true"
      @blur="inputIsFocused = false"
    />
  </div>
</template>
