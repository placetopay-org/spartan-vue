<template>
    <div class="flex h-full flex-1 justify-center items-center">

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

export default {
  components: {
    SInput,
    SInputError,
    SInputHelper
  },
  data() {
    return {
      name: "email",
      label: "email label",
      placeholder: "jhon@example.com",
      error_message: "error message",
      helper_message: "helper message",
    }
  }
}
</script>

<style scoped>

</style>
