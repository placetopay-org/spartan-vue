<script setup lang="ts">
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/vue/20/solid';
import { Wrapper } from '@internal';
import { useContext } from '../../api';
import { computed } from 'vue';
import { twMerge } from 'tailwind-merge';
import { cellStyles } from '../../styles';
import ExpanderButton from '../ExpanderButton.vue';

const { ptThead } = defineProps<{
    ptThead: any[];
}>();

const context = useContext('TableHead');

const [theadClass, theadProps] = ptThead;

const isAllExpanded = computed(() => context.rows.every((row) => row.isExpanded));
const toggleAllExpanders = () => {
    const newState = !isAllExpanded.value;
    context.rows.forEach((row) => (row.isExpanded = newState));
};
</script>

<template>
    <thead data-s-thead v-bind="theadProps" :class="twMerge('border-b border-gray-300 bg-gray-50', theadClass)">
        <th
            v-for="col in context.colsArray.sort((a, b) => a.pos - b.pos)"
            :key="col.field"
            scope="col"
            :class="twMerge(cellStyles({ head: true, unstyled: Boolean(col.expander) }))"
        >
            <ExpanderButton
                v-if="col.expander"
                :is-all-expanded="isAllExpanded"
                @toggle-all-expanders="toggleAllExpanders"
            />

            <component
                :is="col.sort ? 'button' : 'div'"
                v-else
                class="group flex w-fit"
                @click="col.sort && context.emit('sort', { field: col.field, sort: col.sort })"
            >
                <template v-if="col.slots?.header">
                    <component :is="slot" v-for="(slot, slotIndex) in col.slots.header()" :key="slotIndex" />
                </template>

                <template v-else>
                    {{ col.header || '' }}
                </template>

                <Wrapper
                    :as="typeof col.sort === 'string' && 'span'"
                    :class="
                        typeof col.sort === 'string' &&
                        'ml-2 flex-none rounded bg-gray-200 text-gray-900 group-hover:bg-gray-300'
                    "
                >
                    <component
                        :is="col.sort === 'asc' ? ChevronUpIcon : ChevronDownIcon"
                        v-if="col.sort"
                        :class="['h-5 w-5', typeof col.sort === 'boolean' && 'ml-2 opacity-0 group-hover:opacity-50']"
                    />
                </Wrapper>
            </component>
        </th>
    </thead>
</template>
