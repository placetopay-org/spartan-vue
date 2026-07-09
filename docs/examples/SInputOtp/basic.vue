<script setup lang="ts">
import { ref } from 'vue';
import { usePreview } from '~/composables/usePreview';

const value = ref('');

const { controls } = usePreview({
    mode: 'playground',
    component: 'SInputOtp',
    props: {
        disabled: { type: 'boolean', default: false, label: 'disabled' },
        success: { type: 'boolean', default: false, label: 'success' },
        error: { type: 'boolean', default: false, label: 'error' },
    },
    imports: { ref: 'vue' },
    data: {
        value: { expression: "ref('')" },
    },
    staticAttrs: {
        'v-model': 'value',
    },
});
</script>

<template>
    <SInputOtp v-model="value" :disabled="controls.disabled" :success="controls.success" :error="controls.error">
        <SInputOtpItem />
        <SInputOtpItem />
        <SInputOtpItem />
        <SInputOtpItem />
    </SInputOtp>
</template>
