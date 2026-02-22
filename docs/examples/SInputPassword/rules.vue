<script setup lang="ts">
import { ref } from 'vue'
import { usePreview } from '~/composables/usePreview'
import type { TState } from '../../../../src/components/spartan/SInputPassword/types'

const value = ref('')
const state = ref<TState>({})

usePreview({ component: 'SInputPassword' })
</script>

<template>
    <div class="flex flex-col gap-4">
        <SInputPassword
            v-model="value"
            meter
            :rules="{ min: 8, max: 20, uppercase: true, lowercase: true, digit: true, special: true }"
            placeholder="Enter password"
            @state="state = $event"
        />
        <SInputPasswordPanel :state="state" />
    </div>
</template>
