<template>
  <div class="max-w-7xl mx-auto pt-24 px-8 bg-gray-100 min-h-screen space-y-8">
    <div>
      <h1 class="text-xl font-medium">Input</h1>

      <div class="py-10 px-4 sm:px-6 lg:px-8 bg-white border rounded-xl mt-12">
        <div class="space-x-6">
          <SInput
          label="Nombres"
          ></SInput>
        </div>
      </div>
    </div>
    <div>
      <h1 class="text-xl font-medium">Button</h1>

      <div class="py-10 px-4 sm:px-6 lg:px-8 bg-white border rounded-xl mt-12">
        <div class="space-x-6">
          <SButton color="primary">
            Guardar
          </SButton>

          <SButton color="default">
            Guardar
          </SButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { SButton, SInput } from "../src/index.js";

export default {
  name: "App",
  components:{
    SButton,
    SInput
  }
}
</script>

<style scoped>

</style>
