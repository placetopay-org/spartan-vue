<script setup lang="ts">
import { XCircleIcon, MagnifyingGlassIcon } from '@heroicons/vue/20/solid';
import { twMerge } from 'tailwind-merge';
import { inputStyle } from '@/constants';
import { translator } from '@/helpers';
import { ref, useTemplateRef, type ShallowRef } from 'vue';

const emit = defineEmits<{
    (e: 'query', query: string): void;
    (e: 'enter'): void;
}>();

const { t } = translator('selector');

const $input = useTemplateRef('input');
const hasValue = ref(false);

const onInput = (e: any) => {
    hasValue.value = e.target.value.length > 0;
    emit('query', e.target.value);
};

const clear = () => {
    emit('query', '');
    $input.value!.value = '';
    hasValue.value = false;
    $input.value?.focus();
};

defineExpose<{
    $input: ShallowRef<HTMLInputElement | null>;
}>({ $input });
</script>

<template>
    <div class="flex items-center gap-2.5 border-b border-gray-300 p-3 dark:border-white/10">
        <MagnifyingGlassIcon class="h-5 w-5 shrink-0 text-gray-400" />
        <input
            ref="input"
            :placeholder="t('search')"
            :class="
                twMerge(
                    `${inputStyle.root} ${inputStyle.text} ${inputStyle.placeholder} w-full border-none p-0 outline-none focus:ring-0 dark:bg-transparent`,
                )
            "
            @input="onInput"
            @keyup.enter="$emit('enter')"
        />
        <button v-if="hasValue" @click="clear">
            <XCircleIcon class="h-5 w-5 shrink-0 text-gray-400 dark:text-gray-500" />
        </button>
    </div>
</template>
