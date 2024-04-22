<script setup lang="ts">
import { SSidebar, SSidebarItem, SSidebarSeparator } from '@spartan';
import {
    HomeIcon,
    ShieldTickIcon,
    MonitorMobbileIcon,
    KeySquareIcon,
    CodeIcon,
    LockIcon,
    Setting2Icon,
    ProfileCircleIcon
} from '@placetopay/iconsax-vue/linear';
</script>

<template>
    <SSidebar placetopay-header>
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
</template>
