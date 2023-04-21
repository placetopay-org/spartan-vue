<template>
  <MenuButton as="template">
    <SButton v-bind="$attrs" :right-icon="icon">Options</SButton>
  </MenuButton>
</template>

<script>
import { MenuButton } from "@headlessui/vue";
import { SButton } from "./../index";
import { ChevronDownIcon } from "@heroicons/vue/24/solid";

export default {
  components: {
    MenuButton,
    SButton,
    ChevronDownIcon,
  },
  data() {
    return {
      icon: ChevronDownIcon,
    };
  },
};
</script>
