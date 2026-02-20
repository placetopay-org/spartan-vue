<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

usePreview({ component: 'STab' })

const activeTab = ref('account')
</script>

<template>
    <STab v-model="activeTab">
        <STabItem path="account">Account</STabItem>
        <STabItem path="security">Security</STabItem>
        <STabItem path="notifications">Notifications</STabItem>
    </STab>
</template>
