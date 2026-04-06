<script setup lang="ts">
import { translator } from '@/helpers';
import { SButton, SPopover } from '../..';
import { useContext } from '../context';
import { ChevronDownIcon } from '@heroicons/vue/20/solid';
import { computed, ref, watch } from 'vue';
import { interfaceComponents } from '../constants';
import { getOperatorId, getOperatorLabel, getOperators } from '../helpers';
import type { TField, TInterfaceId, TOperator } from '../types';

const emit = defineEmits<{
    (event: 'close'): void;
}>();

const { t } = translator('filter');

const context = useContext('SelectFilterDialog');

if (!context.activeField) {
    throw new Error('SelectFilterDialog requires an active field in context');
}

const field = context.activeField;
const operators = getOperators(field);

const tempOperator = ref(field.state?.operator || operators[0]);
const tempInterface = computed<TInterfaceId>(() => {
    if (!field.interfaces) return 'none';

    const entry = Object.entries(field.interfaces).find(([, interfaceData]) =>
        interfaceData.operators.some((o) => o === tempOperator.value),
    );

    return (entry?.[0] as TInterfaceId) || 'none';
});
const tempInterfaceConfig = computed(() => {
    if (!field.interfaces || !tempInterface.value) return {};
    return (field.interfaces as any)[tempInterface.value];
});

const selectOperator = (newOperator: TOperator, close: () => void) => {
    tempOperator.value = newOperator;
    close();
};

const value = ref(field.state?.value);

const error = ref();

const add = () => {
    if (!tempOperator.value) return;
    field.state = {
        operator: tempOperator.value,
        value: value.value,
    } as TField['state'];
    emit('close');
};

const disabled = computed(() => (!value.value || value.value.length === 0) && tempInterface.value !== 'none');

const validate = async (value: any) => {
    const empty = Array.isArray(value) ? value.length === 0 : [undefined, null, ''].includes(value);
    if (!field.validate || empty) {
        error.value = null;
        return;
    }
    error.value = await field.validate(value, tempOperator.value!);
};

watch(
    () => value.value,
    (newValue) => {
        validate(newValue);
    },
);
const isValid = computed(() => !error.value);
</script>

<template>
    <div class="flex max-h-96 w-[370px] flex-col gap-4 rounded-lg bg-white dark:bg-gray-800 p-4 shadow-2xl">
        <div class="flex items-center gap-3">
            <span>{{ field.name }}</span>

            <SPopover :offset="8" :responsive="context.responsive">
                <template #reference="{ toggle }">
                    <button
                        class="flex items-center gap-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 py-1 pr-2 pl-3 text-gray-800 dark:text-gray-200"
                        @click="toggle"
                    >
                        <span>{{ getOperatorLabel(tempOperator) }}</span>
                        <ChevronDownIcon class="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    </button>
                </template>

                <template #default="{ close }">
                    <ul class="divide-y divide-gray-100 dark:divide-gray-700 rounded-lg border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-2xl">
                        <li v-for="operator in operators" :key="getOperatorId(operator)">
                            <button
                                class="w-full p-3 text-left text-sm font-medium whitespace-nowrap text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/10"
                                @click="selectOperator(operator, close)"
                            >
                                {{ getOperatorLabel(operator) }}
                            </button>
                        </li>
                    </ul>
                </template>
            </SPopover>
        </div>

        <component
            :is="interfaceComponents[tempInterface]"
            v-model="value"
            :config="tempInterfaceConfig"
            :error-text="error"
        />

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
