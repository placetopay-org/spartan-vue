<template>
  <MenuItem v-slot="{ active }">
    <a :href="href" class="text-gray-900 block px-4 py-2 text-sm hover:bg-gray-50">
      <slot/>
    </a>
  </MenuItem>
</template>

<script>
import { MenuItem } from '@headlessui/vue'

export default {
  components: {
    MenuItem,
  },
  props: {
    href: {
      type: String,
      required: true,
    },
  }
}
</script>