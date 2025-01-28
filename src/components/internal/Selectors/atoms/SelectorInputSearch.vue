<script setup lang="ts">
import { XCircleIcon, MagnifyingGlassIcon } from '@heroicons/vue/20/solid';
import { twMerge } from 'tailwind-merge';
import { optionStyles } from '../styles';
import { inputStyle } from '@/constants';
import { hasSlotContent, translator } from '@/helpers';
import isEqual from 'lodash.isequal';
import { useTemplateRef, type ShallowRef } from 'vue';

const emit = defineEmits<{
    (e: 'query', query: string): void;
    (e: 'enter'): void;
}>();

const { t } = translator('selector');

const $input = useTemplateRef('$input');

const clear = () => {
    emit('query', '');
    $input.value!.value = '';
    $input.value?.focus();
};

defineExpose<{
    $input: ShallowRef<HTMLInputElement | null>;
}>({ $input });
</script>

<template>
    <div class="flex items-center gap-2.5 border-b border-gray-950/5 px-3 py-1">
        <MagnifyingGlassIcon class="h-5 w-5 text-gray-400" />
        <input
            ref="$input"
            :placeholder="t('search')"
            :class="
                twMerge(
                    `${inputStyle.root} ${inputStyle.text} ${inputStyle.placeholder} w-full border-none p-0 outline-none focus:ring-0`,
                )
            "
            @input="(e: any) => $emit('query', e.target.value)"
            @keyup.enter="$emit('enter')"
        />
        <button @click="clear">
            <XCircleIcon class="h-5 w-5 text-gray-200" />
        </button>
    </div>
</template>
