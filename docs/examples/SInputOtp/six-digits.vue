<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const value = ref('')

usePreview({ component: 'SInputOtp' })
</script>

<template>
    <SInputOtp v-model="value">
        <SInputOtpItem />
        <SInputOtpItem />
        <SInputOtpItem />
        <SInputOtpItem />
        <SInputOtpItem />
        <SInputOtpItem />
    </SInputOtp>
</template>
