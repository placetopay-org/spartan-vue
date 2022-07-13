<template>
  <component
    :is="as"
    v-bind="$attrs"
    :class="[
      active ? 'text-gray-900' : 'bg-white text-gray-600 hover:text-gray-900',
      'group flex items-center rounded-md py-2 pl-2 pr-1 text-sm font-medium focus:outline-none focus:ring focus:ring-primary-100',
    ]"
  >
    <component
      :is="icon"
      :class="[
        active ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
        'mr-2.5 h-6 w-6',
      ]"
      aria-hidden="true"
    />
    <span class="flex-1">
      <slot></slot>
    </span>
  </component>
</template>

<script>
export default {
  props: {
    icon: {
      type: [Object, Function],
      default: undefined,
    },
    as: {
      default: "a",
    },
    active: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};
</script>
