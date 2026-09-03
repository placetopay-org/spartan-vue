<script setup lang="ts">
import { tm } from '@/helpers';
import { ref, computed } from 'vue';
import { useContext } from './api';
import { inputOtpItemStyles, inputOtpItemTextStyles } from './styles';
import type { TInputOtpItemProps } from './types';

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
    <div tabindex="-1" :class="tm(inputOtpItemStyles({ active, success, error }), $props.class)">
        <span :class="tm(inputOtpItemTextStyles({ value: !!value, success, error }))">{{ value || '-' }}</span>
    </div>
</template>
