<script setup lang="ts">
import type { TCopyProps, TCopyEmits } from './types';
import { ref, useSlots } from 'vue';
import { STooltip } from '../STooltip';
import { CopyIcon, CopySuccessIcon } from '@placetopay/iconsax-vue/bulk';
import { translator } from '@/helpers';
import { twMerge } from 'tailwind-merge';

const emit = defineEmits<TCopyEmits>();
const slots = useSlots();
const { value } = defineProps<TCopyProps>();
const { t } = translator('copy');

const copying = ref<ReturnType<typeof setTimeout>>();

const tooltip = ref<InstanceType<typeof STooltip>>();

const copy = () => {
    tooltip.value?.open();
    clearTimeout(copying.value);
    copying.value = setTimeout(() => {
        copying.value = undefined;
        tooltip.value?.close();
    }, 3000);

    let valueToCopy = value || '';

    if (!valueToCopy) {
        const slot = slots.default?.()[0];
        if (slot) {
            if (typeof slot.children === 'string') valueToCopy = slot.children;
            else valueToCopy = slot.el?.innerText || '';
        }
    }

    navigator.clipboard.writeText(valueToCopy);
    emit('copied', valueToCopy);
};
</script>

<template>
    <div
        :class="twMerge('group inline-flex cursor-pointer select-none items-center gap-2', $props.class)"
        @click="copy"
    >
        <slot />

        <STooltip ref="tooltip" :title="t('copied')" color="dark" placement="top" static manual>
            <div class="relative">
                <CopyIcon class="h-5 w-5 text-gray-400 group-hover:text-gray-600" />
                <Transition
                    mode="out-in"
                    enter-active-class="duration-300 ease-out"
                    leave-active-class="duration-300 ease-out"
                    enter-from-class="opacity-0"
                    enter-to-class="opacity-100"
                    leave-from-class="opacity-100"
                    leave-to-class="opacity-0"
                >
                    <CopySuccessIcon v-if="copying" class="absolute inset-0 h-5 w-5 bg-white text-gray-900" />
                </Transition>
            </div>
        </STooltip>
    </div>
</template>
