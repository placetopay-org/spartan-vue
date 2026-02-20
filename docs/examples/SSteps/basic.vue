<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'

usePreview({ component: 'SSteps' })
</script>

<template>
    <SSteps>
        <SStepsItem status="complete" href="#" name="Create account" description="Register your details" />
        <SStepsItem status="current" href="#" name="Profile setup" description="Fill in your profile information" />
        <SStepsItem status="upcoming" href="#" name="Confirmation" description="Review and confirm" :last="true" />
    </SSteps>
</template>
