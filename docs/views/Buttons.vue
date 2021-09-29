<template>
  <div class="flex flex-col h-full flex-1 justify-center items-center mt-10">
    <div class="m-5">
      <h2 class="mb-5">Buttons</h2>
    </div>

    <div class="flex h-full flex-1 justify-center items-center">
      <div class="space-x-6">
        <SButton color="primary">
          Guardar
        </SButton>

        <SButton color="default">
          Cancelar
        </SButton>

        <SButton color="danger">
          Borrar
        </SButton>
      </div>
    </div>

    <div class="mt-20">
      <h2 class="mb-5">Component attributes</h2>
      <table-component :data="dataDescription"/>
    </div>
  </div>
</template>

<script>
import { SButton } from "../../src/index.js";
import TableComponent from "./components/TableComponent.vue";

const dataDescription = [
  { prop: 'color', description: 'button color', accepted: 'primary, danger, default', default: 'default' },
]

export default {
  setup() {
    return {
      dataDescription,
    }
  },
  components: {
    SButton,
    TableComponent,
  }
}
</script>

<style scoped>

</style>
