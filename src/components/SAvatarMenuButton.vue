<template>
  <MenuButton
    class="flex max-w-xs items-center rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2"
  >
    <SAvatar v-bind="$attrs"></SAvatar>
  </MenuButton>
</template>

<script>
import { SAvatar } from "./../index.js";
import { MenuButton } from "@headlessui/vue";

export default {
  components: {
    SAvatar,
    MenuButton,
  },
};
</script>
