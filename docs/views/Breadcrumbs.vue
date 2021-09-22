<template>
    <div class="flex flex-col h-full flex-1 justify-center items-center">

      <div class="w-full md:max-w-prose sm:max-w-xs mx-auto">
          <h3 class="pb-3">Simple</h3>
          <s-breadcrumbs :homepage="homepage" :pages="pages" />
      </div>

    </div>  
</template>

<script>
import { SBreadcrumbs } from "../../src/index.js";
import TableComponent from "./components/TableComponent.vue";

const dataDescription = [
  { prop: 'pages', description: 'array of pages', accepted: '-', default: "[]" },
]

export default {
  setup() {
    return {
      dataDescription,
    }
  },
  components: {
    TableComponent,
    SBreadcrumbs,
  },
  data() {
    return {
      homepage: {
        name: 'home', href: '#'
      },
      pages: [
        { name: 'first level', href: '#', current: false },
        { name: 'second level', href: '#', current: true },
      ]
    }
  },
}
</script>