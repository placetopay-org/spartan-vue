<template>
  <MenuItem v-slot="{ active }">
    <a                 
      v-bind="$attrs"
      :class="{'bg-gray-100': active }"
      class="text-gray-700 group flex items-center px-2.5 py-2.5 text-sm"
    >
      <component 
        :is="icon" 
        class="mr-2.5 h-5 w-5 text-gray-400 group-hover:text-gray-600" 
        aria-hidden="true" 
        />
      <slot></slot>
    </a>
  </MenuItem>
</template>

<script>
import {
  MenuItem
} from '@headlessui/vue'

export default {
  components:{
    MenuItem
  },
  props: {
    icon: {
      type: [Function],
      default: undefined
    }
  }
}
</script>
