<script setup lang="ts">
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/vue/20/solid';
import { Wrapper } from '@internal';
import { useContext } from '../../api';
import { computed, ref } from 'vue';
import { twMerge } from 'tailwind-merge';
import { cellStyles } from '../../styles';
import ExpanderButton from '../ExpanderButton.vue';

const { PtThead } = defineProps<{
    PtThead: any[];
}>();

const context = useContext('TableHead');

const [theadClass, theadProps] = PtThead;

const isAllExpanded = computed(() => context.rows.every((row) => row.isExpanded));
const toggleAllExpanders = () => {
    const newState = !isAllExpanded.value;
    context.rows.forEach((row) => (row.isExpanded = newState));
};
</script>

<template>
    <thead data-s-thead v-bind="theadProps" :class="twMerge('border-b border-gray-300 bg-gray-50', theadClass)">
        <th
            v-for="col in context.colsArray"
            scope="col"
            :class="twMerge(cellStyles({ head: true, unstyled: Boolean(col.expander) }))"
        >
            <ExpanderButton
                v-if="col.expander"
                :isAllExpanded="isAllExpanded"
                @toggleAllExpanders="toggleAllExpanders"
            />

            <component
                v-else
                :is="col.sort ? 'button' : 'div'"
                class="group flex w-fit"
                @click="col.sort && context.emit('sort', { field: col.field, sort: col.sort })"
            >
                <template v-if="col.slots?.header">
                    <component v-for="slot in col.slots.header()" :is="slot" />
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
                        v-if="col.sort"
                        :is="col.sort === 'asc' ? ChevronUpIcon : ChevronDownIcon"
                        :class="['h-5 w-5', typeof col.sort === 'boolean' && 'ml-2 opacity-0 group-hover:opacity-50']"
                    />
                </Wrapper>
            </component>
        </th>
    </thead>
</template>
