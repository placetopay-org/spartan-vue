<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const selected = ref(['Apple', 'Banana', 'Cherry'])
const options = ['Apple', 'Banana', 'Cherry', 'Grape', 'Mango', 'Orange']

const { controls } = usePreview({
    props: {
        badgeList: { type: 'boolean', default: true, label: 'badgeList' },
    },
})
</script>

<template>
    <SMultiSelector
        v-model="selected"
        :options="options"
        placeholder="Select fruits"
        :badge-list="controls.badgeList"
    />
</template>
