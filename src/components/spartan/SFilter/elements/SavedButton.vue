<script setup lang="ts">
import { SButton } from '../../SButton';
import { SPopover } from '../../SPopover';
import { SInput } from '../../SInput';
import { SCard } from '../../SCard';
import { translator } from '@/helpers';
import { useContext } from '../context';
import { FilterIcon, InfoCircleIcon } from '@placetopay/iconsax-vue/outline';
import { InboxArrowDownIcon } from '@heroicons/vue/20/solid';
import { computed, ref } from 'vue';
import type { TField, TSaveData } from '../types';
import { FadeTransition } from '@internal';

const { t } = translator('filter');

const context = useContext('SavedButton');
const popover = ref<InstanceType<typeof SPopover>>();
const savedFilterName = ref('');

const activeSaving = ref(false);
const enableSaving = computed(() => context.fields?.filter((field) => field.state).length);

const openSaveModal = () => {
    popover.value?.toggle();
};

const closeSaveModal = () => {
    activeSaving.value = false;
    popover.value?.close();
};

const saveNewFilter = () => {
    if (!savedFilterName.value.trim()) return;

    const fields: TField[] = [];
    context.fields?.forEach((field) => {
        if (field.state) {
            let cleanField: TField;

            if (field.interfaces?.none) {
                cleanField = {
                    id: field.id,
                    name: field.name,
                    interfaces: {
                        none: {
                            operators: field.interfaces.none.operators
                        }
                    },
                    state: field.state
                };
            } else if (field.interfaces?.single) {
                cleanField = {
                    id: field.id,
                    name: field.name,
                    interfaces: {
                        single: {
                            inputType: field.interfaces.single.inputType,
                            minorUnitMode: field.interfaces.single.minorUnitMode,
                            currency: field.interfaces.single.currency,
                            currencies: field.interfaces.single.currencies,
                            operators: field.interfaces.single.operators
                        }
                    },
                    state: field.state
                };
            } else if (field.interfaces?.range) {
                cleanField = {
                    id: field.id,
                    name: field.name,
                    interfaces: {
                        range: {
                            inputType: field.interfaces.range.inputType,
                            minorUnitMode: field.interfaces.range.minorUnitMode,
                            currency: field.interfaces.range.currency,
                            currencies: field.interfaces.range.currencies,
                            operators: field.interfaces.range.operators
                        }
                    },
                    state: field.state
                };
            } else if (field.interfaces?.options) {
                cleanField = {
                    id: field.id,
                    name: field.name,
                    interfaces: {
                        options: {
                            options: field.interfaces.options.options,
                            multiple: field.interfaces.options.multiple,
                            operators: field.interfaces.options.operators
                        }
                    },
                    state: field.state
                };
            } else if (field.interfaces?.selection) {
                cleanField = {
                    id: field.id,
                    name: field.name,
                    interfaces: {
                        selection: {
                            operators: field.interfaces.selection.operators
                        }
                    },
                    state: field.state
                };
            } else {
                return; // Skip invalid types
            }

            fields.push(cleanField);
        }
    });

    context.saveFilter(savedFilterName.value.trim(), fields);
    closeSaveModal();
};

const selectFilter = (filter: TSaveData) => {
    context.loadFilter(filter.filters);
};
</script>

<template>
    <SPopover ref="popover" :responsive="context.responsive" :prevent-close="activeSaving" :offset="8">
        <template #reference>
            <SButton
                class="h-[26px] whitespace-nowrap"
                size="sm"
                rounded="full"
                variant="outline"
                @click="openSaveModal"
            >
                <FilterIcon class="h-5 w-5" />
            </SButton>
        </template>

        <FadeTransition>
            <SCard
                pt:body="sm:p-0"
                v-if="!activeSaving"
                class="min-w-[220px] overflow-hidden rounded-lg border border-none border-gray-100 bg-white shadow-2xl"
            >
                <ul class="w-full">
                    <li class="whitespace-nowrap bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-900">
                        {{ t('savedFiltersText') }}
                    </li>
                    <li
                        v-for="item in context.saved"
                        :key="item.name"
                        class="rounded-lg hover:bg-gray-50 hover:text-spartan-primary-600"
                    >
                        <button class="w-full px-4 py-2 text-left" @click="selectFilter(item)">
                            {{ item.name }}
                        </button>
                    </li>
                    <li
                        v-if="!context.saved?.length"
                        class="flex w-56 gap-3 px-4 py-2 text-sm font-medium text-gray-400"
                    >
                        <div><InfoCircleIcon class="h-5 w-5" /></div>
                        <span>{{ t('notFoundFieldText') }}</span>
                    </li>
                    <li>
                        <button
                            :disabled="!enableSaving"
                            :class="[
                                !enableSaving && 'pointer-events-none opacity-50',
                                'flex w-full gap-3 whitespace-nowrap bg-spartan-primary-600 px-4 py-3 text-sm font-semibold text-gray-50 hover:bg-spartan-primary-700',
                            ]"
                            @click="activeSaving = true"
                        >
                            <InboxArrowDownIcon class="h-5 w-5" />
                            <span>{{ t('customSaveBtn') }}</span>
                        </button>
                    </li>
                </ul>
            </SCard>
            <div v-else class="w-80 overflow-hidden rounded-lg border border-gray-100 bg-white p-4 shadow-2xl">
                <SInput id="filterName" v-model="savedFilterName" label="Nombre del filtro" />
                <div class="mt-4 flex gap-3">
                    <SButton class="w-full" variant="secondary" @click="closeSaveModal">
                        {{ t('cancelBtn') }}
                    </SButton>
                    <SButton
                        :class="['w-full', !savedFilterName?.trim() && 'pointer-events-none opacity-50']"
                        :disabled="!savedFilterName?.trim()"
                        @click="saveNewFilter"
                    >
                        {{ t('saveBtn') }}
                    </SButton>
                </div>
            </div>
        </FadeTransition>
    </SPopover>
</template>
