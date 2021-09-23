<template>
    <li>
        <div class="flex items-center">
          <component
            :is="icon"
            class="flex-shrink-0 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
          <a
            :href="href"
            class="text-sm font-medium text-gray-500 hover:text-gray-700"
            :class="{'ml-4': !!icon}"
            :aria-current="active ? 'page' : undefined"
          >
            <slot></slot>
          </a>
        </div>
    </li>
</template>

<script>


export default {
  props: {
    href: {
      type: String,
      required: false,
      default: '#'
    },
    icon: {
      type: [Object, String],
      default: undefined
    },
    active: {
      type: Boolean,
      required: false,
      default: false,
    }
  }

}
</script>

