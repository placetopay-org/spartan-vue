<script setup lang="ts">
import { AddIcon } from '@placetopay/iconsax-vue/linear';
import { SPopover, SInput } from '../..';
import { useContext } from '../context';
import { computed, onScopeDispose, ref } from 'vue';

import { FadeTransition } from '@internal';
import SelectFilterDialog from './SelectFilterDialog.vue';
import { translator } from '@/helpers';

const context = useContext('AddFilterButton');

const { t } = translator('filter');

const refPopover = ref<InstanceType<typeof SPopover>>();
const handleId = Symbol('AddFilterButton');

context.popoverManager.register({
    id: handleId,
    close: () => refPopover.value?.close(),
});

onScopeDispose(() => context.popoverManager.unregister(handleId));

const query = ref('');
const selectFieldStep = ref(true);

// Available fields = filters not currently in v-model value.
const options = computed(() => {
    const applied = new Set(Object.keys(context.value));
    return Object.entries(context.filters)
        .filter(([id, field]) => !applied.has(id) && field.label.toLowerCase().includes(query.value.toLowerCase()))
        .map(([id, field]) => ({ id, label: field.label }));
});

const openPopover = () => {
    if (refPopover.value?.isOpen) {
        refPopover.value.close();
        return;
    }
    context.popoverManager.open(handleId);
    refPopover.value?.open();
};

const onPopoverClose = () => {
    context.popoverManager.notifyClosed(handleId);
    selectFieldStep.value = true;
    query.value = '';
};

const pickField = (id: string) => {
    context.selectField(id);
    selectFieldStep.value = false;
};
</script>

<template>
    <SPopover
        ref="refPopover"
        :responsive="context.responsive"
        :offset="8"
        :prevent-close="!selectFieldStep"
        @close="onPopoverClose"
    >
        <template #reference>
            <button
                :disabled="!options.length"
                class="group focus:s-outline flex items-center gap-2 rounded-full border border-dashed border-gray-400 px-3 py-0.5 text-sm whitespace-nowrap text-gray-400 outline-2 outline-offset-0 outline-transparent transition-[outline-offset,outline-color] duration-150 hover:border-gray-500 hover:text-gray-600 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-500 dark:text-gray-500 dark:hover:border-gray-400 dark:hover:text-gray-300"
                @click="openPopover"
            >
                <AddIcon class="h-5 w-5" />
                <span>{{ t('addFilterBtn') }}</span>
            </button>
        </template>

        <FadeTransition>
            <div
                v-if="selectFieldStep"
                class="flex max-h-96 min-w-[255px] flex-col overflow-y-auto rounded-lg bg-white shadow-2xl dark:bg-gray-800"
            >
                <div class="px-4 pt-4 pb-3">
                    <SInput v-model="query" :placeholder="t('fieldSelectorPlaceholder')" />
                </div>
                <ul class="w-full">
                    <li v-if="!options.length" class="px-4 py-2 text-gray-400">
                        {{ t('fieldSelectorNotResults') }}
                    </li>
                    <li
                        v-for="item in options"
                        v-else
                        :key="item.id"
                        class="hover:text-spartan-primary-600 rounded-lg hover:bg-gray-50 dark:hover:bg-white/10"
                    >
                        <button class="w-full px-4 py-2 text-left" @click="pickField(item.id)">
                            {{ item.label }}
                        </button>
                    </li>
                </ul>
            </div>

            <SelectFilterDialog v-else @close="refPopover?.close" />
        </FadeTransition>
    </SPopover>
</template>

<style scoped>
::-webkit-scrollbar {
    width: 4px;
}
::-webkit-scrollbar-track {
    background: #f1f1f1;
}
::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 16px;
}
::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
}
</style>
