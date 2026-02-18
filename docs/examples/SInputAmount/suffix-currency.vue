<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const value = ref(null)

const { controls } = usePreview({
    props: {
        suffixCurrency: { type: 'boolean', default: true, label: 'suffixCurrency' },
    },
})
</script>

<template>
    <SInputAmount v-model="value" currency="USD" :suffix-currency="controls.suffixCurrency" placeholder="0.00" />
</template>
