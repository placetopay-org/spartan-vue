<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const selected = ref('')

const { controls } = usePreview({
    props: {
        disabled: { type: 'boolean', default: true, label: 'disabled' },
    },
})
</script>

<template>
    <SRadio v-model="selected" value="disabled-option" name="disabled-example" :disabled="controls.disabled">
        Disabled option
    </SRadio>
</template>
