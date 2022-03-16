<template>
  <!-- Profile dropdown -->
  <Menu as="div" class="ml-3 relative">
    <div>
      <MenuButton
        class="max-w-xs flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
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
        class="origin-top-right absolute right-0 mt-2 w-48 rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden"
      >
        <slot name="menu-items"></slot>
      </MenuItems>
    </transition>
  </Menu>
</template>

ad
<script>
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { SAvatar } from "../index.js";

export default {
  components: {
    SAvatar,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
  },
  props: {
    name: {
      type: String,
      required: false,
      default: "John Doe",
    },
  },
  computed: {
    src() {
      return `https://ui-avatars.com/api/?name=${this.name}`;
    },
  },
};
</script>

<style scoped></style>
