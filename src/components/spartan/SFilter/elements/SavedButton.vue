<script setup lang="ts">
import { SButton } from '../../SButton';
import { SPopover } from '../../SPopover';
import { SInput } from '../../SInput';
import { SCard } from '../../SCard';
import { TrashIcon } from '@heroicons/vue/24/outline';
import { useContext } from '../context';
import { translator } from '@/helpers';

import { FilterIcon, InfoCircleIcon } from '@placetopay/iconsax-vue/outline';
import { InboxArrowDownIcon } from '@heroicons/vue/20/solid';
import { computed, onScopeDispose, ref } from 'vue';
import type { SFilterSaved } from '../types';
import { FadeTransition } from '@internal';

const context = useContext('SavedButton');
const { t } = translator('filter');
const popover = ref<InstanceType<typeof SPopover>>();
const savedFilterName = ref('');
const activeSaving = ref(false);
const handleId = Symbol('SavedButton');

context.popoverManager.register({
    id: handleId,
    close: () => popover.value?.close(),
});

onScopeDispose(() => context.popoverManager.unregister(handleId));

const enableSaving = computed(() => Object.keys(context.value).length > 0);

const togglePanel = () => {
    if (popover.value?.isOpen) {
        popover.value.close();
        return;
    }
    context.popoverManager.open(handleId);
    popover.value?.open();
};

const onPopoverClose = () => {
    context.popoverManager.notifyClosed(handleId);
    activeSaving.value = false;
    savedFilterName.value = '';
};

const resetAndClose = () => {
    activeSaving.value = false;
    savedFilterName.value = '';
    popover.value?.close();
};

const saveNewFilter = () => {
    const trimmedName = savedFilterName.value.trim();
    if (!trimmedName) return;

    context.saveCurrent(trimmedName);
    resetAndClose();
};

const loadSavedFilter = (entry: SFilterSaved) => {
    context.loadSnapshot(entry.snapshot);
    popover.value?.close();
};

const deleteSavedFilter = (event: Event, name: string) => {
    event.stopPropagation();
    context.deleteSaved(name);
};
</script>

<template>
    <SPopover
        ref="popover"
        :responsive="context.responsive"
        :prevent-close="activeSaving"
        :offset="8"
        @close="onPopoverClose"
    >
        <template #reference>
            <SButton class="h-[26px] whitespace-nowrap" size="sm" rounded="full" outline @click="togglePanel">
                <FilterIcon class="h-5 w-5" />
            </SButton>
        </template>

        <FadeTransition>
            <SCard
                v-if="!activeSaving"
                pt:body="sm:p-0"
                class="min-w-[220px] overflow-hidden rounded-lg border border-none border-gray-100 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-800"
            >
                <ul class="w-full">
                    <li
                        class="bg-gray-50 px-4 py-3 text-sm font-semibold whitespace-nowrap text-gray-900 dark:bg-gray-700 dark:text-gray-100"
                    >
                        {{ t('savedFiltersText') }}
                    </li>
                    <li
                        v-for="item in context.saved"
                        :key="item.name"
                        class="hover:text-spartan-primary-600 group flex items-center rounded-lg hover:bg-gray-50 dark:hover:bg-white/10"
                    >
                        <button class="flex-1 px-4 py-2 text-left" @click="loadSavedFilter(item)">
                            {{ item.name }}
                        </button>
                        <button
                            class="px-3 py-2 text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400"
                            :aria-label="`${t('deleteSavedBtn')}: ${item.name}`"
                            @click="(e) => deleteSavedFilter(e, item.name)"
                        >
                            <TrashIcon class="h-4 w-4" />
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
                                'bg-spartan-primary-600 hover:bg-spartan-primary-700 flex w-full gap-3 px-4 py-3 text-sm font-semibold whitespace-nowrap text-gray-50',
                            ]"
                            @click="activeSaving = true"
                        >
                            <InboxArrowDownIcon class="h-5 w-5" />
                            <span>{{ t('customSaveBtn') }}</span>
                        </button>
                    </li>
                </ul>
            </SCard>
            <div
                v-else
                class="w-80 overflow-hidden rounded-lg border border-gray-100 bg-white p-4 shadow-2xl dark:border-gray-700 dark:bg-gray-800"
            >
                <SInput id="filterName" v-model="savedFilterName" :label="t('savedFilterNameLabel')" />
                <div class="mt-4 flex gap-3">
                    <SButton class="w-full" variant="secondary" @click="resetAndClose">
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
