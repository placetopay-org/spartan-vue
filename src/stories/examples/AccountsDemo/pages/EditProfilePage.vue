<script setup lang="ts">
import { SModalLeft, SAvatar, SButton, SInputBlock, SSelectBlock, SPlacetopayLogo } from '@spartan';
import { LockIcon, UserTagIcon, SmsEditIcon } from '@placetopay/iconsax-vue/linear';
import { ArrowLeftIcon } from '@heroicons/vue/24/solid';
import { EyeSlashIcon, Bars3Icon } from '@heroicons/vue/24/outline';
import VSidebar from '../components/VSidebar.vue';
import { ref } from 'vue';

const open = ref(false);
</script>

<template>
    <div class="flex h-full w-full divide-x divide-gray-200">
        <VSidebar class="hidden lg:block" />

        <SModalLeft breakpoint="lg" :open="open" @close="() => (open = false)">
            <VSidebar />
        </SModalLeft>

        <div class="flex flex-1 flex-col items-start gap-8 p-6">
            <div class="flex w-full justify-between lg:hidden">
                <SPlacetopayLogo :height="35" />

                <button @click="open = true" class="p-2.5">
                    <Bars3Icon class="h-6 w-6 text-gray-500" />
                </button>
            </div>

            <nav class="flex w-full items-center gap-2">
                <ArrowLeftIcon class="h-5 w-5 text-gray-500" />
                <span class="text-2xl font-semibold">Editar perfil</span>
            </nav>

            <hr class="w-full border-t border-gray-200" />

            <section class="grid w-full grid-cols-1 lg:grid-cols-2 gap-8">
                <div class="w-full space-y-1">
                    <UserTagIcon class="h-6 w-6 text-gray-400" />
                    <h3 class="text-base font-semibold text-gray-900">Información Personal</h3>
                    <span class="text-sm font-normal text-gray-700"
                        >Actualiza tu perfil para mejorar tu experiencia</span
                    >
                </div>

                <div class="w-full space-y-6">
                    <div>
                        <p class="mb-1 text-sm font-medium text-gray-700">Foto de perfil</p>
                        <div class="flex gap-8">
                            <SAvatar
                                class="h-24 w-24"
                                borderless
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256"
                            />
                            <div class="flex flex-col gap-2">
                                <SButton variant="secondary">Editar</SButton>
                                <span class="text-xs font-normal text-gray-600">JPG o PNG, Máximo 1MB</span>
                            </div>
                        </div>
                    </div>

                    <SInputBlock modelValue="John Doe" label="Nombre completo" placeholder="Nombre completo" />

                    <SSelectBlock modelValue="UTC" label="Zona Horaria" class="w-fit">
                        <option value="UTC">UTC</option>
                        <option value="America/Bogota">America/Bogota</option>
                        <option value="America/New_York">America/New_York</option>
                    </SSelectBlock>

                    <div class="flex justify-end">
                        <SButton>Guardar</SButton>
                    </div>
                </div>
            </section>

            <hr class="w-full border-t border-gray-200" />

            <section class="grid w-full grid-cols-1 lg:grid-cols-2 gap-8">
                <div class="w-full space-y-1">
                    <SmsEditIcon class="h-6 w-6 text-gray-400" />
                    <h3 class="text-base font-semibold text-gray-900">Cambiar correo eletrónico</h3>
                    <span class="text-sm font-normal text-gray-700"
                        >Deberás verificar tu correo actual y el nuevo correo electrónico antes de hacer efectivo el
                        cambio</span
                    >
                </div>

                <div class="w-full space-y-6">
                    <div>
                        <p class="mb-2 text-sm font-medium text-gray-700">Correo electrónico actual</p>
                        <p class="text-base font-normal text-gray-900">john.doe@evertecinc.com</p>
                    </div>

                    <SInputBlock label="Nuevo correo electrónico" placeholder="new-email@example.com" />

                    <SInputBlock label="Confirmar nuevo correo electrónico" placeholder="new-email@example.com" />

                    <div class="flex justify-end">
                        <SButton>Guardar</SButton>
                    </div>
                </div>
            </section>

            <hr class="w-full border-t border-gray-200" />

            <section class="grid w-full grid-cols-1 lg:grid-cols-2 gap-8">
                <div class="w-full space-y-1">
                    <LockIcon class="h-6 w-6 text-gray-400" />
                    <h3 class="text-base font-semibold text-gray-900">Contraseña</h3>
                    <span class="text-sm font-normal text-gray-700"
                        >Cambia tu contraseña y no la utilices en otras cuentas</span
                    >
                </div>

                <div class="w-full space-y-6">
                    <SInputBlock label="Contraseña actual">
                        <template #right>
                            <button>
                                <EyeSlashIcon class="h-6 w-6 text-gray-500" />
                            </button>
                        </template>
                    </SInputBlock>

                    <SInputBlock label="Nueva contraseña">
                        <template #right>
                            <button>
                                <EyeSlashIcon class="h-6 w-6 text-gray-500" />
                            </button>
                        </template>
                    </SInputBlock>

                    <SInputBlock label="Confirmar nueva contraseña">
                        <template #right>
                            <button>
                                <EyeSlashIcon class="h-6 w-6 text-gray-500" />
                            </button>
                        </template>
                    </SInputBlock>

                    <div class="flex justify-end">
                        <SButton>Guardar</SButton>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>
