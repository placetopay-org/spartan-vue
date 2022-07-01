<template>
  <div
    aria-live="assertive"
    class="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
  >
    <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
      <transition
        enter-active-class="transform ease-out duration-300 transition"
        enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="show"
          class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-xl ring-1 ring-black ring-opacity-5"
        >
          <div :class="['border-l-4 p-4', wrapperClasses]">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <component
                  :is="icon"
                  class="h-6 w-6"
                  :class="[classes]"
                  aria-hidden="true"
                />
              </div>
              <div class="ml-3 w-0 flex-1 pt-0.5">
                <p class="text-sm font-medium text-gray-900">
                  <slot />
                </p>
              </div>
              <div class="ml-4 mt-0.5 flex flex-shrink-0">
                <button
                  @click="show = false"
                  class="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2"
                >
                  <span class="sr-only">Close</span>
                  <XIcon class="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { CheckCircleIcon, XCircleIcon } from "@heroicons/vue/outline";
import { XIcon } from "@heroicons/vue/outline";

const options = {
  success: {
    wrapperClasses: "border-green-400",
    classes: "text-green-400",
    icon: CheckCircleIcon,
  },
  danger: {
    wrapperClasses: "border-red-400",
    classes: "text-red-400",
    icon: XCircleIcon,
  },
};

export default {
  components: {
    CheckCircleIcon,
    XCircleIcon,
    XIcon,
  },
  props: {
    type: {
      type: String,
      required: false,
      default: "success",
    },
    show: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    wrapperClasses() {
      return options[this.type].wrapperClasses;
    },
    classes() {
      return options[this.type].classes;
    },
    icon() {
      return options[this.type].icon;
    },
  },
};
</script>
