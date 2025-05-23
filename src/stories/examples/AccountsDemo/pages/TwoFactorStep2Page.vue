<script setup lang="ts">
import QrCode from '../components/QrCode.vue';
import {
    SModalLeft,
    SBadge,
    SButton,
    SInputBlock,
    SSelectBlock,
    SPlacetopayLogo,
    SSteps,
    SStepsItem,
    SDefinitionTerm,
} from '@spartan';
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

            <main class="mx-auto flex w-full max-w-xl flex-col space-y-6 p-4">
                <SSteps class="" variant="simple">
                    <SStepsItem name="Paso 1" description="Obtén la aplicación" href="#" status="complete" />
                    <SStepsItem name="Paso 2" description="Escanea el QR" href="#" status="current" />
                    <SStepsItem name="Paso 3" description="Clave de recuperación" href="#" status="upcoming" />
                </SSteps>

                <section class="space-y-2">
                    <h2 class="text-base font-semibold text-gray-900">1. Escanea este código con tu aplicación</h2>
                    <p class="text-sm font-normal text-gray-700">
                        Utilice una aplicación de autenticación o una extensión del navegador para escanear.
                    </p>
                </section>

                <section class="flex flex-col items-center gap-6 md:flex-row">
                    <QrCode />

                    <div class="space-y-4 self-start md:self-center">
                        <SDefinitionTerm labels="Test" description="john.doe@evertecinc.com" />
                        <SDefinitionTerm labels="Identificador" description="PlacetoPay Accounts" />
                        <SDefinitionTerm labels="Código de configuración" description="2XCMUFUNXFTMROAP" />
                    </div>
                </section>

                <p class="text-sm font-normal text-gray-700">
                    ¿No se puede escanear? Usa el <strong>código de configuración</strong> para configurar manualmente
                    su aplicación de autenticación.
                </p>

                <hr class="border-gray-200" />

                <section class="space-y-2">
                    <h2 class="text-base font-semibold text-gray-900">2. Introduce el código de 6 dígitos aquí</h2>
                    <p class="text-sm font-normal text-gray-700">
                        Ingrese el código proporcionado para validar la sincronización con la aplicación de seguridad.
                    </p>
                </section>

                <section class="grid grid-cols-1 items-end gap-4 lg:grid-cols-2">
                    <SInputBlock
                        type="password"
                        label="Código de 6 dígitos"
                        :right-icon="LockIcon"
                        :icon-right="true"
                    />
                    <SButton
                        class="w-full"
                        as="a"
                        href="/iframe.html?args=buttonPreviewMode:false&id=examples-accountsdemo-pages--two-factor-step-3"
                    >
                        Validar código
                    </SButton>
                </section>
            </main>
        </div>
    </div>
</template>
