<template>
    <div class="flex flex-col h-full flex-1 justify-center items-center">

      <div class="w-full pb-3">
        <h2 class="pb-6">Inputs</h2>
        <table-component :data="dataDescription" />
      </div>
      
      <div class="w-full max-w-xs mx-auto">
        <div>
          <h3 class="pb-3">Simple</h3>
          <s-input :type="'email'" :name="name" :label="email" id="email" :placeholder="placeholder" />
        </div>

        <div class="mt-8">
          <h3 class="pb-3">With Error</h3>
          <s-input :name="name" :label="email" id="email" :placeholder="placeholder" />
          <s-input-error :message="error_message" />
        </div>

        <div class="mt-8">
          <h3 class="pb-3">With helper</h3>
          <s-input :name="name" :label="email" id="email" :placeholder="placeholder" />
          <s-input-helper :message="helper_message" />
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
      label: "email label",
      placeholder: "jhon@example.com",
      error_message: "error message",
      helper_message: "helper message",
    }
  },
}
</script>

<style scoped>

</style>
