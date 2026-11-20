<script lang="ts">
/**
 * A utility component that copies text to the clipboard on click, with visual feedback.
 * @see {@link https://github.com/placetopay-org/spartan-vue/tree/main/src/components/spartan/SCopy Github}.
 * @see {@link https://www.figma.com/design/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?node-id=15446-11314 Figma}.
 */
export default {
    name: 'SCopy',
};
</script>

<script setup lang="ts">
import type { TCopyProps, TCopyEmits } from './types';
import { onUnmounted, ref, useSlots } from 'vue';
import { STooltip } from '../STooltip';
import { CopyIcon, CopySuccessIcon } from '@placetopay/iconsax-vue/bulk';
import { translator } from '@/helpers';
import { twMerge } from 'tailwind-merge';

const emit = defineEmits<TCopyEmits>();
const slots = useSlots();
const { value } = defineProps<TCopyProps>();
const { t } = translator('copy');

const copying = ref<ReturnType<typeof setTimeout>>();
onUnmounted(() => clearTimeout(copying.value));

const tooltip = ref<InstanceType<typeof STooltip>>();

const legacyCopy = (text: string): boolean => {
    if (typeof document.execCommand !== 'function') return false;

    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.top = '-9999px';
    textarea.style.opacity = '0';

    try {
        document.body.appendChild(textarea);
        textarea.select();
        textarea.setSelectionRange(0, text.length);

        return document.execCommand('copy');
    } catch {
        return false;
    } finally {
        textarea.remove();
    }
};

const toError = (error: unknown): Error => {
    if (error instanceof Error) return error;

    if (typeof error === 'object' && error !== null && 'message' in error) {
        return new Error(String(error.message));
    }

    return new Error('Clipboard write failed');
};

type TClipboardResult = { success: true } | { success: false; error: Error };

const writeClipboard = async (text: string): Promise<TClipboardResult> => {
    try {
        if (navigator.clipboard?.writeText) {
            await navigator.clipboard.writeText(text);

            return { success: true };
        }
    } catch (error) {
        return legacyCopy(text) ? { success: true } : { success: false, error: toError(error) };
    }

    return legacyCopy(text)
        ? { success: true }
        : { success: false, error: new Error('Clipboard API is not available') };
};

const copy = async () => {
    let valueToCopy = value || '';

    if (!valueToCopy) {
        const slot = slots.default?.()[0];
        if (slot) {
            if (typeof slot.children === 'string') valueToCopy = slot.children;
            else valueToCopy = slot.el?.innerText || '';
        }
    }

    const result = await writeClipboard(valueToCopy);

    if (!result.success) {
        clearTimeout(copying.value);
        copying.value = undefined;
        tooltip.value?.close();
        emit('failed', result.error);

        return;
    }

    tooltip.value?.open();
    clearTimeout(copying.value);
    copying.value = setTimeout(() => {
        copying.value = undefined;
        tooltip.value?.close();
    }, 3000);

    emit('copied', valueToCopy);
};
</script>

<template>
    <div
        :class="twMerge('group inline-flex cursor-pointer items-center gap-2 select-none', $props.class)"
        @click="copy"
    >
        <slot />

        <STooltip ref="tooltip" :title="t('copied')" color="dark" placement="top" static manual>
            <div class="relative">
                <CopyIcon
                    class="h-5 w-5 text-gray-400 group-hover:text-gray-600 dark:text-gray-500 dark:group-hover:text-gray-300"
                />
                <Transition
                    mode="out-in"
                    enter-active-class="duration-300 ease-out"
                    leave-active-class="duration-300 ease-out"
                    enter-from-class="opacity-0"
                    enter-to-class="opacity-100"
                    leave-from-class="opacity-100"
                    leave-to-class="opacity-0"
                >
                    <CopySuccessIcon
                        v-if="copying"
                        class="absolute inset-0 h-5 w-5 bg-white text-gray-900 dark:bg-gray-900 dark:text-white"
                    />
                </Transition>
            </div>
        </STooltip>
    </div>
</template>
