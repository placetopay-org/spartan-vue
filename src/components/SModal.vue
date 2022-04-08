<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="fixed z-10 inset-0 overflow-y-auto" @close="open = false">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
          <DialogOverlay class="fixed inset-0 bg-transparent bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
          <div :class="[maxSize ? 'max-w-lg' : 'max-w-sm']" class="relative inline-flex flex-col gap-6 align-bottom bg-white rounded-xl p-6 text-left overflow-hidden shadow-2xl transform transition-all  sm:align-middle sm:w-full">
            <div class="flex flex-col items-center">
              <div class="text-center">
                <DialogTitle as="h3" class="text-base leading-6 font-semibold text-gray-900">{{ title }}</DialogTitle>
                <div class="mt-2">
                  <p class="text-sm text-gray-500 font-normal">{{ description }}</p>
                </div>
              </div>
            </div>
            <div class="flex w-full flex-row">
              <slot/>
            </div>
          </div>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
import { SButton} from "../index";
import { Dialog, DialogOverlay, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'

export default {
  components: {
    Dialog,
    DialogOverlay,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
    SButton
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    maxSize: {
      type: Boolean,
      default: false,
    },
    open: {
      type: Boolean,
      default: false,
    },
  },
}
</script>