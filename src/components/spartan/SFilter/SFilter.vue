<script setup lang="ts">
import FieldFilter from './FieldFilter.vue';
import FieldSelector from './popovers/FieldSelector.vue';
import FilterSelector from './popovers/FilterSelector.vue';
import { SInput, SButton, SPopover } from '@spartan';
import { FunnelIcon, InformationCircleIcon } from '@heroicons/vue/24/outline';
import { PlusIcon, InboxArrowDownIcon } from '@heroicons/vue/20/solid';
import { ref, computed, watchEffect } from 'vue';
import { closeActivePopover, customFilterManager } from './helpers';
import { useStep } from '@/hooks';
import { translator } from '@/helpers';
import type { Field, TField } from './types';

const { t } = translator('filter');

defineEmits<{
    (event: 'apply', fields: TField[]): void;
}>();

const props = defineProps<{
    savedFilters?: boolean;
    fields: Field[];
}>();

const fields = ref(props.fields);

const filterName = ref<string>();
const addFilterPop = ref<InstanceType<typeof SPopover> | null>(null);
const customFilterPop = ref<InstanceType<typeof SPopover> | null>(null);
const preventClose = ref(false);
const activeField = ref<Field>();
const customFilterComputed = ref<{ name: string; data: TField[] }[]>([]);
// const enableCustomFilter = computed(() => fields.value.some((filter) => filter.filter));

watchEffect(() => {
    if (props.savedFilters) {
        customFilterComputed.value = customFilterManager.get();
    }
});

const { step: addFilterPopState, is: isAddFilterPopState, next: nextAddFilterPopState } = useStep();
const { step: customFilterPopState, is: isCustomFilterPopState, next: nextCustomFilterPopState } = useStep();

const switchPopover = (open?: () => void, close?: () => void) => {
    closeActivePopover.value?.();
    open?.();
    closeActivePopover.value = close;
};

const openCustomFilters = () => switchPopover(customFilterPop.value?.open, resetCustomFilter);

const createCustomFilter = () => {
    nextCustomFilterPopState();
    preventClose.value = true;
    customFilterPop.value?.focus();
};

// const saveCustomFilter = () => {
//     customFilterManager.add(
//         filterName.value!,
//         fields.value.filter((filter) => filter.filter),
//     );
//     customFilterComputed.value = customFilterManager.get();
//     resetCustomFilter();
// };

// const selectCustomFilter = (savedFields: TField[]) => {
//     fields.value = JSON.parse(JSON.stringify(savedFields)) as TField[];
//     resetCustomFilter();
// };

const openFieldSelector = () => switchPopover(addFilterPop.value?.open, resetAddFilter);

const selectField = (field: Field) => {
    activeField.value = field;
    nextAddFilterPopState();
    preventClose.value = true;
};

const updateFilter = ({ field, state }: { field: Field; state: Field['state'] }) => {
    field.state = state;
    closeActivePopover.value?.();
};

const clearState = (field: Field) => {
    delete field.state;
};

const resetAddFilter = () => {
    activeField.value = undefined;
    addFilterPopState.value = 0;
    preventClose.value = false;
    addFilterPop.value?.close();
};

const resetCustomFilter = () => {
    customFilterPopState.value = 0;
    preventClose.value = false;
    customFilterPop.value?.close();
};

// const clean = () => fields.value.forEach((filter) => !filter.required && (filter.filter = undefined));
</script>

<template>
    <div class="flex w-full justify-between gap-8 pr-1">
        <div class="flex flex-wrap gap-3 pl-1">
            <FieldFilter
                v-for="field in fields"
                :key="field.name"
                :field="field"
                :filter-idx="fields.indexOf(field)"
                @update="updateFilter"
                @remove="clearState"
            />

            <SPopover ref="addFilterPop" :prevent-close="preventClose" :offset="8">
                <template #reference>
                    <button
                        class="group flex items-center gap-2 whitespace-nowrap rounded-full border border-dashed border-gray-400 px-3 py-0.5 text-sm text-gray-400 hover:border-gray-500 hover:text-gray-600 focus:s-ring"
                        @click="openFieldSelector"
                    >
                        <PlusIcon class="h-4 w-4" />
                        <span>{{ t('addFilterBtn') }}</span>
                    </button>
                </template>

                <Transition
                    mode="out-in"
                    enter-active-class="duration-150 ease-out"
                    leave-active-class="duration-150 ease-in"
                    enter-from-class="opacity-0"
                    enter-to-class="opacity-100"
                    leave-from-class="opacity-100"
                    leave-to-class="opacity-0"
                >
                    <FieldSelector
                        v-if="isAddFilterPopState(0)"
                        :fields="fields.filter((field) => !field.state)"
                        @select="selectField"
                    />
                    <FilterSelector
                        v-else-if="isAddFilterPopState(1) && activeField"
                        :field="activeField"
                        @add="updateFilter"
                        @cancel="resetAddFilter"
                    />
                </Transition>
            </SPopover>
        </div>

        <div class="flex gap-3">
            <SPopover v-if="savedFilters" ref="customFilterPop" :prevent-close="preventClose">
                <template #reference>
                    <SButton
                        variant="outline"
                        rounded="full"
                        class="!py-0.5"
                        :icon="FunnelIcon"
                        @click="openCustomFilters"
                    />
                </template>

                <Transition
                    mode="out-in"
                    enter-active-class="duration-150 ease-out"
                    leave-active-class="duration-150 ease-in"
                    enter-from-class="opacity-0"
                    enter-to-class="opacity-100"
                    leave-from-class="opacity-100"
                    leave-to-class="opacity-0"
                >
                    <div
                        v-if="isCustomFilterPopState(0)"
                        class="min-w-[220px] overflow-hidden rounded-lg border border-gray-100 bg-white shadow-2xl"
                    >
                        <ul class="w-full">
                            <li class="whitespace-nowrap bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-900">
                                {{ t('savedFiltersText') }}
                            </li>
                            <li
                                v-for="item in customFilterComputed"
                                :key="item.name"
                                class="rounded-lg hover:bg-gray-50 hover:text-primary-600"
                            >
                                <button class="w-full px-4 py-2 text-left" @click="selectCustomFilter(item.data)">
                                    {{ item.name }}
                                </button>
                            </li>
                            <li
                                v-if="!customFilterComputed.length"
                                class="flex gap-3 px-4 py-2 text-sm font-medium text-gray-400"
                            >
                                <div><InformationCircleIcon class="h-5 w-5" /></div>
                                <span>{{ t('notFoundFieldText') }}</span>
                            </li>
                            <li>
                                <button
                                    :disabled="!enableCustomFilter"
                                    :class="[
                                        !enableCustomFilter && 'opacity-50',
                                        'flex w-full gap-3 whitespace-nowrap bg-primary-600 px-4 py-3 text-sm font-semibold text-gray-50 hover:bg-primary-700',
                                    ]"
                                    @click="createCustomFilter"
                                >
                                    <InboxArrowDownIcon class="h-5 w-5" />
                                    <span>{{ t('customSaveBtn') }}</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div
                        v-else-if="isCustomFilterPopState(1)"
                        class="w-80 overflow-hidden rounded-lg border border-gray-100 bg-white p-4 shadow-2xl"
                    >
                        <SInput id="filterName" v-model="filterName" label="Nombre del filtro" />
                        <div class="mt-4 flex gap-3">
                            <SButton class="w-full" variant="secondary" @click="resetCustomFilter">Cancelar</SButton>
                            <SButton
                                :class="['w-full', !filterName?.trim() && 'pointer-events-none opacity-50']"
                                :disabled="!filterName?.trim()"
                                @click="saveCustomFilter"
                            >
                                {{ t('saveBtn') }}
                            </SButton>
                        </div>
                    </div>
                </Transition>
            </SPopover>
            <SButton
                rounded="full"
                class="whitespace-nowrap !py-0.5"
                @click="
                    $emit(
                        'apply',
                        fields.filter((filter) => filter.filter),
                    )
                "
            >
                {{ t('applyBtn') }}
            </SButton>
            <SButton variant="secondary" rounded="full" class="whitespace-nowrap !py-0.5" @click="clean">
                {{ t('clearBtn') }}
            </SButton>
        </div>
    </div>
</template>
