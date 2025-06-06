<script setup lang="ts">
import { ref } from 'vue';
import { SPlacetopayLogo, STab, STabItem, SInput, SInputBlock, SButton, SInputOTP, SInputOTPItem } from '@spartan';
import { computed } from 'vue';
import { ArrowLeftIcon } from '@heroicons/vue/20/solid';
import { LockClosedIcon, KeyIcon } from '@heroicons/vue/24/outline';

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
const recoveryCode = ref('');
</script>

<template>
    <form class="flex h-full w-full max-w-sm flex-col items-center justify-center bg-white">
        <SPlacetopayLogo class="mb-8" :height="32" />

        <template v-if="AuthRoutes.includes(route)">
            <STab :model-value="route" full class="mb-6 w-full" @update:model-value="(newRoute) => push(newRoute)">
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
                    class="text-center text-xs font-medium text-gray-400"
                    @click="push('restore-password')"
                >
                    ¿Olvidaste tu contraseña?
                </button>
                <SButton
                    as="a"
                    href="/iframe.html?args=buttonPreviewMode:false&id=examples-accountsdemo-pages--auth"
                    class="w-full"
                    >{{ atLogin ? 'Ingresar' : 'Registrarse' }}</SButton
                >

                <p class="text-xs font-normal text-gray-400">
                    Al continuar acepto las políticas aplicables para el tratamiento de mis datos personales según la
                    jurisdicción local del responsable y de
                    <a
                        target="_blank"
                        href="https://www.evertecinc.com/wp-content/uploads/2023/04/POL-CMP-004-Poli%25CC%2581ticas-para-la-proteccio%25CC%2581n-de-datos-personales-pu%25CC%2581blica-V-1.0.pdf"
                        class="font-semibold text-gray-500"
                        >Evertec PlacetoPay</a
                    >
                    en su calidad de encargado.
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
            <div class="mb-6 rounded-full border border-gray-100 p-3">
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
                <SButton class="flex-1" @click="push('recovery-code')">Verificar</SButton>
            </div>
        </template>

        <template v-if="route === 'recovery-code'">
            <div class="mb-6 rounded-full border border-gray-100 p-3">
                <KeyIcon class="mx-auto h-6 w-6 text-gray-900" />
            </div>
            <h2 class="mb-1.5 font-semibold text-gray-900">Código de recuperación</h2>
            <p class="mb-6 text-center text-xs text-gray-600">
                Si no puede acceder a su dispositivo móvil, ingrese uno de sus códigos de recuperación para verificar su
                identidad.
            </p>

            <SInput v-model="recoveryCode" type="password" class="mb-6 w-full" />

            <div class="flex w-full">
                <SButton class="mr-4 w-fit" variant="secondary" :left-icon="ArrowLeftIcon" @click="push('login')">
                    Volver
                </SButton>
                <SButton class="flex-1" @click="push('recovery-code')">Verificar</SButton>
            </div>
        </template>
    </form>
</template>
