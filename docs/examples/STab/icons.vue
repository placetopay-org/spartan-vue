<script setup lang="ts">
import { ref } from 'vue';
import { usePreview } from '~/composables/usePreview';
import { UserIcon, SecuritySafeIcon, NotificationIcon } from '@placetopay/iconsax-vue/bold';

const { controls } = usePreview({
    props: {
        variant: { type: 'select', options: ['underline', 'pills', 'vetches'], default: 'underline', label: 'variant' },
    },
});

const activeTab = ref('account');
</script>

<template>
    <STab v-model="activeTab" :variant="controls.variant">
        <STabItem path="account" :icon="UserIcon">Account</STabItem>
        <STabItem path="security" :icon="SecuritySafeIcon">Security</STabItem>
        <STabItem path="notifications" :icon="NotificationIcon">Notifications</STabItem>
    </STab>
</template>
