<script setup lang="ts">
import { SModalLeft, SButton, SPlacetopayLogo, SSteps, SStepsItem } from '@spartan';
import { CloudArrowDownIcon } from '@heroicons/vue/24/solid';
import { Bars3Icon } from '@heroicons/vue/24/outline';
import VSidebar from '../components/VSidebar.vue';
import { ref } from 'vue';

const open = ref(false);
</script>

<template>
    <div class="flex w-full divide-x divide-gray-200">
        <VSidebar current="Autenticación" class="hidden lg:flex" />

        <SModalLeft breakpoint="lg" :open="open" @close="() => (open = false)">
            <VSidebar current="Autenticación" />
        </SModalLeft>

        <div class="flex w-full flex-1 flex-col items-start">
            <div class="flex w-full items-center justify-between border-b border-gray-200 p-4 lg:hidden">
                <SPlacetopayLogo :height="35" />

                <button class="p-2.5" @click="open = true">
                    <Bars3Icon class="h-6 w-6 text-gray-500" />
                </button>
            </div>

            <h2 class="p-4 text-2xl font-semibold text-gray-900 lg:px-6 lg:py-8">Autenticación</h2>

            <main class="mx-auto flex w-full max-w-xl flex-col p-4">
                <SSteps class="" variant="simple">
                    <SStepsItem name="Paso 1" description="Obtén la aplicación" href="#" status="complete" />
                    <SStepsItem name="Paso 2" description="Escanea el QR" href="#" status="complete" />
                    <SStepsItem name="Paso 3" description="Clave de recuperación" href="#" status="current" />
                </SSteps>

                <section class="mt-8 space-y-2">
                    <h2 class="text-base font-semibold text-gray-900">
                        Guarda esta clave de recuperación de emergencia
                    </h2>
                    <p class="text-sm font-normal text-gray-700">
                        Si dejas de tener acceso al teléfono, no podrás iniciar sesión en la cuenta sin esta clave.
                        Imprime, copia o anota esta clave sin que nadie la vea.
                    </p>
                </section>

                <section class="mt-6 flex flex-col gap-4 md:flex-row">
                    <SButton class="w-full md:w-fit" variant="secondary" :right-icon="CloudArrowDownIcon"
                        >Descargar clave</SButton
                    >
                    <SButton class="w-full md:w-fit">Finalizar autenticación</SButton>
                </section>
            </main>
        </div>
    </div>
</template>
