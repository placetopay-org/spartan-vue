<template>
  <div class="h-screen flex bg-white overflow-hidden">
    <Sidebar>
      <SidebarContent></SidebarContent>
    </Sidebar>
    <div class="flex flex-col w-0 flex-1 overflow-hidden">
      <div class="md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3">
        <button
          type="button"
          class="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          @click="openSidebar"
        >
          <span class="sr-only">Open sidebar</span>
          <MenuIcon class="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <main class="flex-1 relative z-0 overflow-y-auto focus:outline-none">
        <div class="mx-auto my-auto">
          <router-view></router-view>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { SButton, SInput } from "../src/index.js";
import { MenuIcon } from '@heroicons/vue/outline'
import Sidebar from "./components/Sidebar.vue";
import useSidebar from "./composables/useSidebar";
import SidebarContent from "./components/SidebarContent.vue";

export default {
  name: "App",
  components: {
    SButton,
    SInput,
    Sidebar,
    MenuIcon,
    SidebarContent
  },
  setup() {
    const { sidebarOpen, openSidebar } = useSidebar()

    return {
      sidebarOpen,
      openSidebar,
    }
  }
}
</script>

<style scoped>

</style>
