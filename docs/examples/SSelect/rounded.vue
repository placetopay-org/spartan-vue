<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const value = ref('')

const { controls } = usePreview({
    props: {
        rounded: { type: 'select', options: ['both', 'left', 'right', 'none', 'full'], default: 'both', label: 'rounded' },
    },
})
</script>

<template>
    <SSelect v-model="value" :rounded="controls.rounded" placeholder="Select an option">
        <option value="vue">Vue</option>
        <option value="react">React</option>
        <option value="angular">Angular</option>
    </SSelect>
</template>
