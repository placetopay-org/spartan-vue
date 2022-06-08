<template>
  <MenuButton
    class="focus:ring-primary-300 focus:border-primary-300 flex max-w-xs items-center rounded-full border-transparent text-sm focus:outline-none focus:ring"
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
