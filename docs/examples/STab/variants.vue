<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const { controls } = usePreview({
    props: {
        variant: { type: 'select', options: ['underline', 'pills', 'vetches'], default: 'underline', label: 'variant' },
    },
})

const activeTab = ref('account')
</script>

<template>
    <STab v-model="activeTab" :variant="controls.variant">
        <STabItem path="account">Account</STabItem>
        <STabItem path="security">Security</STabItem>
        <STabItem path="notifications">Notifications</STabItem>
    </STab>
</template>
