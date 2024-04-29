<script setup lang="ts">
import { SSidebar, SSidebarItem, SSidebarSeparator, SDropdown, SDropdownItem } from '@spartan';
import {
    HomeIcon,
    ShieldTickIcon,
    MonitorMobbileIcon,
    KeySquareIcon,
    CodeIcon,
    LockIcon,
    Setting2Icon,
    ProfileCircleIcon,
    MessagesIcon,
    LogoutIcon,
} from '@placetopay/iconsax-vue/linear';
import { ChevronDownIcon } from '@heroicons/vue/24/solid';

defineProps<{
    current?: string;
}>();

const exampleRoutes = {
    'Inicio': 'iframe.html?args=buttonPreviewMode:false&id=examples-accountsdemo-pages--home',
    // 'Autenticación': '/iframe.html?args=buttonPreviewMode:false&id=examples-accountsdemo-pages--edit-profile',
};

const updateExample = (route) => {
    if (exampleRoutes[route]) window.location.href = exampleRoutes[route];
}
</script>

<template>
    <SSidebar :modelValue="current" @update:modelValue="updateExample" placetopay-header>
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

        <template #footer>
            <div class="border-t text-sm border-gray-200 bg-gray-50 px-4 py-6 space-y-1.5">
                <SDropdown
                    referenceClass="hover:text-gray-600 text-gray-500 flex items-center justify-between py-2 w-full"
                    placement="top-end"
                    :offset="4"
                    class="w-full"
                >
                    <template #reference>
                        <div class="flex items-center gap-2.5">
                            <MessagesIcon class="h-6 w-6" />
                            Idioma
                        </div>
                        <ChevronDownIcon class="h-4 w-4 m-1.5" />
                    </template>

                    <div class="w-36 text-sm font-medium text-gray-800 divide-y divide-gray-100">
                        <SDropdownItem>Español</SDropdownItem>
                        <SDropdownItem>Inglés</SDropdownItem>
                    </div>
                </SDropdown>

                <a href="/iframe.html?args=buttonPreviewMode:false&id=examples-accountsdemo-pages--login" class="items-center flex py-2 w-full gap-2.5 text-gray-500 hover:text-gray-600">
                    <LogoutIcon class="h-6 w-6" />
                    Cerrar sesión
                </a>
            </div>
        </template>
    </SSidebar>
</template>
