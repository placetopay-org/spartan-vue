<script setup lang="ts">
import { SPlacetopayLogo, SDropdown, SDropdownItem, SAvatar, SButton } from '@spartan';
import { MessageText1Icon } from '@placetopay/iconsax-vue/twotone';
import { ShieldTickIcon, ProfileCircleIcon } from '@placetopay/iconsax-vue/linear';
import { ChevronDownIcon } from '@heroicons/vue/24/outline';
import { ref } from 'vue';

const langs = [
    'Español (Colombia)',
    'Español (Chile)',
    'Español (Panamá)',
    'Español (Puerto Rico)',
    'Inglés',
    'Portugués',
    'Francés',
];
const lang = ref(0);
</script>

<template>
    <div class="container mx-auto flex h-full flex-col items-center">
        <div class="max-w-lg flex-1 space-y-8 px-4 py-8 lg:px-0">
            <header class="flex flex-col items-center gap-6">
                <div class="rounded-full border border-gray-200 p-3">
                    <ShieldTickIcon class="h-8 w-8" />
                </div>
                <h1 class="text-2xl font-semibold text-gray-900">Autorizar Panel-dev</h1>
            </header>

            <main class="space-y-8 rounded-lg border border-gray-200 px-4 py-5">
                <section class="flex gap-3">
                    <SAvatar class="bg-gray-700 text-base font-semibold text-white" name="Jhon Doe" />
                    <div class="flex-1 space-y-2 text-sm">
                        <span class="font-medium text-gray-900">Jhon Doe - jhon@example.com</span>
                        <p class="font-normal">
                            <span class="text-gray-900">Panel-dev </span>
                            <span class="text-gray-500">quiere acceder a su cuenta</span>
                        </p>
                    </div>
                </section>
                <section class="flex gap-3">
                    <ProfileCircleIcon class="h-10 w-10 text-gray-500" />
                    <div class="flex-1 space-y-2 text-sm">
                        <span class="font-medium text-gray-900">Datos personales del usuario</span>
                        <div class="space-y-1 font-normal">
                            <p class="text-gray-500">
                                Al autorizar, <span class="text-gray-900">Panel-dev</span> podrá leer la información
                                básica de tu perfil en <span class="text-gray-900">Placetopay Accounts</span>.
                            </p>
                            <p class="text-gray-500">
                                Puedes administrar tu cuenta de Placetopay Accounts en
                                <a
                                    href="/iframe.html?args=buttonPreviewMode:false&id=examples-accountsdemo-pages--edit-profile"
                                    class="text-gray-900 underline"
                                    >Editar Perfil</a
                                >.
                            </p>
                        </div>
                    </div>
                </section>
            </main>

            <section class="space-y-7">
                <div class="space-y-4">
                    <SButton
                        as="a"
                        href="iframe.html?args=buttonPreviewMode:false&id=examples-accountsdemo-pages--home"
                        class="w-full"
                        variant="primary"
                        >Autorizar</SButton
                    >
                    <SButton
                        as="a"
                        href="iframe.html?args=buttonPreviewMode:false&id=examples-accountsdemo-pages--login"
                        class="w-full"
                        variant="secondary"
                        >Cancelar</SButton
                    >
                </div>

                <p class="text-center text-sm font-normal text-gray-500">
                    Al autorizar, serás redireccionado a https://panel-co.placetopay.dev
                </p>
            </section>
        </div>

        <footer class="flex justify-center gap-8 py-6">
            <SPlacetopayLogo :height="24" />
            <SDropdown placement="top-start">
                <template #reference>
                    <div class="flex items-center gap-1.5 text-sm font-medium text-gray-400">
                        <MessageText1Icon class="h-4 w-4" />
                        <span>{{ langs[lang] }}</span>
                        <ChevronDownIcon class="h-4 w-4" />
                    </div>
                </template>

                <SDropdownItem v-for="(item, index) in langs" @click="lang = index">{{ item }}</SDropdownItem>
            </SDropdown>
        </footer>
    </div>
</template>
