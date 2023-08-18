<script setup lang="ts">
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/vue/20/solid';
import { computed, type FunctionalComponent } from 'vue';

const props = withDefaults(
  defineProps<
    Partial<{
      active: boolean;
      disabled: boolean;
      endIcon: boolean;
      first: boolean;
      icon: FunctionalComponent;
      last: boolean;
      next: boolean;
      prev: boolean;
    }>
  >(),
  {
    active: false,
    disabled: false,
    endIcon: false,
    first: false,
    icon: undefined,
    last: false,
    next: false,
    prev: false,
  }
);

const iconClass = computed(() => ['w-5 h-5 text-gray-900 group-active:text-primary-600', props.active && 'text-primary-600']);
</script>

<template>
  <button
    :disabled="disabled"
    type="button"
    :class="[
      'group text-sm font-medium inline-flex items-center justify-center gap-2 group relative group py-2 px-3 text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:z-20 s-focus-primary focus:outline-primary-300 active:bg-primary-50 active:text-primary-600',
      active ? 'bg-primary-50 text-primary-600 outline-primary-300 z-10' : 'bg-white hover:bg-gray-50',
      endIcon && 'flex-row-reverse',
      disabled && 'opacity-50 pointer-events-none',
      first && 'rounded-l-md',
      last && 'rounded-r-md',
    ]"
  >
    <template v-if="next || prev">
      <span class="sr-only">{{ next ? 'Next' : 'Prev' }}</span>
      <component
        :is="next ? ChevronRightIcon : ChevronLeftIcon"
        :class="[iconClass, 'duration-75 group-active:scale-125']"
      />
    </template>

    <template v-else>
      <component
        v-if="icon"
        :is="icon"
        :class="[iconClass, $slots.default?.()[0].children ? (endIcon ? '-mr-0.5' : '-ml-0.5') : '']"
      />
      <slot />
    </template>
  </button>
</template>
