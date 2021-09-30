<template>
  <div class="flex flex-col h-full flex-1 justify-center items-center mt-10">

    <div class="m-5">
      <h2 class="mb-5">Switch</h2>
    </div>

    <div class="space-y-16">
      <div class="m-5">
        <p class="pb-8 text-sm font-medium text-gray-600">Simple</p>
        <SSwitch />
      </div>
      <div class="m-5">
        <p class="pb-8 text-sm font-medium text-gray-600">With label</p>
        <SSwitch label="some value" />
      </div>
      <div class="m-5">
        <p class="pb-8 text-sm font-medium text-gray-600">disabled</p>
        <SSwitch disabled/>
      </div>
    </div>
    <div class="mt-20">
      <h2 class="mb-5">Component attributes</h2>
      <table-component :data="dataDescription" />
    </div>
  </div>
</template>

<script>
import { SSwitch } from "../../src/index.js";
import TableComponent from "./components/TableComponent.vue";

const dataDescription = [
  { prop: 'label', description: 'label message', accepted: 'String', default: "undefined" },
  { prop: 'disabled', description: 'disabled attribute', accepted: 'bool', default: "false" },
]

export default {
  name: "Switch",
  components: {
    SSwitch,
    TableComponent,
  },
  setup() {
    return {
      dataDescription
    }
  }
}
</script>

<style scoped>

</style>