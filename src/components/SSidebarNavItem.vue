<template>
  <a
    v-bind="$attrs"
    :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50']"
    class="group flex items-center px-3 py-3 text-base font-medium rounded-lg md:py-3.5 md:px-4 md:text-sm"
  >
    <component
      :is="icon"
      class="mr-3 flex-shrink-0 h-6 w-6"
      :class="[active ? 'text-gray-600' : 'text-gray-400 group-hover:text-gray-500']"
      aria-hidden="true"
    />
    <span class="flex-1">
      <slot></slot>
    </span>
  </a>
</template>

<script>
export default {
  props: {
    icon: {
      type: [Function],
      default: undefined
    },
    active: {
      type: Boolean,
      required: false,
      default: false,
    },
  }
}
</script>
