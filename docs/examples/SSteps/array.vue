<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'

usePreview({ component: 'SSteps' })
</script>

<template>
    <SSteps
        :steps="[
            { status: 'complete', href: '#', name: 'Create account', description: 'Register your details' },
            { status: 'current', href: '#', name: 'Profile setup', description: 'Fill in your profile' },
            { status: 'upcoming', href: '#', name: 'Confirmation', description: 'Review and confirm', last: true },
        ]"
    />
</template>
