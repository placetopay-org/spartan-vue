<template>
  <Disclosure as="div">
    <slot />
    <DisclosurePanel>
      <slot name="items-list"></slot>
    </DisclosurePanel>
  </Disclosure>
</template>

<script>
import { DisclosurePanel, DisclosureButton, Disclosure } from "@headlessui/vue";

export default {
  components: {
    DisclosurePanel,
    DisclosureButton,
    Disclosure,
  },
  props: {},
  data() {
    return {};
  },
  computed: {},
};
</script>
