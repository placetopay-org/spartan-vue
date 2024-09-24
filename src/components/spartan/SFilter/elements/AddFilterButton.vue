<script setup lang="ts">
import { AddIcon } from '@placetopay/iconsax-vue/linear';
import { SPopover, SInput } from '../..';
import { useContext } from '../api';
import { computed, ref } from 'vue';
import { translator } from '@/helpers';
import { FadeTransition } from '@internal';
import SelectFilterDialog from './SelectFilterDialog.vue';

const { t } = translator('filter');

const context = useContext('AddFilterButton');

const popover = ref<InstanceType<typeof SPopover>>();

const query = ref('');

const options = computed(() => {
    const filteredOptions = context.fields?.filter((field) => (field.name.toLowerCase().includes(query.value.toLowerCase()) && !field.state));
    return filteredOptions?.map((field) => ({id: field.id, name: field.name}));
});

const selectFieldStep = ref(true);

const openPopover = () => {
    if (popover.value?.isOpen) popover.value?.close();
    else context.switchPopover(popover.value);
}

const selectField = (id: string) => {
    context.selectField(id);
    selectFieldStep.value = false;
}
</script>

<template>
    <SPopover ref="popover" :responsive="context.responsive" :offset="8" :prevent-close="!selectFieldStep" @close="selectFieldStep = true">
        <template #reference>
            <button @click="openPopover"
                class="group flex items-center gap-2 whitespace-nowrap rounded-full border border-dashed border-gray-400 px-3 py-0.5 text-sm text-gray-400 hover:border-gray-500 hover:text-gray-600 focus:s-ring"
            >
                <AddIcon class="h-5 w-5" />
                <span>{{ t('addFilterBtn') }}</span>
            </button>
        </template>

        <FadeTransition>
            <div v-if="selectFieldStep" class="flex max-h-96 min-w-[255px] flex-col overflow-y-auto rounded-lg bg-white shadow-2xl">
                <div class="px-4 pb-3 pt-4">
                    <SInput v-model="query" :placeholder="t('fieldSelectorPlaceholder')" />
                </div>
                <ul class="w-full">
                    <li v-if="!options" class="px-4 py-2 text-gray-400">
                        {{ t('fieldSelectorNotResults') }}
                    </li>
                    <li
                        v-else
                        v-for="item in options"
                        :key="item.id"
                        class="rounded-lg hover:bg-gray-50 hover:text-spartan-primary-600"
                    >
                        <button class="w-full px-4 py-2 text-left" @click="selectField(item.id)">
                            {{ item.name }}
                        </button>
                    </li>
                </ul>
            </div>

            <SelectFilterDialog v-else @close="popover?.close" />
        </FadeTransition>
    </SPopover>
</template>

<style scoped>
/* width */
::-webkit-scrollbar {
    width: 4px;
}

/* Track */
::-webkit-scrollbar-track {
    background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 16px;
}

::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
}
</style>