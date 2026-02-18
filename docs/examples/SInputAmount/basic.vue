<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const value = ref(null)

const { controls } = usePreview({
    mode: 'playground',
    component: 'SInputAmount',
    props: {
        currency: { type: 'select', options: ['USD', 'EUR', 'COP', 'GBP', 'BRL'], default: 'USD', label: 'currency' },
        symbol: { type: 'boolean', default: true, label: 'symbol' },
        suffixCurrency: { type: 'boolean', default: false, label: 'suffixCurrency' },
        disabled: { type: 'boolean', default: false, label: 'disabled' },
        error: { type: 'boolean', default: false, label: 'error' },
        placeholder: { type: 'text', default: 'Enter amount', label: 'placeholder' },
    },
})
</script>

<template>
    <SInputAmount
        v-model="value"
        :currency="controls.currency"
        :symbol="controls.symbol"
        :suffix-currency="controls.suffixCurrency"
        :disabled="controls.disabled"
        :error="controls.error"
        :placeholder="controls.placeholder"
    />
</template>
