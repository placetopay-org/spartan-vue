<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const value = ref('')

const { controls } = usePreview({
    component: 'SInputOtpBlock',
    props: {
        label: { type: 'text', default: 'Verification code', label: 'label' },
        helpText: { type: 'text', default: 'Enter the 4-digit code sent to your phone.', label: 'helpText' },
        errorText: { type: 'text', default: '', label: 'errorText' },
    },
})
</script>

<template>
    <SInputOtpBlock
        v-model="value"
        :label="controls.label"
        :help-text="controls.helpText"
        :error-text="controls.errorText || undefined"
    >
        <SInputOtpItem />
        <SInputOtpItem />
        <SInputOtpItem />
        <SInputOtpItem />
    </SInputOtpBlock>
</template>
