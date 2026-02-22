<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'

const date = ref('')
const phone = ref('')
const creditCard = ref('')

usePreview({ component: 'SInputMask' })
</script>

<template>
    <div class="flex flex-col gap-4">
        <SInputMask v-model="date" mask="00/00/0000" placeholder="DD/MM/YYYY" />
        <SInputMask v-model="phone" mask="(000) 000-0000" placeholder="(000) 000-0000" />
        <SInputMask v-model="creditCard" mask="0000 0000 0000 0000" placeholder="0000 0000 0000 0000" />
    </div>
</template>
