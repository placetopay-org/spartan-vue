<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'
import { Home2Icon as HomeIcon, CalendarIcon as CalendarIcon, Setting2Icon as SettingIcon } from '@placetopay/iconsax-vue/bold'

usePreview({ component: 'SButtonGroup' })
</script>

<template>
    <SButtonGroup>
        <SButtonGroupItem :first="true" :icon="HomeIcon">Home</SButtonGroupItem>
        <SButtonGroupItem :icon="CalendarIcon" :active="true">Calendar</SButtonGroupItem>
        <SButtonGroupItem :last="true" :icon="SettingIcon">Settings</SButtonGroupItem>
    </SButtonGroup>
</template>
