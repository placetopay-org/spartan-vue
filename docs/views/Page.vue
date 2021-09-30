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
import Avatar from "./Avatar.vue";
import Switch from "./Switch.vue";

export default {
  components: {
    Buttons,
    Inputs,
    Sidebar,
    Breadcrumbs,
    Avatar,
    Switch
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
