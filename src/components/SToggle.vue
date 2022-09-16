<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <Switch
    :modelValue="modelValue"
    @update:modelValue="$emit('update:modelValue', $event)"
    :class="[
      modelValue ? 'bg-primary-600' : 'bg-gray-200',
      'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border border-transparent p-px transition-colors duration-200 ease-in-out focus:border-primary-300 focus:outline-none focus:ring-4 focus:ring-primary-100',
    ]"
  >
    <span class="sr-only">Use setting</span>
    <span
      aria-hidden="true"
      :class="[
        modelValue ? 'translate-x-5' : 'translate-x-0',
        'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
      ]"
    />
  </Switch>
</template>

<script>
import { Switch } from "@headlessui/vue";

export default {
  components: {
    Switch,
  },
  props: {
    modelValue: {
      default: false,
    },
  },
};
</script>
