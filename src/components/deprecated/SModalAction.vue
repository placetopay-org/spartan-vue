<template>
  <SModalLayout v-bind="$attrs">
    <div class="p-6">
      <div>
        <div
          :class="[
            iconWrapperClasses,
            'mx-auto flex h-12 w-12 items-center justify-center rounded-full',
          ]"
        >
          <component :is="iconToUse" class="h-6 w-6" aria-hidden="true" />
        </div>
        <div class="mt-3 text-center sm:mt-5">
          <DialogTitle
            as="h3"
            class="text-lg font-medium leading-6 text-gray-900"
          >
            <slot name="title" />
          </DialogTitle>
          <div class="mt-2">
            <p class="text-sm text-gray-500">
              <slot name="description" />
            </p>
          </div>
        </div>
      </div>
      <div class="mt-5 sm:mt-6">
        <slot name="actions" />
      </div>
    </div>
  </SModalLayout>
</template>

<script>
import { SButton } from "@spartan";
import { SModalLayout } from "./index";
import {
  Dialog,
  DialogOverlay,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";

import {
  CheckIcon,
  ExclamationCircleIcon,
  ChatBubbleBottomCenterTextIcon,
} from "@heroicons/vue/24/outline";

const options = {
  success: {
    iconWrapperClasses: "bg-green-100 text-green-600",
    icon: CheckIcon,
  },
  danger: {
    iconWrapperClasses: "bg-red-100 text-red-600",
    icon: ExclamationCircleIcon,
  },
  default: {
    iconWrapperClasses: "bg-gray-300 text-gray-800",
    icon: ChatBubbleBottomCenterTextIcon,
  },
};

export default {
  components: {
    Dialog,
    DialogOverlay,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
    SButton,
    SModalLayout,
  },
  props: {
    icon: {
      type: [Object, String, Function],
      default: undefined,
    },
    type: {
      type: String,
      default: "default",
    },
  },
  computed: {
    iconWrapperClasses() {
      return options[this.type].iconWrapperClasses;
    },
    iconToUse() {
      return this.icon || options[this.type].icon;
    },
  },
};
</script>
