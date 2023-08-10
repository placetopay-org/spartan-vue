<script setup lang="ts">
import { Menu, MenuButton, MenuItems } from '@headlessui/vue';

withDefaults(
  defineProps<
    Partial<{
      leftToRight: boolean;
    }>
  >(),
  {
    leftToRight: false,
  }
);
</script>

<template>
  <Menu as="div" class="relative">
    <div class="flex" :class="[!leftToRight && 'justify-end']">
      <MenuButton as="template" class="cursor-pointer">
        <slot />
      </MenuButton>
    </div>
    <Transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <MenuItems
      :class="[leftToRight ? 'origin-top-left left-0' : 'origin-top-right right-0 ']"
        class="absolute mt-1 min-w-[192px] overflow-hidden rounded-md bg-white shadow-2xl divide-y divide-gray-100 ring-1 ring-gray-100 focus:outline-none"
      >
        <slot name="items" />
      </MenuItems>
    </Transition>
  </Menu>
</template>
