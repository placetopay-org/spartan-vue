<template>
  <SwitchGroup as="div" class="flex items-center justify-between">
    <Switch :modelValue="modelValue" @update:modelValue="$emit('update:modelValue', $event)"
      :class="[modelValue ? 'bg-primary-600' : 'bg-gray-200', 'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out mr-4 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2']">
      <span
        :class="[modelValue ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out']">
        <span
          :class="[modelValue ? 'opacity-0 duration-100 ease-out' : 'opacity-100 duration-200 ease-in', 'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity']"
          aria-hidden="true">
          <svg class="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 12 12">
            <path d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2" stroke="currentColor" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
        </span>
        <span
          :class="[modelValue ? 'opacity-100 duration-200 ease-in' : 'opacity-0 duration-100 ease-out', 'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity']"
          aria-hidden="true">
          <svg class="h-3 w-3 text-primary-600" fill="currentColor" viewBox="0 0 12 12">
            <path
              d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
          </svg>
        </span>
      </span>
    </Switch>
    <span v-if="title || description" class="flex flex-grow flex-col">
      <SwitchLabel v-if="title" as="span" class="text-sm font-semibold leading-6 text-gray-900" passive>
        {{ title }}
      </SwitchLabel>
      <SwitchDescription v-if="description" as="span" class="text-sm text-gray-400">
        {{ description }}
      </SwitchDescription>
    </span>
  </SwitchGroup>
</template>

<script setup lang="ts">
import { Switch, SwitchGroup, SwitchLabel, SwitchDescription } from "@headlessui/vue";

defineEmits(["update:modelValue"]);

defineProps<{
  modelValue: boolean;
  title?: string;
  description?: string;
}>();

</script>