<template>
    <div class="relative z-10 flex-shrink-0 flex h-16 border-b">
      <button
        type="button"
        class="block md:hidden px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-800"
        @click="toggleSidebar('mobile')"
      >
        <span class="sr-only">Open sidebar</span>
        <Bars3Icon class="h-6 w-6" aria-hidden="true" />
      </button>

      <button
        type="button"
        class="hidden md:block rounded-xl px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-800"
        @click="toggleSidebar('desktop')"
      >
        <span class="sr-only">Toggle Sidebar</span>
        <Bars3Icon class="h-6 w-6" aria-hidden="true" />
      </button>
      <div class="flex-1 px-4 flex justify-between">
        <div class="flex-1 flex">

        </div>
        <div class="ml-4 flex items-center md:ml-6">
          <!-- Notifications -->
          <slot></slot>
        </div>
      </div>
    </div>
</template>

<script>
import {Bars3Icon} from '@heroicons/vue/24/outline'
import useSidebar from "../../composables/useSidebar";

export default {
  components: {
    Bars3Icon
  },
  setup() {
    const { toggleSidebar } = useSidebar()

    return {
      toggleSidebar,
    }
  }
}
</script>

<style scoped>

</style>
