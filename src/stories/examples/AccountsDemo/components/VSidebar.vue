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
    Inicio: 'iframe.html?args=buttonPreviewMode:false&id=examples-accountsdemo-pages--home',
    Autenticación: 'iframe.html?args=buttonPreviewMode:false&id=examples-accountsdemo-pages--two-factor-auth',
};

const updateExample = (route) => {
    if (exampleRoutes[route]) window.location.href = exampleRoutes[route];
};
</script>

<template>
    <SSidebar :model-value="current" placetopay-header @update:model-value="updateExample">
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
            <div class="space-y-1.5 border-t border-gray-200 bg-gray-50 px-4 py-6 text-sm">
                <SDropdown
                    reference-class="hover:text-gray-600 text-gray-500 flex items-center justify-between py-2 w-full"
                    placement="top-end"
                    :offset="4"
                    class="w-full"
                >
                    <template #reference>
                        <div class="flex items-center gap-2.5">
                            <MessagesIcon class="h-6 w-6" />
                            Idioma
                        </div>
                        <ChevronDownIcon class="m-1.5 h-4 w-4" />
                    </template>

                    <div class="w-36 divide-y divide-gray-100 text-sm font-medium text-gray-800">
                        <SDropdownItem>Español</SDropdownItem>
                        <SDropdownItem>Inglés</SDropdownItem>
                    </div>
                </SDropdown>

                <a
                    href="/iframe.html?args=buttonPreviewMode:false&id=examples-accountsdemo-pages--login"
                    class="flex w-full items-center gap-2.5 py-2 text-gray-500 hover:text-gray-600"
                >
                    <LogoutIcon class="h-6 w-6" />
                    Cerrar sesión
                </a>
            </div>
        </template>
    </SSidebar>
</template>
