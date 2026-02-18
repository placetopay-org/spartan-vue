<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'

const { controls } = usePreview({
    props: {
        name: {
            type: 'select',
            options: ['visa', 'master', 'amex', 'diners', 'discover', 'pse', 'paypal', 'cash', 'debit', 'elo', 'jcb', 'maestro'],
            default: 'visa',
            label: 'name',
        },
    },
})
</script>

<template>
    <SCardBrand :name="controls.name" :size="48" />
</template>
