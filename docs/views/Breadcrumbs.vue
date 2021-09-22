<template>
    <div class="flex flex-col h-full flex-1 justify-center items-center">

      <div class="w-full pb-3">
        <h2 class="pb-6">Breadcrumb</h2>
        <table-component :data="dataDescription" />
      </div>
      
      <div class="w-full max-w-xs mx-auto">
        <div>
          <h3 class="pb-3">Simple</h3>
      
        </div>

      

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
      pages: [
        { name: 'first level', href: '#', current: false },
        { name: 'second level', href: '#', current: true },
      ]
    }
  },
}
</script>