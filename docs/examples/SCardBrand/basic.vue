<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'

const { controls } = usePreview({
    mode: 'playground',
    component: 'SCardBrand',
    props: {
        name: {
            type: 'select',
            options: ['visa', 'master', 'amex', 'diners', 'discover', 'pse', 'paypal', 'cash', 'debit', 'elo', 'jcb', 'maestro'],
            default: 'visa',
            label: 'name',
        },
        size: { type: 'number', default: 48, min: 16, max: 128, step: 8, label: 'size' },
    },
})
</script>

<template>
    <SCardBrand :name="controls.name" :size="controls.size" />
</template>
