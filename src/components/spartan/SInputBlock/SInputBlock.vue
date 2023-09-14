<script setup lang="ts">
import { computed } from 'vue';
import { SInput, SLabel, type TInputProps } from '@spartan';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
    defineProps<Partial<{ error: string; helpText: string; label: string }> & Omit<Partial<TInputProps>, 'error'>>(),
    {
        error: undefined,
        label: undefined,
    },
);

const inputProps = computed(() => ({ ...props, error: Boolean(props.error), helpText: undefined, label: undefined }));
</script>

<template>
    <div>
        <SLabel v-if="label" :for="id">{{ label }}</SLabel>
        <SInput v-bind="inputProps" />
        <div class="flex flex-col">
            <span v-if="helpText" class="mt-1 text-xs font-normal text-gray-500">{{ helpText }}</span>
            <span v-if="error" class="mt-1 text-xs font-normal text-red-500">{{ error }}</span>
        </div>
    </div>
</template>
