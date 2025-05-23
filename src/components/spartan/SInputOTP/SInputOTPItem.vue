<script setup lang="ts">
import { ref } from 'vue';
import { useContext } from './api';
import { inputOTPItemStyles, inputOTPItemTextStyles } from './styles';
import { twMerge } from 'tailwind-merge';
import type { TInputOTPItemProps } from './types';
import { computed } from 'vue';

defineProps<TInputOTPItemProps>();

const ctx = useContext('SInputOTPItem');

const value = ref('');
const active = ref(false);
const success = computed(() => ctx.success);
const error = computed(() => ctx.error);

ctx.register(
    (newValue: string) => (value.value = newValue),
    (newActive: boolean) => (active.value = newActive),
);
</script>

<template>
    <div tabindex="-1" :class="twMerge(inputOTPItemStyles({ active, success, error }), $props.class)">
        <span :class="twMerge(inputOTPItemTextStyles({ value: !!value, success, error }))">{{ value || '-' }}</span>
    </div>
</template>
