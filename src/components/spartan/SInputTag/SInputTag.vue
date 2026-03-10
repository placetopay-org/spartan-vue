<script lang="ts">
/**
 * A tag input that allows adding and removing text tags with keyboard support.
 * @see {@link https://github.com/placetopay-org/spartan-vue/tree/main/src/components/spartan/SInputTag Github}.
 */
export default {
    name: 'SInputTag',
};
</script>

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
        <div
            v-for="(tag, index) in tags"
            :key="index"
            class="flex h-fit gap-1 self-center rounded-lg bg-gray-200 dark:bg-white/10 pr-1.5 pl-2 text-sm text-gray-900 dark:text-gray-50"
        >
            {{ tag }}
            <button
                class="relative flex h-3 w-3 items-center justify-center self-center rounded-full bg-gray-400 dark:bg-white/30"
                @click="removeTag(tag)"
            >
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
            @keydown.prevent.enter="addTag(current)"
        />
    </div>
</template>
