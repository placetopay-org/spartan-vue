<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const value = ref('1234')

const { controls } = usePreview({
    props: {
        error: { type: 'boolean', default: true, label: 'error' },
    },
})
</script>

<template>
    <SInputOtp v-model="value" :error="controls.error">
        <SInputOtpItem />
        <SInputOtpItem />
        <SInputOtpItem />
        <SInputOtpItem />
    </SInputOtp>
</template>
