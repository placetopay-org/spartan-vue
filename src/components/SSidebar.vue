<template>
  <div class="md:flex md:flex-shrink-0">
    <TransitionRoot as="template" :show="sidebar.mobile.isOpen">
      <Dialog
        as="div"
        class="fixed inset-0 z-40 flex md:hidden"
        @close="closeSidebar('mobile')"
      >
        <TransitionChild
          as="template"
          enter="transition-opacity ease-linear duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <DialogOverlay class="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </TransitionChild>
        <TransitionChild
          as="template"
          enter="transition ease-in-out duration-300 transform"
          enter-from="-translate-x-full"
          enter-to="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leave-from="translate-x-0"
          leave-to="-translate-x-full"
        >
          <div
            class="relative flex w-full max-w-xs flex-1 flex-col bg-white pt-5 pb-4"
          >
            <TransitionChild
              as="template"
              enter="ease-in-out duration-300"
              enter-from="opacity-0"
              enter-to="opacity-100"
              leave="ease-in-out duration-300"
              leave-from="opacity-100"
              leave-to="opacity-0"
            >
              <div class="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  type="button"
                  class="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  @click="closeSidebar('mobile')"
                >
                  <span class="sr-only">Close sidebar</span>
                  <XIcon class="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>
            </TransitionChild>
            <div class="flex flex-1 flex-col overflow-y-auto pt-4 pb-4 md:pt-5">
              <slot></slot>
            </div>
          </div>
        </TransitionChild>
        <div class="w-14 flex-shrink-0">
          <!-- Dummy element to force sidebar to shrink to fit close icon -->
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Static sidebar for desktop -->
    <TransitionRoot as="template" :show="sidebar.desktop.isOpen">
      <TransitionChild
        as="template"
        enter="transition ease-in-out duration-300 transform"
        enter-from="-translate-x-full"
        enter-to="translate-x-0"
        leave="transition ease-in-out duration-300 transform"
        leave-from="translate-x-0"
        leave-to="-translate-x-full"
      >
        <div class="hidden md:flex md:flex-shrink-0">
          <div class="flex w-64 flex-grow flex-col">
            <div
              class="flex min-h-0 flex-1 flex-col rounded-r-xl border bg-white shadow-lg"
            >
              <div class="flex flex-1 flex-col overflow-y-auto pt-8 pb-4">
                <slot></slot>
              </div>
            </div>
          </div>
        </div>
      </TransitionChild>
    </TransitionRoot>
  </div>
</template>

<script>
import {
  Dialog,
  DialogOverlay,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { MenuIcon, XIcon } from "@heroicons/vue/outline";

import useSidebar from "../composables/useSidebar";

export default {
  components: {
    Dialog,
    DialogOverlay,
    TransitionChild,
    TransitionRoot,
    MenuIcon,
    XIcon,
  },
  setup() {
    const { closeSidebar, sidebar } = useSidebar();

    return {
      closeSidebar,
      sidebar,
    };
  },
};
</script>
