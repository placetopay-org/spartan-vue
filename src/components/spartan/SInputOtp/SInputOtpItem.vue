<script setup lang="ts">
import { ref } from 'vue';
import { useContext } from './api';
import { inputOtpItemStyles, inputOtpItemTextStyles } from './styles';
import { twMerge } from 'tailwind-merge';
import type { TInputOtpItemProps } from './types';
import { computed } from 'vue';

defineProps<TInputOtpItemProps>();

const ctx = useContext('SInputOtpItem');

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
    <div tabindex="-1" :class="twMerge(inputOtpItemStyles({ active, success, error }), $props.class)">
        <span :class="twMerge(inputOtpItemTextStyles({ value: !!value, success, error }))">{{ value || '-' }}</span>
    </div>
</template>
