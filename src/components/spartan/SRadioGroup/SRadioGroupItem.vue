<script setup lang="ts">
import { computed, inject, type Ref } from 'vue';
import { hasSlotContent } from '@/helpers';
import { RadioGroupOption, RadioGroupLabel, RadioGroupDescription } from '@headlessui/vue';
import { CheckCircleIcon } from '@heroicons/vue/20/solid';
import {
    radioGroupItemStyles,
    radioGroupItemTitleStyles,
    radioGroupItemDescriptionStyles,
    radioGroupItemFooterStyles,
    radioGroupItemIconStyles,
} from './styles';
import type { TRadioGroupItemProps } from './types';

const { disabled, value } = defineProps<TRadioGroupItemProps>();

const groupDisabled = inject<Ref<boolean | undefined>>('SRadioGroupDisabled');
const isDisabled = computed(() => disabled || groupDisabled?.value);
</script>

<template>
    <RadioGroupOption v-slot="{ checked }" as="template" :value :disabled="isDisabled">
        <div :class="radioGroupItemStyles({ checked, disabled: isDisabled })">
            <span class="flex flex-1">
                <span class="flex flex-col justify-between">
                    <div>
                        <RadioGroupLabel
                            v-if="hasSlotContent($slots.title)"
                            as="span"
                            :class="radioGroupItemTitleStyles()"
                        >
                            <slot name="title" />
                        </RadioGroupLabel>

                        <RadioGroupDescription
                            v-if="hasSlotContent($slots.description)"
                            as="span"
                            :class="radioGroupItemDescriptionStyles()"
                        >
                            <slot name="description" />
                        </RadioGroupDescription>
                    </div>

                    <RadioGroupDescription
                        v-if="hasSlotContent($slots.footer)"
                        as="span"
                        :class="radioGroupItemFooterStyles()"
                    >
                        <slot name="footer" />
                    </RadioGroupDescription>
                </span>
            </span>
            <CheckCircleIcon :class="[radioGroupItemIconStyles(), !checked && 'opacity-0']" :aria-hidden="!checked" />
        </div>
    </RadioGroupOption>
</template>
