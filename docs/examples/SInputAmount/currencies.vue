<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const value = ref(null)
const currency = ref('USD')
const currencies = ['USD', 'EUR', 'COP', 'GBP']
usePreview({ component: 'SInputAmount' })
</script>

<template>
    <SInputAmount
        v-model="value"
        v-model:currency="currency"
        :currencies="currencies"
        :symbol="true"
        placeholder="0.00"
    />
</template>
