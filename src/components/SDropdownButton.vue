<template>
  <MenuButton as="template">
    <SButton v-bind="$attrs">Options</SButton>
  </MenuButton>
</template>

<script>
import { ChevronDownIcon } from "@heroicons/vue/solid";
import { MenuButton } from "@headlessui/vue";
import { SButton } from "./../index";

export default {
  components: {
    ChevronDownIcon,
    MenuButton,
    SButton,
  },
};
</script>
