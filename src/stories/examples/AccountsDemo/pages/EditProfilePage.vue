<script setup lang="ts">
import { SSidebar, SSidebarItem, SSidebarSeparator, SAvatar, SButton, SCard } from '@spartan';
import {
    HomeIcon,
    ShieldTickIcon,
    MonitorMobbileIcon,
    KeySquareIcon,
    CodeIcon,
    LockIcon,
    Setting2Icon,
    ProfileCircleIcon,
    RepeatIcon,
    FlagIcon,
    CalendarSearchIcon,
} from '@placetopay/iconsax-vue/linear';

import { ArrowRightIcon } from '@heroicons/vue/24/solid';
</script>

<template>
    <div class="flex h-full w-full">
        <SSidebar class="border-r border-gray-200" placetopay-header>
            <SSidebarItem :icon="HomeIcon">Inicio</SSidebarItem>
            <SSidebarItem :icon="ShieldTickIcon">Autenticación</SSidebarItem>
            <SSidebarItem :icon="MonitorMobbileIcon">Aplicaciones</SSidebarItem>
            <SSidebarItem :icon="KeySquareIcon">Sesiones de acceso</SSidebarItem>

            <SSidebarSeparator title="Administrador" />

            <SSidebarItem :icon="CodeIcon">Apps registradas</SSidebarItem>
            <SSidebarItem :icon="HomeIcon">Roles y permisos</SSidebarItem>
            <SSidebarItem :icon="ProfileCircleIcon">Usuarios</SSidebarItem>
            <SSidebarItem :icon="Setting2Icon">Configuración</SSidebarItem>
            <SSidebarItem :icon="LockIcon">Logs de seguridad</SSidebarItem>
        </SSidebar>

        <main class="relative flex flex-1 flex-col items-center">
            <div class="absolute inset-x-0 flex h-44 justify-between overflow-hidden">
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

            <section class="mt-36 w-full space-y-8 px-10 max-w-6xl">
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-4">
                        <SAvatar
                            class="h-32 w-32 border-4 border-white"
                            size="2xl"
                            borderless
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256"
                        />

                        <div>
                            <h1 class="text-2xl font-bold">Arley </h1>
                            <p class="text-gray-500">john.doe@example.com</p>
                        </div>
                    </div>

                    <SButton size="sm" variant="secondary">Editar perfil</SButton>
                </div>

                <div class="flex gap-4">
                    <div class="w-full rounded-xl border border-gray-200 overflow-hidden">
                        <header class="bg-gray-50 border-b border-gray-100 p-3 text-gray-900 flex gap-3 items-center">
                            <FlagIcon class="h-6 w-6 m-2"/>

                            <div class="text-xs flex flex-col">
                                <span>Olla</span>
                                <span class="font-semibold">24 ago 2023, 15:19:59</span>
                            </div>
                        </header>

                        <ul class="divide-y px-4 text-gray-900">
                            <li class="flex justify-between py-3">
                                <span class="text-gray-500 text-sm font">Navegador</span>
                                <span class="text-sm font-normal">Chrome 116.0.0</span>
                            </li>

                            <li class="flex justify-between py-3">
                                <span class="text-gray-500 text-sm font">Dispositivo</span>
                                <span class="text-sm font-normal">Computador</span>
                            </li>

                            <li class="flex justify-between py-3">
                                <span class="text-gray-500 text-sm font">Sistema operativo</span>
                                <span class="text-sm font-normal">Mac OS X 10.15.7</span>
                            </li>

                            <li class="flex justify-between py-3">
                                <span class="text-gray-500 text-sm font">Ip</span>
                                <span class="text-sm font-normal">2800:486:803:900:390d:c713:64a:6e82</span>
                            </li>
                        </ul>
                    </div>

                    <div class="w-full rounded-xl border border-gray-200 overflow-hidden">
                        <header class="bg-gray-50 border-b border-gray-100 p-3 text-gray-900 flex gap-3 items-center">
                            <CalendarSearchIcon class="h-6 w-6 m-2"/>

                            <div class="text-xs flex flex-col">
                                <span>Último inicio de sesión desde</span>
                                <span class="font-semibold">24 ago 2023, 15:19:59</span>
                            </div>
                        </header>

                        <ul class="divide-y px-4 text-gray-900">
                            <li class="flex justify-between py-3">
                                <span class="text-gray-500 text-sm font">Navegador</span>
                                <span class="text-sm font-normal">Chrome 116.0.0</span>
                            </li>

                            <li class="flex justify-between py-3">
                                <span class="text-gray-500 text-sm font">Dispositivo</span>
                                <span class="text-sm font-normal">Computador</span>
                            </li>

                            <li class="flex justify-between py-3">
                                <span class="text-gray-500 text-sm font">Sistema operativo</span>
                                <span class="text-sm font-normal">Mac OS X 10.15.7</span>
                            </li>

                            <li class="flex justify-between py-3">
                                <span class="text-gray-500 text-sm font">Ip</span>
                                <span class="text-sm font-normal">2800:486:803:900:390d:c713:64a:6e82</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="flex gap-4">
                    <div class="flex flex-col w-full rounded-xl border border-gray-200 p-4">
                        <ShieldTickIcon class="h-6 w-6 mb-3"/>
                        <div class="flex-1 mb-2">
                            <h3 class="mb-1 text-gray-900 font-semibold text-base">Doble factor de autenticación</h3>
                            <p class="text-gray-600 text-xs font-normal">Autenticación de dos factores agrega una capa adicional de seguridad a tu cuenta</p>
                        </div>
                        
                        <footer class="flex justify-end">
                            <a href="#" class="flex gap-2 items-center text-primary-600 text-xs font-normal">
                                <span class="whitespace-nowrap">Ver detalle</span>
                                <ArrowRightIcon class="h-4 w-4" />
                            </a>
                        </footer>
                    </div>

                    <div class="flex flex-col w-full rounded-xl border border-gray-200 p-4">
                        <MonitorMobbileIcon class="h-6 w-6 mb-3"/>
                        <div class="flex-1 mb-2">
                            <h3 class="mb-1 text-gray-900 font-semibold text-base">Aplicaciones</h3>
                            <p class="text-gray-600 text-xs font-normal">Administra todas las cuentas vinculadas a la tuya en las que tienes autorización</p>
                        </div>
                        
                        <footer class="flex justify-end">
                            <a href="#" class="flex gap-2 items-center text-primary-600 text-xs font-normal">
                                <span class="whitespace-nowrap">Ver detalle</span>
                                <ArrowRightIcon class="h-4 w-4" />
                            </a>
                        </footer>
                    </div>

                    <div class="flex flex-col w-full rounded-xl border border-gray-200 p-4">
                        <RepeatIcon class="h-6 w-6 mb-3"/>
                        <div class="flex-1 mb-2">
                            <h3 class="mb-1 text-gray-900 font-semibold text-base">Registro de accesos</h3>
                            <p class="text-gray-600 text-xs font-normal">Supervisa tus sesiones para tener el control de quién y cuándo accede a tu cuenta</p>
                        </div>
                        
                        <footer class="flex justify-end">
                            <a href="#" class="flex gap-2 items-center text-primary-600 text-xs font-normal">
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
