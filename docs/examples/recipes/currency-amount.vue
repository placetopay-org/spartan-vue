<script setup lang="ts">
import { ref } from 'vue';

const currencies = [
    { code: 'USD', label: 'USD — US Dollar' },
    { code: 'COP', label: 'COP — Peso colombiano' },
    { code: 'EUR', label: 'EUR — Euro' },
    { code: 'MXN', label: 'MXN — Peso mexicano' },
];

const currency = ref<'USD' | 'COP' | 'EUR' | 'MXN'>('USD');
const amount = ref<number | null>(null);
</script>

<template>
    <div class="w-full max-w-md">
        <SLabel for="amount">Monto a pagar</SLabel>
        <div class="flex items-stretch">
            <SSelector
                v-model="currency"
                :options="currencies"
                option-label="code"
                option-value="code"
                placeholder="Moneda"
                rounded="left"
                class="h-9 w-24 shrink-0"
            />
            <SInputAmount
                id="amount"
                v-model="amount"
                :currency="currency"
                placeholder="0.00"
                rounded="right"
                class="flex-1"
                symbol
            />
        </div>
    </div>
</template>
