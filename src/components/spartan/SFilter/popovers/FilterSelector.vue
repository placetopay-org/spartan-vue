<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { SButton, SPopover } from '@spartan';
import { InputSelector, TwoInputSelector, OptionsSelector } from '../selectors';
import { Oper, FieldType, type TField } from '../types';
import { translator } from '@/helpers';
import { ChevronDownIcon } from '@heroicons/vue/20/solid';

const emit = defineEmits<{
    (event: 'add', value: { field: TField; filter: TField['filter'] }): void;
    (event: 'cancel'): void;
}>();

const props = defineProps<{
    field: TField;
}>();

const conditionMap = {
    [FieldType.BOOLEAN]: {
        [Oper.EX]: null,
        [Oper.NEX]: null,
        [Oper.EQ]: OptionsSelector,
    },
    [FieldType.STRING]: {
        [Oper.EX]: null,
        [Oper.NEX]: null,
        [Oper.EQ]: InputSelector,
        [Oper.NEQ]: InputSelector,
        [Oper.CONTAINS]: InputSelector,
        [Oper.STARTSWITH]: InputSelector,
        [Oper.ENDSWITH]: InputSelector,
    },
    [FieldType.NUMBER]: {
        [Oper.EX]: null,
        [Oper.NEX]: null,
        [Oper.EQ]: InputSelector,
        [Oper.NEQ]: InputSelector,
        [Oper.GT]: InputSelector,
        [Oper.GTE]: InputSelector,
        [Oper.LT]: InputSelector,
        [Oper.LTE]: InputSelector,
        [Oper.BETWEEN]: TwoInputSelector,
        [Oper.NBETWEEN]: TwoInputSelector,
    },
    [FieldType.DATE]: {
        [Oper.EX]: null,
        [Oper.NEX]: null,
        [Oper.EQ]: InputSelector,
        [Oper.NEQ]: InputSelector,
        [Oper.GT]: InputSelector,
        [Oper.GTE]: InputSelector,
        [Oper.LT]: InputSelector,
        [Oper.LTE]: InputSelector,
        [Oper.BETWEEN]: TwoInputSelector,
        [Oper.NBETWEEN]: TwoInputSelector,
    },
    [FieldType.ENUM]: {
        [Oper.EX]: null,
        [Oper.NEX]: null,
        [Oper.EQ]: OptionsSelector,
        [Oper.NEQ]: OptionsSelector,
    },
};

const { t } = translator('filter');
const value = ref();
const operatorGroup = conditionMap[props.field.type];
const operators = Object.keys(operatorGroup) as Oper[];
const activeOperator = ref(operators[0]);

const filterComponent = computed(() => operatorGroup[activeOperator.value as keyof typeof operatorGroup]);

const selectOperator = (selection: Oper, closeCallback: () => void) => {
    if (
        selection === Oper.BETWEEN ||
        selection === Oper.NBETWEEN ||
        activeOperator.value === Oper.BETWEEN ||
        activeOperator.value === Oper.NBETWEEN
    ) {
        value.value = undefined;
    }
    activeOperator.value = selection;
    closeCallback();
};

const add = () => {
    emit('add', {
        field: props.field,
        filter: {
            operator: activeOperator.value,
            value: value.value,
        } as TField['filter'],
    });
};

const disabled = computed(() => {
    if (activeOperator.value === Oper.EX || activeOperator.value === Oper.NEX) return false;

    const isValid = (value: string | number | boolean | null | undefined) => {
        if (value === 0) return true;
        return !!(value && String(value).trim());
    };

    if (Array.isArray(value.value)) {
        if (value.value.length === 0) return true;
        return !value.value.every((item) => isValid(item));
    }
    return !isValid(value.value);
});

onMounted(() => {
    if (props.field.filter) {
        activeOperator.value = props.field.filter.operator;
        value.value = props.field.filter.value;
    }
});
</script>

<template>
    <div class="flex max-h-96 min-w-[370px] flex-col gap-4 rounded-lg bg-white p-4 shadow-2xl">
        <div class="flex items-center gap-3">
            <span>{{ field.name }}</span>
            <SPopover :offset="8">
                <template #reference="{ toggle }">
                    <button
                        class="flex items-center gap-1.5 rounded-lg bg-gray-100 py-1 pl-3 pr-2 text-gray-800"
                        @click="toggle"
                    >
                        <span>{{ t('oper.' + activeOperator) }}</span>
                        <ChevronDownIcon class="h-5 w-5 text-gray-600" />
                    </button>
                </template>

                <template #default="{ close }">
                    <ul class="divide-y divide-gray-100 rounded-lg border border-gray-100 bg-white shadow-2xl">
                        <li v-for="operator in operators" :key="operator">
                            <button
                                class="w-full whitespace-nowrap p-3 text-left text-sm font-medium text-gray-800 hover:bg-gray-50"
                                @click="selectOperator(operator, close)"
                            >
                                {{ t('oper.' + operator) }}
                            </button>
                        </li>
                    </ul>
                </template>
            </SPopover>
        </div>

        <Transition
            mode="out-in"
            enter-active-class="transition duration-200 ease-out"
            leave-active-class="transition duration-150 ease-in"
            enter-from-class="-translate-y-2 opacity-0"
            enter-to-class="translate-y-0 opacity-100"
            leave-from-class="translate-y-0 opacity-100"
            leave-to-class="-translate-y-2 opacity-0"
        >
            <component :is="filterComponent" v-if="filterComponent" v-model="value" :field="props.field" />
        </Transition>

        <div class="flex gap-3">
            <SButton class="w-full" variant="secondary" @click="$emit('cancel')">{{ t('cancelBtn') }}</SButton>
            <SButton
                :class="['w-full', disabled && 'pointer-events-none opacity-50']"
                :disabled="disabled"
                @click="add"
            >
                {{ t('addBtn') }}
            </SButton>
        </div>
    </div>
</template>