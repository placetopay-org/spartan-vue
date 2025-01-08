<script setup lang="ts">
import { twMerge } from 'tailwind-merge';
import { containerStyles, inputStyles } from './styles';
import type { TInputTagProps, TInputTagEmits } from './types';
import { usePassthrough } from '@/helpers';
import { computed, ref } from 'vue';

const { rounded = 'both', type = 'text', modelValue } = defineProps<TInputTagProps>();
const emit = defineEmits<TInputTagEmits>();
defineOptions({ inheritAttrs: false });

const { extractor, pt } = usePassthrough();

const [containerClass, containerProps] = extractor(pt.value.container);
const [inputClass, inputProps] = extractor(pt.value.input);

const tags = computed<string[]>({
    get() {
        return modelValue || [];
    },
    set(value) {
        emit('update:modelValue', value);
    },
});
const current = ref('');
const inputElement = ref<HTMLInputElement>();

const addTag = (tag: string) => {
    if (tag && !tags.value.includes(tag)) {
        tags.value = [...tags.value, tag];
        current.value = '';
    }
};

const onKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
        addTag(current.value);
    }
};

const removeTag = (tag: string) => {
    tags.value = tags.value.filter((t) => t !== tag);
};

const focusInput = () => inputElement.value?.focus();
</script>

<template>
    <div
        :class="
            twMerge(
                containerStyles({
                    error,
                    disabled,
                    rounded,
                    borderless,
                }),
                type === 'hidden' && 'hidden',
                $props.class,
                containerClass,
            )
        "
        v-bind="containerProps"
        @click="focusInput"
    >
        <div v-for="tag in tags" class="flex h-fit gap-1 self-center rounded-lg bg-gray-200 pl-2 pr-1.5 text-sm text-gray-900">
            {{ tag }}
            <button @click="removeTag(tag)" class="bg-gray-400 rounded-full relative h-3 w-3 flex items-center justify-center self-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="white" class="h-3 w-3">
                    <path
                        d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"
                    />
                </svg>
            </button>
        </div>
        <input
            ref="inputElement"
            v-model="current"
            :class="twMerge(inputStyles({ rounded }), 'w-fit', inputClass)"
            :disabled="disabled"
            :placeholder="placeholder"
            :type="type"
            v-bind="{ ...$attrs, ...inputProps }"
            @keypress="onKeyPress"
        />
    </div>
</template>
