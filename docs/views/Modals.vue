<template>
  <div class="flex flex-col h-full flex-1 justify-center items-center mt-10">
    <div class="m-5">
      <h2 class="mb-5">Modals</h2>
    </div>
    <div class="flex h-full flex-1 justify-center items-center">

      <SButton @click="this.modalState = true">Open modal</SButton>

      <SModal :show="modalState" @close="this.modalState = false">
        <div class="px-6 py-6 space-y-2">
          <div class="text-md text-left">
            <component is="ExclamationIcon" class="rounded-full w-14" aria-hidden="true" />
            <span class="font-medium text-md text-gray-900"> Hello, I'm a modal title</span>
          </div>
          <div class="mt-4 text-md text-gray-600">
            Here, you can structure your content
          </div>
        </div>

        <div class="px-6 mb-4 bg-white">
          <SButton @click="this.modalState = false">Cancel</SButton>
        </div>
      </SModal>
    </div>

    <div class="mt-20">
      <h2 class="mb-5">Component attributes</h2>
      <table-component :data="dataDescription"/>
    </div>
  </div>
</template>

<script>

import { SButton, SModal } from "../../src/index";
import { ExclamationIcon } from "@heroicons/vue/outline";
import TableComponent from "./components/TableComponent.vue";

const dataDescription = [
  { prop: 'show', description: 'flag to show or hide modal', accepted: 'bool', default: 'false' },
  { prop: 'max-width', description: 'max size of modal', accepted: 'sm, md, lg, xl, 2xl', default: '2xl' },
]

export default {
  name: "Modals",
  components: {
    SButton,
    SModal,
    ExclamationIcon,
    TableComponent
  },
  setup() {
    return {
      dataDescription,
    }
  },
  data() {
    return {
      modalState: false,
    }
  },
}
</script>

<style scoped>

</style>