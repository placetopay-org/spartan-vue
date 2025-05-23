<script setup lang="ts">
import { SModalLeft, SBadge, SButton, SInputBlock, SSelectBlock, SPlacetopayLogo, SSteps, SStepsItem } from '@spartan';
import { LockIcon, UserTagIcon, SmsEditIcon, ShieldTickIcon } from '@placetopay/iconsax-vue/linear';
import { AndroidIcon, AppleIcon, WindowsIcon } from '@placetopay/iconsax-vue/Crypto/bold';
import { ArrowLeftIcon } from '@heroicons/vue/24/solid';
import { EyeSlashIcon, Bars3Icon } from '@heroicons/vue/24/outline';
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

            <main class="mx-auto flex w-full max-w-xl flex-col space-y-8 p-4">
                <SSteps class="" variant="simple">
                    <SStepsItem name="Paso 1" description="Obtén la aplicación" href="#" status="current" />
                    <SStepsItem name="Paso 2" description="Escanea el QR" href="#" status="upcoming" />
                    <SStepsItem name="Paso 3" description="Clave de recuperación" href="#" status="upcoming" />
                </SSteps>

                <section class="space-y-1">
                    <h2 class="text-base font-semibold text-gray-900">1. Configurar la aplicación de autenticación</h2>
                    <p class="text-sm font-normal text-gray-700">
                        Configurar la verificación en dos pasos es fácil, solo siga los pasos a continuación.
                    </p>
                </section>

                <section class="space-y-6">
                    <div class="flex gap-2">
                        <AppleIcon class="h-6 w-6 text-gray-500" />
                        <div>
                            <h3 class="text-base font-semibold text-gray-500">Dispositivos Apple pueden usar</h3>
                            <SBadge pill size="sm">Authy para iOS</SBadge>
                            <SBadge pill size="sm">Google Authenticator para iOS</SBadge>
                        </div>
                    </div>

                    <div class="flex gap-2">
                        <AndroidIcon class="h-6 w-6 text-gray-500" />
                        <div>
                            <h3 class="text-base font-semibold text-gray-500">Dispositivos Android pueden usar:</h3>
                            <SBadge pill size="sm">Authy para Android</SBadge>
                            <SBadge pill size="sm">Google Authenticator para Android</SBadge>
                        </div>
                    </div>

                    <div class="flex gap-2">
                        <WindowsIcon class="h-6 w-6 text-gray-500" />
                        <div>
                            <h3 class="text-base font-semibold text-gray-500">Dispositivos Windows pueden usar:</h3>
                            <SBadge pill size="sm">Microsoft Authenticator</SBadge>
                        </div>
                    </div>
                </section>

                <hr class="border-gray-200" />

                <section class="grid grid-cols-1 items-center justify-between gap-8 lg:grid-cols-2 lg:gap-0">
                    <h2 class="text-base font-semibold text-gray-900">2. ¿Está abierta la aplicación?</h2>
                    <SButton
                        as="a"
                        href="/iframe.html?args=buttonPreviewMode:false&id=examples-accountsdemo-pages--two-factor-step-2"
                        >Si, listo para escanear el código</SButton
                    >
                </section>
            </main>
        </div>
    </div>
</template>
