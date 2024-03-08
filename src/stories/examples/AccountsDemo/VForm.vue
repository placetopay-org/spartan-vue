<script setup lang="ts">
import { ref } from 'vue';
import { SPlacetopayLogo, STab, STabItem, SInputBlock, SButton, SInputOTP, SInputOTPItem } from '../../../';
import { computed } from 'vue';
import { ArrowLeftIcon } from '@heroicons/vue/20/solid';
import { LockClosedIcon } from '@heroicons/vue/24/outline';

const props = withDefaults(
    defineProps<{
        routeParam: string;
    }>(),
    {
        routeParam: 'login',
    },
);

const route = ref(props.routeParam);
const push = (newRoute?: string) => {
    if (!newRoute) return;
    route.value = newRoute;
};

const AuthRoutes = ['login', 'signup'];

const atLogin = computed(() => route.value === 'login');

const otp = ref('');
</script>

<template>
    <form class="flex h-full w-full max-w-sm flex-col items-center justify-center bg-white">
        <SPlacetopayLogo class="mb-8" :height="32" />

        <template v-if="AuthRoutes.includes(route)">
            <STab :model-value="route" @update:model-value="(newRoute) => push(newRoute)" full class="mb-6 w-full">
                <STabItem path="login">Ingresar</STabItem>
                <STabItem path="signup">Soy nuevo</STabItem>
            </STab>

            <div class="flex w-full flex-col gap-6">
                <SInputBlock v-if="!atLogin" label="Nombre" />
                <SInputBlock label="Correo electrónico" placeholder="tuemail@ejemplo.com" />
                <SInputBlock label="Contraseña" type="password" />
                <SInputBlock v-if="!atLogin" label="Confirmar la contraseña" type="password" />

                <button
                    type="button"
                    @click="push('restore-password')"
                    class="text-center text-xs font-medium text-gray-400"
                >
                    ¿Olvidaste tu contraseña?
                </button>
                <SButton class="w-full">{{ atLogin ? 'Ingresar' : 'Registrarse' }}</SButton>

                <p class="text-xs font-normal text-gray-400">
                    Al continuar acepto las políticas aplicables para el tratamiento de mis datos personales según la
                    jurisdicción local del responsable y de
                    <strong class="font-semibold text-gray-500">Evertec PlacetoPay</strong> en su calidad de encargado.
                </p>
            </div>
        </template>

        <template v-if="route === 'restore-password'">
            <h2 class="mb-1.5 font-semibold text-gray-900">Restablecer contraseña</h2>
            <p class="mb-6 text-center text-xs text-gray-600">
                Ingrese el correo electrónico asociado con su cuenta y le enviaremos un enlace para restablecer su
                contraseña.
            </p>

            <SInputBlock class="mb-6 w-full" label="Correo electrónico" placeholder="tuemail@ejemplo.com" />

            <div class="flex w-full">
                <SButton class="mr-4 w-fit" variant="secondary" :left-icon="ArrowLeftIcon" @click="push('login')">
                    Volver
                </SButton>
                <SButton class="flex-1" @click="push('otp')">Envíar link</SButton>
            </div>
        </template>

        <template v-if="route === 'otp'">
            <div class="border border-gray-100 rounded-full p-3 mb-6">
                <LockClosedIcon class="mx-auto h-6 w-6 text-gray-900" />
            </div>
            <h2 class="mb-1.5 font-semibold text-gray-900">Código de autenticación</h2>
            <p class="mb-6 text-center text-xs text-gray-600">
                Abra su aplicación de autenticación de dos factores (TOTP) o la extensión del navegador para ver su
                código de autenticación.
            </p>

            <SInputOTP v-model="otp" class="mb-6">
                <SInputOTPItem />
                <SInputOTPItem />
                <SInputOTPItem class="mr-2.5" />

                <SInputOTPItem />
                <SInputOTPItem />
                <SInputOTPItem />
            </SInputOTP>

            <div class="flex w-full">
                <SButton class="mr-4 w-fit" variant="secondary" :left-icon="ArrowLeftIcon" @click="push('login')">
                    Volver
                </SButton>
                <SButton class="flex-1" @click="push('otp')">Verificar</SButton>
            </div>
        </template>
    </form>
</template>
