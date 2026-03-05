<script setup lang="ts">
import { ref } from 'vue';
import { usePreview } from '~/composables/usePreview';

const { controls } = usePreview({
    props: {
        full: { type: 'boolean', default: true, label: 'full' },
    },
});

const activeTab = ref('account');
</script>

<template>
    <STab v-model="activeTab" :full="controls.full">
        <STabItem path="account">Account</STabItem>
        <STabItem path="security">Security</STabItem>
        <STabItem path="notifications">Notifications</STabItem>
    </STab>
</template>
