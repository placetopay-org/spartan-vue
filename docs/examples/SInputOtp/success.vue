<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const value = ref('1234')

const { controls } = usePreview({
    props: {
        success: { type: 'boolean', default: true, label: 'success' },
    },
})
</script>

<template>
    <SInputOtp v-model="value" :success="controls.success">
        <SInputOtpItem />
        <SInputOtpItem />
        <SInputOtpItem />
        <SInputOtpItem />
    </SInputOtp>
</template>
