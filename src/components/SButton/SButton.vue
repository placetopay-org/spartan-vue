<script lang="ts">
/**
 * A versatile button component with multiple styles and appearances.
 * @see {@link https://github.com/placetopay-org/spartan-vue Github}.
 */
export default {
  name: 'SButton',
};
</script>

<script setup lang="ts">
import { computed, useSlots, type FunctionalComponent } from 'vue';

const props = withDefaults(
  defineProps<
    Partial<{
      as: string;
      disabled: boolean;
      endIcon: boolean;
      icon: FunctionalComponent;
      loading: boolean;
      rounded: keyof typeof roundedClass;
      size: keyof typeof sizeClass;
      type: 'button' | 'submit';
      variant: keyof typeof variantClass;
    }>
  >(),
  {
    as: 'button',
    disabled: false,
    endIcon: false,
    icon: undefined,
    loading: false,
    rounded: 'both',
    size: 'md',
    type: 'button',
    variant: 'primary',
  }
);

const slots = useSlots();

const variantClass = {
  primary: 'text-white bg-primary-600 hover:bg-primary-700 focus:ring-primary-100 focus:ring shadow-sm',
  secondary: 'text-gray-900 bg-white border-ring-gray-300 hover:bg-gray-50 focus:ring-primary-100 shadow-sm',
  danger: 'text-white bg-red-500 hover:bg-red-600 focus:ring-red-300 focus:ring shadow-sm',
  outline: 'text-primary-600 bg-white border-ring-primary-600 hover:bg-primary-50 focus:ring-primary-100 shadow-sm',
  link: 'text-primary-600 bg-transparent hover:text-primary-700 focus:ring-primary-100 focus:ring',
};

const sizeClass = {
  sm: {
    text: 'py-2 px-3 text-xs',
    noText: 'p-1',
  },
  md: {
    text: 'py-3 px-6 text-sm',
    noText: 'p-3',
  },
};

const roundedClass = {
  left: 'rounded-l-lg',
  right: 'rounded-r-lg',
  both: 'rounded-lg',
  none: '',
  full: 'rounded-full',
};

const buttonClasses = computed(() => [
  'inline-flex items-center justify-center h-fit w-fit border-0 font-medium transition focus:outline-none gap-2',
  props.disabled && 'pointer-events-none opacity-50',
  props.loading && 'loading',
  props.endIcon && 'flex-row-reverse',
  slots.default?.()[0].children ? sizeClass[props.size].text : sizeClass[props.size].noText,
  roundedClass[props.rounded],
  variantClass[props.variant],
]);

const iconClasses = computed(() => [
  'w-5 h-5',
  slots.default?.()[0].children ? (props.endIcon ? '-mr-0.5' : '-ml-0.5') : '',
]);
</script>

<template>
  <component
    :is="as || 'button'"
    :type="as && as === 'button' ? type : undefined"
    :class="buttonClasses"
    :disabled="disabled"
  >
    <component :is="icon" :class="iconClasses" />
    <slot />
  </component>
</template>

<style>
.border-ring-gray-300 {
  box-shadow: inset 0 0 0 1px #d1d5db;
}

.border-ring-gray-300:focus {
  box-shadow:
    inset 0 0 0 1px #d1d5db,
    var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color);
}

.border-ring-primary-600 {
  box-shadow: inset 0 0 0 1px #ff6c0c;
}

.border-ring-primary-600:focus {
  box-shadow:
    inset 0 0 0 1px #ff6c0c,
    var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color);
}

.loading {
  color: transparent !important;
  position: relative;
  pointer-events: none;
}

.loading::after {
  animation: spinAround 500ms infinite linear;
  border: 2px solid #dbdbdb;
  border-radius: 290486px;
  border-right-color: transparent;
  border-top-color: transparent;
  content: '';
  display: block;
  height: 1em;
  width: 1em;
  position: absolute;
  left: calc(50% - (1em / 2));
  top: calc(50% - (1em / 2));
}

@keyframes spinAround {
  from {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(359deg);
    transform: rotate(359deg);
  }
}
</style>
