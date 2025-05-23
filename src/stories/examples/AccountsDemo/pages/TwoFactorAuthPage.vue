<script setup lang="ts">
import { SModalLeft, SButton, SPlacetopayLogo } from '@spartan';
import { ShieldTickIcon } from '@placetopay/iconsax-vue/linear';
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

            <main class="mx-auto flex max-w-xl flex-col space-y-8 p-6">
                <div class="w-fit self-center rounded-full border border-gray-200 p-3">
                    <ShieldTickIcon class="h-6 w-6" />
                </div>

                <section class="text-center">
                    <h1 class="text-2xl font-semibold text-gray-900">Autenticación de 2 factores</h1>
                    <p class="text-sm font-normal text-gray-400">
                        La autenticación de dos factores agrega una capa adicional de seguridad a su cuenta al requerir
                        algo más que una contraseña para iniciar sesión.
                    </p>
                </section>

                <section class="text-center">
                    <p class="text-sm font-normal text-gray-400">
                        La autenticación de dos factores protege contra ataques de phishing, ingeniería social y fuerza
                        bruta de contraseñas y protege sus inicios de sesión de los atacantes que explotan credenciales
                        débiles o robadas.
                    </p>
                </section>

                <section class="flex justify-center">
                    <SButton
                        as="a"
                        href="/iframe.html?args=buttonPreviewMode:false&id=examples-accountsdemo-pages--two-factor-step-1"
                        >Habilitar la autenticación</SButton
                    >
                </section>
            </main>
        </div>
    </div>
</template>
