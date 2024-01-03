<script setup lang="ts">
import FieldBadge from './FieldBadge.vue';
import FieldSelector from './popovers/FieldSelector.vue';
import FilterSelector from './popovers/FilterSelector.vue';
import { SInput, SButton, SPopover } from '@spartan';
import { FunnelIcon, InformationCircleIcon } from '@heroicons/vue/24/outline';
import { PlusIcon, InboxArrowDownIcon } from '@heroicons/vue/20/solid';
import { ref, computed, watchEffect } from 'vue';
import { translator } from '@/helpers';
import type { TField, SFilterEmits, SFilterProps, TSavedFilters } from './types';
import { createContext } from './api';

const emit = defineEmits<SFilterEmits>();
const props = defineProps<Partial<SFilterProps>>();

const { t } = translator('filter');

const context = createContext(props, emit);

const activeField = ref<TField>();
const activeSavedFilter = ref(false);

const savedFilterName = ref('');
const addFilterPop = ref<InstanceType<typeof SPopover> | undefined>();
const customFilterPop = ref<InstanceType<typeof SPopover> | undefined>();

const customFilterComputed = ref<TSavedFilters[]>(context.getSavedFilters() ?? []);
const enableFilterSaving = computed(() => props.fields?.some((filter) => filter.state));

// watchEffect(() => {
//     if (props.savedFilters) {
//         customFilterComputed.value = customFilterManager.get();
//     }
// });

const openCustomFilters = () => context.togglePopover(customFilterPop.value);
const openFieldSelector = () => context.togglePopover(addFilterPop.value);

const createCustomFilter = () => {
    activeSavedFilter.value = true;
    customFilterPop.value?.focus();
};

const saveCustomFilter = () => {
    context.addSavedFilter(
        savedFilterName.value!,
        props.fields!.filter((filter) => filter.state),
    );
    customFilterComputed.value = context.getSavedFilters();
    closeCustomFilter();
};

const selectCustomFilter = (savedFields: TField[]) => {
    // fields.value = JSON.parse(JSON.stringify(savedFields)) as TField[];
    emit('update:fields', savedFields);
    closeCustomFilter();
};

const closeFilterSelector = () => {
    addFilterPop.value?.close();
    activeField.value = undefined;
};

const closeCustomFilter = () => {
    addFilterPop.value?.close();
    activeSavedFilter.value = false;
};

defineExpose({
    apply: () => context.apply(),
    clear: () => context.clear(),
});
</script>

<template>
    <div class="flex w-full justify-between gap-8 pr-1">
        <div class="flex flex-wrap gap-3 pl-1">
            <FieldBadge v-if="fields" v-for="field in fields" :key="field.id" :field="field" />

            <SPopover ref="addFilterPop" :prevent-close="Boolean(activeField)" :offset="8">
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
                        v-if="!activeField"
                        :fields="fields ? fields.filter((field) => !field.state) : []"
                        @select="(field) => (activeField = field)"
                    />
                    <FilterSelector v-else :field="activeField" @close="closeFilterSelector" />
                </Transition>
            </SPopover>
        </div>

        <div class="flex gap-3">
            <SPopover v-if="savedFilters" ref="customFilterPop" :prevent-close="activeSavedFilter">
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
                        v-if="!activeSavedFilter"
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
                                    :disabled="!enableFilterSaving"
                                    :class="[
                                        !enableFilterSaving && 'opacity-50',
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
                    <div v-else class="w-80 overflow-hidden rounded-lg border border-gray-100 bg-white p-4 shadow-2xl">
                        <SInput id="filterName" v-model="savedFilterName" label="Nombre del filtro" />
                        <div class="mt-4 flex gap-3">
                            <SButton class="w-full" variant="secondary" @click="closeCustomFilter">
                                {{ t('cancelBtn') }}
                            </SButton>
                            <SButton
                                :class="['w-full', !savedFilterName?.trim() && 'pointer-events-none opacity-50']"
                                :disabled="!savedFilterName?.trim()"
                                @click="saveCustomFilter"
                            >
                                {{ t('saveBtn') }}
                            </SButton>
                        </div>
                    </div>
                </Transition>
            </SPopover>
            <SButton rounded="full" class="whitespace-nowrap !py-0.5" @click="context.apply">
                {{ t('applyBtn') }}
            </SButton>
            <SButton variant="secondary" rounded="full" class="whitespace-nowrap !py-0.5" @click="context.clear">
                {{ t('clearBtn') }}
            </SButton>
        </div>
    </div>
</template>
