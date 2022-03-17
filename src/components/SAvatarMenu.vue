<template>
  <!-- Profile dropdown -->
  <Menu as="div" class="relative ml-3">
    <div>
      <MenuButton
        class="flex max-w-xs items-center rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2"
      >
        <span class="sr-only">Open Menu</span>
        <slot></slot>
      </MenuButton>
    </div>
    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <MenuItems
        class="absolute right-0 mt-2 w-48 origin-top-right overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <slot name="menu-items"></slot>
      </MenuItems>
    </transition>
  </Menu>
</template>

ad
<script>
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";

export default {
  components: {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
  },
};
</script>

<style scoped></style>
