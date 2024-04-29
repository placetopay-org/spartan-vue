<script setup lang="ts">
import { SAvatar, SButton, SModalLeft, SPlacetopayLogo } from '@spartan';
import {
    ShieldTickIcon,
    MonitorMobbileIcon,
    RepeatIcon,
    FlagIcon,
    CalendarSearchIcon,
} from '@placetopay/iconsax-vue/linear';
import VSidebar from '../components/VSidebar.vue';

import { ArrowRightIcon } from '@heroicons/vue/24/solid';
import { Bars3Icon } from '@heroicons/vue/24/outline';
import { ref } from 'vue';

const open = ref(false);
</script>

<template>
    <div class="h-full w-full divide-x divide-gray-200 lg:flex">
        <VSidebar class="hidden lg:flex" />

        <SModalLeft breakpoint="lg" :open="open" @close="() => (open = false)">
            <VSidebar />
        </SModalLeft>

        <div class="flex w-full items-center justify-between p-4 lg:hidden border-b border-gray-200">
            <SPlacetopayLogo :height="35" />

            <button @click="open = true" class="p-2.5">
                <Bars3Icon class="h-6 w-6 text-gray-500" />
            </button>
        </div>

        <main class="relative flex flex-1 flex-col items-center">
            <div class="absolute inset-x-0 flex h-20 justify-between overflow-hidden lg:h-44">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" class="h-[150px] w-full blur-2xl">
                    <defs>
                        <pattern id="patt" x="0" y="0" width="1100" height="150" patternUnits="userSpaceOnUse">
                            <ellipse cx="0" cy="150" rx="500" ry="50" class="fill-primary-600/50" />
                            <ellipse cx="550" cy="0" rx="150" ry="50" class="fill-primary-600/30" />
                            <ellipse cx="850" cy="150" rx="100" ry="90" class="fill-primary-600/20" />
                        </pattern>
                    </defs>

                    <rect width="100%" height="100%" x="0" y="0" stroke="black" fill="url(#patt)" />
                </svg>
            </div>

            <section class="mt-16 w-full max-w-6xl space-y-8 px-10 lg:mt-36">
                <div class="flex flex-col gap-4 lg:gap-0 lg:flex-row lg:items-center lg:justify-between">
                    <div class="flex items-end gap-4 lg:items-center">
                        <SAvatar
                            class="h-16 w-16 border-4 border-white lg:h-32 lg:w-32"
                            borderless
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256"
                        />

                        <div>
                            <h1 class="text-xl font-bold lg:text-2xl">John Doe</h1>
                            <p class="text-sm font-normal text-gray-600">john.doe@example.com</p>
                        </div>
                    </div>

                    <SButton class="lg:w-auto w-full" size="sm" variant="secondary">Editar perfil</SButton>
                </div>

                <div class="grid lg:grid-cols-2 gap-4">
                    <div class="w-full overflow-hidden rounded-xl border border-gray-200">
                        <header class="flex items-center gap-3 border-b border-gray-100 bg-gray-50 p-3 text-gray-900">
                            <FlagIcon class="m-2 h-6 w-6" />

                            <div class="flex flex-col text-xs">
                                <span>Actual inicio de sesión desde</span>
                                <span class="font-semibold">24 ago 2023, 15:19:59</span>
                            </div>
                        </header>

                        <ul class="divide-y px-4 text-gray-900">
                            <li class="flex justify-between py-3">
                                <span class="font text-sm text-gray-500">Navegador</span>
                                <span class="text-sm font-normal">Chrome 116.0.0</span>
                            </li>

                            <li class="flex justify-between py-3">
                                <span class="font text-sm text-gray-500">Dispositivo</span>
                                <span class="text-sm font-normal">Computador</span>
                            </li>

                            <li class="flex justify-between py-3">
                                <span class="font text-sm text-gray-500">Sistema operativo</span>
                                <span class="text-sm font-normal">Mac OS X 10.15.7</span>
                            </li>

                            <li class="flex justify-between py-3">
                                <span class="font text-sm text-gray-500">Ip</span>
                                <span class="text-sm font-normal">2800:486:803:900:390d:c713:64a:6e82</span>
                            </li>
                        </ul>
                    </div>

                    <div class="w-full overflow-hidden rounded-xl border border-gray-200">
                        <header class="flex items-center gap-3 border-b border-gray-100 bg-gray-50 p-3 text-gray-900">
                            <CalendarSearchIcon class="m-2 h-6 w-6" />

                            <div class="flex flex-col text-xs">
                                <span>Último inicio de sesión desde</span>
                                <span class="font-semibold">24 ago 2023, 15:19:59</span>
                            </div>
                        </header>

                        <ul class="divide-y px-4 text-gray-900">
                            <li class="flex justify-between py-3">
                                <span class="font text-sm text-gray-500">Navegador</span>
                                <span class="text-sm font-normal">Chrome 116.0.0</span>
                            </li>

                            <li class="flex justify-between py-3">
                                <span class="font text-sm text-gray-500">Dispositivo</span>
                                <span class="text-sm font-normal">Computador</span>
                            </li>

                            <li class="flex justify-between py-3">
                                <span class="font text-sm text-gray-500">Sistema operativo</span>
                                <span class="text-sm font-normal">Mac OS X 10.15.7</span>
                            </li>

                            <li class="flex justify-between py-3">
                                <span class="font text-sm text-gray-500">Ip</span>
                                <span class="text-sm font-normal">2800:486:803:900:390d:c713:64a:6e82</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="grid lg:grid-cols-3 gap-4">
                    <div class="flex w-full flex-col rounded-xl border border-gray-200 p-4">
                        <ShieldTickIcon class="mb-3 h-6 w-6" />
                        <div class="mb-2 flex-1">
                            <h3 class="mb-1 text-base font-semibold text-gray-900">Doble factor de autenticación</h3>
                            <p class="text-xs font-normal text-gray-600">
                                Autenticación de dos factores agrega una capa adicional de seguridad a tu cuenta
                            </p>
                        </div>

                        <footer class="flex justify-end">
                            <a href="#" class="flex items-center gap-2 text-xs font-normal text-primary-600">
                                <span class="whitespace-nowrap">Ver detalle</span>
                                <ArrowRightIcon class="h-4 w-4" />
                            </a>
                        </footer>
                    </div>

                    <div class="flex w-full flex-col rounded-xl border border-gray-200 p-4">
                        <MonitorMobbileIcon class="mb-3 h-6 w-6" />
                        <div class="mb-2 flex-1">
                            <h3 class="mb-1 text-base font-semibold text-gray-900">Aplicaciones</h3>
                            <p class="text-xs font-normal text-gray-600">
                                Administra todas las cuentas vinculadas a la tuya en las que tienes autorización
                            </p>
                        </div>

                        <footer class="flex justify-end">
                            <a href="#" class="flex items-center gap-2 text-xs font-normal text-primary-600">
                                <span class="whitespace-nowrap">Ver detalle</span>
                                <ArrowRightIcon class="h-4 w-4" />
                            </a>
                        </footer>
                    </div>

                    <div class="flex w-full flex-col rounded-xl border border-gray-200 p-4">
                        <RepeatIcon class="mb-3 h-6 w-6" />
                        <div class="mb-2 flex-1">
                            <h3 class="mb-1 text-base font-semibold text-gray-900">Registro de accesos</h3>
                            <p class="text-xs font-normal text-gray-600">
                                Supervisa tus sesiones para tener el control de quién y cuándo accede a tu cuenta
                            </p>
                        </div>

                        <footer class="flex justify-end">
                            <a href="#" class="flex items-center gap-2 text-xs font-normal text-primary-600">
                                <span class="whitespace-nowrap">Ver detalle</span>
                                <ArrowRightIcon class="h-4 w-4" />
                            </a>
                        </footer>
                    </div>
                </div>
            </section>
        </main>
    </div>
</template>
