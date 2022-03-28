<template>
  <Menu as="div" class="relative inline-block text-left">
    <div>
      <MenuButton
          :class="[search ? 'text-base rounded-l-xl py-2.5' : 'text-xs rounded-xl py-2 pr-3 pl-4']"
          class="inline-flex justify-center w-full border border-gray-300 items-center shadow-sm px-4 bg-white font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-500"
      >
        {{ label }}
        <ChevronDownIcon class="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
      </MenuButton>
    </div>
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
      required: false,
    },
    search: {
      type: Boolean,
      default: false,
    }
  }
}
</script>