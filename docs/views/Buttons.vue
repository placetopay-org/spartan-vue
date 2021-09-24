<template>
  <div class="flex h-full flex-1 justify-center items-center">

    <div class="space-x-6">
      <s-button color="primary">
        primary
      </s-button>

      <s-button color="default">
        default
      </s-button>

      <s-button color="danger">
        danger
      </s-button>
    </div>

  </div>
</template>

<script>
import { SButton } from "../../src/index.js";

export default {
  components: {
    SButton
  }
}
</script>

<style scoped>

</style>
