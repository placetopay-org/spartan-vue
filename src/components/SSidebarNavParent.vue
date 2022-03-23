<template>
  <DisclosureButton
    :class="[
      active ? 'text-gray-900' : 'bg-white text-gray-500 hover:text-gray-900',
      'group flex w-full items-center rounded-md py-2.5 pl-2 pr-1 text-left text-sm font-medium focus:outline-none focus:ring-2 focus:ring-gray-800',
    ]"
  >
    <component
      :is="icon"
      :class="[
        active ? 'text-gray-900' : 'group-hover:text-gray-600',
        'mr-2.5 h-5 w-5',
      ]"
      aria-hidden="true"
    />
    
    <span class="flex-1">
      <slot />
    </span>

    <ChevronDownIcon
      :class="[
        active ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
        'ml-3 h-5 w-5 flex-shrink-0',
      ]"
      aria-hidden="true"
    />
  </DisclosureButton>
</template>

<script>
import { DisclosureButton } from "@headlessui/vue";
import { ChevronDownIcon } from "@heroicons/vue/solid";

export default {
  components: { DisclosureButton, ChevronDownIcon },
  props: {
    icon: {
      type: [Function],
      default: undefined,
    },
    active: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {};
  },
  computed: {},
};
</script>
