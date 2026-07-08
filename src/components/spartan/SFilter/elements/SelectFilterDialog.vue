<script setup lang="ts">
import { SButton, SPopover } from '../..';
import { useContext } from '../context';
import { ChevronDownIcon } from '@heroicons/vue/20/solid';
import { computed, ref, watch } from 'vue';
import { resolveInputComponent } from '../constants';
import {
    getOperators,
    getOperatorId,
    getOperatorLabel,
    getOperatorInputCount,
    type CombinedOperator,
} from '../helpers';
import { translator } from '@/helpers';
import type { SFilterField } from '../types';

const emit = defineEmits<{
    (event: 'close'): void;
}>();

const { t } = translator('filter');

const context = useContext('SelectFilterDialog');

const fieldId = context.activeFieldId!;
const field = context.filters[fieldId] as SFilterField;
const operators = getOperators(field);
const initialEntry = context.value[fieldId];

const tempOperator = ref<CombinedOperator>(
    (initialEntry && operators.find((op) => getOperatorId(op) === initialEntry.operator)) || operators[0]!,
);
const value = ref<any>(initialEntry?.value);
const error = ref<string | null>(null);

const tempOperatorId = computed(() => getOperatorId(tempOperator.value));
const inputCount = computed(() => getOperatorInputCount(tempOperatorId.value, field));
const inputComponent = computed(() => resolveInputComponent(field, inputCount.value));

const selectOperator = (newOperator: CombinedOperator, close: () => void) => {
    tempOperator.value = newOperator;
    close();
};

const isEmpty = (v: any): boolean => {
    if (v === undefined || v === null || v === '') return true;
    if (Array.isArray(v)) return v.length === 0;
    return false;
};

const requiresValue = computed(() => inputCount.value > 0);
const disabled = computed(() => requiresValue.value && isEmpty(value.value));
const isValid = computed(() => !error.value);

const validate = async (raw: any) => {
    if (!field.validate || !requiresValue.value || isEmpty(raw)) {
        error.value = null;
        return;
    }
    error.value = await field.validate(raw, tempOperatorId.value);
};

watch(
    () => value.value,
    (newValue) => {
        validate(newValue);
    },
);

watch(
    () => tempOperatorId.value,
    () => {
        // re-validate when operator changes (e.g. operator switches from one-input to zero-input)
        validate(value.value);
    },
);

const add = () => {
    context.applyFilter(fieldId, tempOperatorId.value, requiresValue.value ? value.value : undefined);
    emit('close');
};
</script>

<template>
    <div class="flex max-h-96 w-[370px] flex-col gap-4 rounded-lg bg-white p-4 shadow-2xl dark:bg-gray-800">
        <div class="flex items-center gap-3">
            <span>{{ field.label }}</span>

            <SPopover :offset="8" :responsive="context.responsive">
                <template #reference="{ toggle }">
                    <button
                        class="flex items-center gap-1.5 rounded-lg bg-gray-100 py-1 pr-2 pl-3 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                        @click="toggle"
                    >
                        <span>{{ getOperatorLabel(tempOperator) }}</span>
                        <ChevronDownIcon class="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    </button>
                </template>

                <template #default="{ close }">
                    <ul
                        class="divide-y divide-gray-100 rounded-lg border border-gray-100 bg-white shadow-2xl dark:divide-gray-700 dark:border-gray-700 dark:bg-gray-800"
                    >
                        <li v-for="operator in operators" :key="getOperatorId(operator)">
                            <button
                                class="w-full p-3 text-left text-sm font-medium whitespace-nowrap text-gray-800 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-white/10"
                                @click="selectOperator(operator, close)"
                            >
                                {{ getOperatorLabel(operator) }}
                            </button>
                        </li>
                    </ul>
                </template>
            </SPopover>
        </div>

        <component :is="inputComponent" v-if="requiresValue" v-model="value" :field="field" :error-text="error" />

        <div class="flex gap-3">
            <SButton class="w-full" variant="secondary" @click="$emit('close')">{{ t('cancelBtn') }}</SButton>
            <SButton
                :class="['w-full', disabled && 'pointer-events-none opacity-50']"
                :disabled="disabled || !isValid"
                @click="add"
            >
                {{ t('addBtn') }}
            </SButton>
        </div>
    </div>
</template>
