<template>
    <div class="flex h-full flex-1 justify-center items-center">

      <div class="w-full max-w-xs mx-auto">
        <SInput name="email" label="Correo Electrónico" id="email" placeholder="jhon@example.com"></SInput>
      </div>

    </div>  
</template>

<script>
import { SInput } from "../../src/index.js";
export default {
  components: {
    SInput
  }
}
</script>

<style scoped>

</style>
