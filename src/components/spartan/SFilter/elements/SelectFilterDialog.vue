<script setup lang="ts">
import { translator } from '@/helpers';
import { SButton, SPopover } from '../..';
import { useContext } from '../api';
import { ChevronDownIcon } from '@heroicons/vue/20/solid';
import { computed, ref } from 'vue';
import { interfaceComponents } from '../constants';

const emit = defineEmits<{
    (event: 'close'): void;
}>();

const { t } = translator('filter');

const context = useContext('SelectFilterDialog');
const field = context.activeField!;

const operators = ref(context.operatorData[field.id].operators);
const operator = ref(operators.value[0]);
const interfaceId = computed(() => context.operatorData[field.id].interfaces[operator.value.id]);

const selectOperator = (newOperator: typeof operator.value, close: () => void) => {
    operator.value = newOperator;
    close();
}

const value = ref(field.state?.value ?? undefined);

const add = () => {
    field.state = {
        operator: operator.value.id,
        value: value.value,
    };
    emit('close');
};

const disabled = computed(() => (!value.value || value.value.length === 0) && interfaceId.value !== 'none');
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
                        <span>{{ t(`operator.${operator.id}`) }}</span>
                        <ChevronDownIcon class="h-5 w-5 text-gray-600" />
                    </button>
                </template>

                <template #default="{ close }">
                    <ul class="divide-y divide-gray-100 rounded-lg border border-gray-100 bg-white shadow-2xl">
                        <li v-for="operator in operators" :key="operator.id">
                            <button
                                class="w-full whitespace-nowrap p-3 text-left text-sm font-medium text-gray-800 hover:bg-gray-50"
                                @click="selectOperator(operator, close)"
                            >
                                {{ t(`operator.${operator.id}`) }}
                            </button>
                        </li>
                    </ul>
                </template>
            </SPopover>
        </div>

        <component :is="interfaceComponents[interfaceId]" :config="field.interfaces[interfaceId]" v-model="value"/>

        <div class="flex gap-3">
            <SButton class="w-full" variant="secondary" @click="$emit('close')">{{ t('cancelBtn') }}</SButton>
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
