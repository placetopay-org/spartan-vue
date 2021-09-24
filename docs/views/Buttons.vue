<template>
  <div class="flex h-full flex-1 justify-center items-center">

    <div class="space-x-6">
      <s-button class="primary">
        primary
      </s-button>

      <s-button class="default">
        default
      </s-button>

      <s-button class="danger">
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
