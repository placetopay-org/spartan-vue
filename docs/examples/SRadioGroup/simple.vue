<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const selected = ref('free')
usePreview({ component: 'SRadioGroup' })
</script>

<template>
    <SRadioGroup v-model="selected">
        <SRadioGroupItem value="free">
            <template #title>Free</template>
        </SRadioGroupItem>
        <SRadioGroupItem value="pro">
            <template #title>Pro</template>
        </SRadioGroupItem>
    </SRadioGroup>
</template>
