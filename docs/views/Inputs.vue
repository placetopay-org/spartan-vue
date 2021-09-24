<template>
    <div class="flex flex-col h-full flex-1 justify-center items-center mt-10">

      <div>
        <div class="m-5">
          <h2 class="mb-5">Inputs</h2>
        </div>

        <div class="space-y-16">
          <div class="m-5">
            <p class="pb-8 text-sm font-medium text-gray-600">Simple</p>
            <SInput type="email" :name="name" :label="label" id="email" :placeholder="placeholder" />
          </div>
          <div class="m-5">
            <p class="pb-8 text-sm font-medium text-gray-600">With Error</p>
            <SInput type="email" :name="name" :label="label" id="email" :placeholder="placeholder" />
            <SInputError :message="error_message" />
          </div>
          <div class="m-5">
            <p class="pb-8 text-sm font-medium text-gray-600">With helper</p>
            <SInput type="email" :name="name" :label="label" id="email" :placeholder="placeholder" />
            <SInputHelper :message="helper_message" />
          </div>
        </div>

        <div class="mt-20">
          <h2 class="mb-5">API</h2>

          <table-component :data="dataDescription"/>
        </div>

      </div>

    </div>  
</template>

<script>
import { SInput, SInputError, SInputHelper } from "../../src/index.js";
import TableComponent from "./components/TableComponent.vue";

const dataDescription = [
  { prop: 'label', description: 'label message', accepted: '-', default: "undefined" },
  { prop: 'type', description: 'the input type', accepted: 'html input types', default: "text" },
  { prop: 'name', description: 'input name attribute', accepted: '-', default: 'undefined' },
  { prop: 'id', description: 'input id attribute', accepted: '-', default: 'undefined' },
  { prop: 'placeholder', description: 'input placeholder attribute', accepted: '-', default: 'undefined' },
  { prop: 'disabled', description: 'input disabled attribute', accepted: 'boolean', default: 'false' },
  // More people...
]

export default {
  setup() {
    return {
      dataDescription,
    }
  },
  components: {
    TableComponent,
    SInput,
    SInputError,
    SInputHelper,
  },
  data() {
    return {
      name: "email",
      label: "Email Address",
      placeholder: "jhon@example.com",
      error_message: "Your email address is required",
      helper_message: "You may not use @yopmail addresses",
    }
  },
}
</script>

<style scoped>

</style>
