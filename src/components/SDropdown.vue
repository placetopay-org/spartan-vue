<template>
  <Menu as="div" class="relative inline-block text-left">
    <div>
      <MenuButton
          class="inline-flex justify-center w-full rounded-xl border border-gray-300 items-center shadow-sm px-4 py-2 pr-3 pl-4 bg-white text-xs font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-500"
      >
        {{ label }}
        <ChevronDownIcon class="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
      </MenuButton>
    </div>
    <slot/>
  </Menu>
</template>

<script>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/solid'

export default {
  components: {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    ChevronDownIcon,
  },
  props: {
    label: {
      type: String,
      required: true,
    }
  }
}
</script>