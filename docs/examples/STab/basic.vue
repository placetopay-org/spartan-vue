<script setup lang="ts">
import { ref } from 'vue';
import { usePreview } from '~/composables/usePreview';

const { controls } = usePreview({
    mode: 'playground',
    component: 'STab',
    props: {
        variant: {
            type: 'select',
            options: ['underline', 'pills', 'vetches'],
            default: 'underline',
        },
        full: { type: 'boolean', default: false },
    },
    slots: {
        default: { default: 'Account, Security, Notifications', label: 'Tabs' },
    },
});

const activeTab = ref('account');
</script>

<template>
    <STab v-model="activeTab" :variant="controls.variant" :full="controls.full">
        <STabItem path="account">Account</STabItem>
        <STabItem path="security">Security</STabItem>
        <STabItem path="notifications">Notifications</STabItem>
    </STab>
</template>
