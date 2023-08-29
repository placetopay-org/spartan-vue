<script setup lang="ts">
import { RadioGroupOption, RadioGroupLabel, RadioGroupDescription } from '@headlessui/vue';
import { CheckCircleIcon } from '@heroicons/vue/20/solid';

defineProps<{
  value: string;
}>();
</script>

<template>
  <RadioGroupOption as="template" v-slot="{ checked, active }" :value="value" >
    <div
      :class="[
        checked ? 'border-transparent' : 'border-gray-300',
        active ? 'ring-2 ring-primary-600' : '',
        'relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none',
      ]"
    >
      <span class="flex flex-1">
        <span class="flex flex-col">
          <RadioGroupLabel as="span" class="block text-sm font-medium text-gray-900">
            <slot name="title"/>
          </RadioGroupLabel>

          <RadioGroupDescription as="span" class="mt-1 mb-6 flex items-center text-sm text-gray-500">
            <slot name="description"/>
          </RadioGroupDescription>
          
          <RadioGroupDescription as="span" class="mt-auto text-sm font-medium text-gray-900">
            <slot name="footer"/>
          </RadioGroupDescription>
        </span>
      </span>
      <CheckCircleIcon :class="['h-5 w-5 text-primary-600', !checked && 'opacity-0']" :aria-hidden="!checked" />
      <span
        :class="[
          active ? 'border' : 'border-2',
          checked ? 'border-primary-600' : 'border-transparent',
          'pointer-events-none absolute -inset-px rounded-lg',
        ]"
        aria-hidden="true"
      />
    </div>
  </RadioGroupOption>
</template>
