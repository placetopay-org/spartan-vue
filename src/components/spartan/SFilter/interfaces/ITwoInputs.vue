<script setup lang="ts">
import { ref, watch } from 'vue';
import { SInputAmount, SInput } from '@spartan';
import { BlockWrapper } from '@internal';
import type { IInputConfig } from './types';
import { translator } from '@/helpers';

const emit = defineEmits(['update:modelValue', 'update:currency']);

const props = defineProps<{
    modelValue?: string[] | number[];
    config: IInputConfig;
    errorText?: string;
}>();

const { t } = translator('filter');

const value1 = ref(props.modelValue?.[0]);
const value2 = ref(props.modelValue?.[1]);

watch([value1, value2], () => {
    emit('update:modelValue', [value1.value, value2.value]);
});

const updateCurrency = (currency?: string) => {
    emit('update:currency', currency);
};
</script>

<template>
    <BlockWrapper :error-text="errorText">
        <div class="flex gap-4">
            <SInputAmount
                v-if="config.type === 'amount'"
                v-model="value1 as number"
                :currency="config.currency ?? config.currencies![0]"
                :currencies="config.currencies"
                :type="config.type"
                :placeholder="t('inputSelectorPlaceholder')"
                :minor-unit-mode="config.minorUnitMode"
                :error="!!errorText"
                @update:currency="updateCurrency"
            />
            <SInput
                v-else
                v-model="value1"
                class="w-48"
                :type="config.type"
                :placeholder="t('inputSelectorPlaceholder')"
                :error="!!errorText"
            />
            <SInputAmount
                v-if="config.type === 'amount'"
                v-model="value2 as number"
                :currency="config.currency ?? config.currencies![0]"
                :currencies="config.currencies"
                :type="config.type"
                :placeholder="t('inputSelectorPlaceholder')"
                :minor-unit-mode="config.minorUnitMode"
                :error="!!errorText"
                @update:currency="updateCurrency"
            />
            <SInput
                v-else
                v-model="value2"
                class="w-48"
                :type="config.type"
                :placeholder="t('inputSelectorPlaceholder')"
                :error="!!errorText"
            />
        </div>
    </BlockWrapper>
</template>
