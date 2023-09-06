<script setup lang="ts">
import { ref } from 'vue';
import { SButton, SInput, SSelect } from '../../';

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const country = ref('colombia');
const streetAddress = ref('');
const city = ref('');
const state = ref('');
const postalCode = ref('');
</script>

<template>
  <div class="bg-gray-50 p-8 shadow-md">
    <header class="mb-4">
      <h1 class="text-base font-semibold text-gray-900">Información personal</h1>
      <p class="mt-1 text-sm text-gray-600">Utilice una dirección permanente donde pueda recibir correo.</p>
    </header>

    <form class="bg-white border border-gray-100 shadow-sm rounded-xl p-8">
      <section class="grid gap-6 grid-cols-6">
        <SInput v-model="firstName" id="firstName" label="Nombre" class="col-span-3" />
        <SInput v-model="lastName" id="lastName" label="Apellido" class="col-span-3" />
        <SInput v-model="email" id="email" label="Correo electrónico" class="col-span-6 max-w-sm" />
        <SSelect v-model="country" id="country" label="País" class="col-span-6 max-w-sm">
          <option value="colombia">Colombia</option>
          <option value="puertoRico">Puerto Rico</option>
          <option value="ecuador">Ecuador</option>
        </SSelect>
        <SInput v-model="streetAddress" id="streetAddress" label="Dirección" class="col-span-6" />
        <SInput v-model="city" id="city" label="Ciudad" class="col-span-2" />
        <SInput v-model="state" id="state" label="Estado / Provincia" class="col-span-2" />
        <SInput v-model="postalCode" id="postalCode" label="Código postal" class="col-span-2" />
      </section>

      <hr class="my-8" />

      <section class="flex justify-end gap-2">
        <SButton variant="secondary"> Cancelar </SButton>
        <SButton variant="primary"> Guardar </SButton>
      </section>
    </form>
  </div>
</template>
