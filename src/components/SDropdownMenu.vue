<template>
  <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
    <MenuItems class="origin-top-left absolute left-0 mt-2 w-56 rounded-xl shadow-2xl bg-white hover:bg-gray-50 ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
      <slot/>
    </MenuItems>
  </transition>
</template>

<script>
import { MenuItems } from '@headlessui/vue'

export default {
  components: {
    MenuItems,
  },
}
</script>