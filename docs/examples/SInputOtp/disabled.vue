<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const value = ref('')

const { controls } = usePreview({
    props: {
        disabled: { type: 'boolean', default: true, label: 'disabled' },
    },
})
</script>

<template>
    <SInputOtp v-model="value" :disabled="controls.disabled">
        <SInputOtpItem />
        <SInputOtpItem />
        <SInputOtpItem />
        <SInputOtpItem />
    </SInputOtp>
</template>
