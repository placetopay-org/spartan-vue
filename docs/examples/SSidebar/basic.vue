<script setup lang="ts">
import { ref } from 'vue';
import { HomeIcon } from '@placetopay/iconsax-vue/outline';
import { Setting2Icon, ProfileCircleIcon, MessageQuestionIcon } from '@placetopay/iconsax-vue/bold';
import { usePreview } from '~/composables/usePreview';

const active = ref('Dashboard');

const { controls } = usePreview({
    mode: 'playground',
    component: 'SSidebar',
    props: {
        placetopayHeader: { type: 'boolean', default: true, label: 'placetopayHeader' },
    },
    imports: {
        ref: 'vue',
        HomeIcon: '@placetopay/iconsax-vue/outline',
        Setting2Icon: '@placetopay/iconsax-vue/bold',
        ProfileCircleIcon: '@placetopay/iconsax-vue/bold',
        MessageQuestionIcon: '@placetopay/iconsax-vue/bold',
    },
    data: {
        active: { expression: "ref('Dashboard')" },
    },
    staticAttrs: {
        'v-model': 'active',
    },
});
</script>

<template>
    <SSidebar v-model="active" :placetopay-header="controls.placetopayHeader">
        <SSidebarItem :icon="HomeIcon">Dashboard</SSidebarItem>

        <SSidebarItemGroup :icon="ProfileCircleIcon">
            <template #title>Users</template>
            <SSidebarItem>List</SSidebarItem>
            <SSidebarItem>Roles</SSidebarItem>
        </SSidebarItemGroup>

        <SSidebarSeparator title="System" />

        <SSidebarItem :icon="Setting2Icon">Settings</SSidebarItem>
        <SSidebarItem :icon="MessageQuestionIcon">Help</SSidebarItem>
    </SSidebar>
</template>
