<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const selected = ref('startup')
usePreview({ component: 'SRadioGroup' })
</script>

<template>
    <SRadioGroup v-model="selected">
        <SRadioGroupItem value="startup">
            <template #title>Startup</template>
            <template #description>12GB / 6 CPUs</template>
            <template #footer>$40/mo</template>
        </SRadioGroupItem>
        <SRadioGroupItem value="business">
            <template #title>Business</template>
            <template #description>16GB / 8 CPUs</template>
            <template #footer>$80/mo</template>
        </SRadioGroupItem>
        <SRadioGroupItem value="enterprise">
            <template #title>Enterprise</template>
            <template #description>32GB / 12 CPUs</template>
            <template #footer>$160/mo</template>
        </SRadioGroupItem>
    </SRadioGroup>
</template>
