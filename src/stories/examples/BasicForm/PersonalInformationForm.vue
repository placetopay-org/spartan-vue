<script setup lang="ts">
import { ref } from 'vue';
import { SButton, SInputBlock, SSelectBlock } from '../../../';

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

        <form class="rounded-xl border border-gray-100 bg-white p-8 shadow-sm">
            <section class="grid grid-cols-6 gap-6">
                <div class="col-span-3">
                    <SInputBlock id="firstName" v-model="firstName" label="Nombre" />
                </div>
                <div class="col-span-3">
                    <SInputBlock id="lastName" v-model="lastName" label="Apellido" />
                </div>
                <div class="col-span-6 max-w-sm">
                    <SInputBlock id="email" v-model="email" label="Correo electrónico" />
                </div>

                <SSelectBlock id="country" v-model="country" label="País" class="col-span-6 max-w-sm">
                    <option value="colombia">Colombia</option>
                    <option value="puertoRico">Puerto Rico</option>
                    <option value="ecuador">Ecuador</option>
                </SSelectBlock>
                <div class="col-span-6">
                    <SInputBlock id="streetAddress" v-model="streetAddress" label="Dirección" />
                </div>
                <div class="col-span-2">
                    <SInputBlock id="city" v-model="city" label="Ciudad" />
                </div>
                <div class="col-span-2">
                    <SInputBlock id="state" v-model="state" label="Estado / Provincia" />
                </div>
                <div class="col-span-2">
                    <SInputBlock id="postalCode" v-model="postalCode" label="Código postal" />
                </div>
            </section>

            <hr class="my-8" />

            <section class="flex justify-end gap-2">
                <SButton variant="secondary"> Cancelar </SButton>
                <SButton variant="primary"> Guardar </SButton>
            </section>
        </form>
    </div>
</template>
