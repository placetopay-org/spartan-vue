<template>
  <component :is="component"></component>
</template>

<script>
import { computed } from "vue";
import { useRoute } from 'vue-router'
import Buttons from "./Buttons.vue";
import Inputs from "./Inputs.vue";
import Sidebar from "./Sidebar.vue";
import Breadcrumbs from "./Breadcrumbs.vue";

export default {
  components: {
    Buttons,
    Inputs,
    Sidebar,
    Breadcrumbs,
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
