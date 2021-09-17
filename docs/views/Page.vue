<template>
  <component :is="component"></component>
</template>

<script>
import { computed } from "vue";
import { useRoute } from 'vue-router'
import Buttons from "./Buttons.vue";
import Inputs from "./Inputs.vue";

export default {
  components: {
    Buttons,
    Inputs
  },
  setup() {
    const route = useRoute();

    const component = computed(() => {
      return route.params.view
    });

    return {
      component
    }
  }
}
</script>

<style scoped>

</style>
