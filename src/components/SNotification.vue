<template>
  <div aria-live="assertive" class="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start">
    <div class="w-full flex flex-col items-center space-y-4 sm:items-end">
      <!-- Notification panel, dynamically insert this into the live region when it needs to be displayed -->
      <transition enter-active-class="transform ease-out duration-300 transition" enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2" enter-to-class="translate-y-0 opacity-100 sm:translate-x-0" leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
        <div v-if="show" class="max-w-sm  bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
          <div :class="['p-4 border-l-4', danger ? 'border-red-500' : 'border-green-400']">
            <div class="flex items-start">
              <div class="flex-shrink-0 h-6 p-0.5">
                <component :is="icon" class="h-5 w-5" :class="[classes]" aria-hidden="true" />
              </div>
              <div class="ml-1.5 pt-0.5">
                <p class="text-sm font-medium text-gray-900" v-text="label"></p>
              </div>
              <div class="flex-shrink-0 ml-8 flex">
                <button @click="show = false" class="bg-white rounded-md inline-flex text-gray-400">
                  <span class="sr-only">Close</span>
                  <XIcon class="h-6 w-6 text-gray-900" aria-hidden="true" />
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
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/vue/solid'
import { XIcon } from '@heroicons/vue/outline'

export default {
  components: {
    CheckCircleIcon,
    ExclamationCircleIcon,
    XIcon,
  },
  props: {
    label: {
      type: String
    },
    danger: {
      type: Boolean,
      default: false,
    },
    show: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      colorClass: {
        successful: { class: "text-green-400", icon: CheckCircleIcon},
        danger: { class: "text-red-500", icon: ExclamationCircleIcon},
      },
    };
  },
  computed: {
    classes() {
      return [this.colorClass[this.getType()].class]
    },
    icon() {
      return this.colorClass[this.getType()].icon
    },
  },
  methods: {
    getType() {
      if (this.danger) {
        return 'danger'
      }
      return 'successful'
    }
  }
}
</script>