<script setup lang="ts">
import { SAccordion, SPaginator } from '@spartan';
import { Wrapper } from '@internal';
import { twMerge } from 'tailwind-merge';
import { createContext } from './api';
import { cellStyles, tableStyles } from './styles';
import { ChevronUpIcon, ChevronDownIcon, ChevronDoubleDownIcon } from '@heroicons/vue/20/solid';
import type { TDColumnProps, TDTableProps, TDTableEmits } from './types';
import { usePassthrough } from '@/helpers';
import { computed, ref } from 'vue';

const emit = defineEmits<TDTableEmits>();
const props = defineProps<TDTableProps>();
const { rowLink = () => {} } = props;

const context = createContext(props);

const { pt, extractor } = usePassthrough();

const [tableClass, tableProps] = extractor(pt.value.table);
const [theadClass, theadProps] = extractor(pt.value.thead);
const [paginatorClass, paginatorProps] = extractor(pt.value.paginator);

const rows = computed(() => [...props.data]);

const count = computed(
    () =>
        props.paginator?.count ||
        (props.paginator?.total && props.paginator?.size && Math.ceil(props.paginator.total / props.paginator.size)),
);

const sort = ({ field, sort }: TDColumnProps) => {
    if (!sort) return;

    emit('sort', { field, sort });
};

const expIsOpen = ref(false);
const toggleExpIsOpen = () => {
    expIsOpen.value = !expIsOpen.value;
    rows.value.forEach((row) => (row.expIsOpen = expIsOpen.value));
}
</script>

<template>
    <div :class="twMerge(tableStyles({ borderless }), $props.class)">
        <div class="overflow-auto">
            <table data-s-table v-bind="tableProps" :class="twMerge('w-full', tableClass)">
                <slot />
                <thead
                    data-s-thead
                    v-bind="theadProps"
                    :class="twMerge('border-b border-gray-300 bg-gray-50', theadClass)"
                >
                    <th
                        v-for="col in context.colsArray"
                        scope="col"
                        :class="twMerge(cellStyles({ head: true, unstyled: Boolean(col.expander) }))"
                    >
                        <button
                            v-if="col.expander"
                            @click="toggleExpIsOpen"
                            class="group flex h-full w-full justify-center p-3.5"
                        >
                            <ChevronDoubleDownIcon
                                :class="[expIsOpen && 'rotate-180', 'transform h-6 w-6 text-gray-400 duration-75 group-hover:scale-110 group-hover:text-gray-600']"
                            />
                        </button>

                        <Wrapper v-else :as="col.sort ? 'button' : 'div'" @click="sort(col)" class="group flex w-fit">
                            <template v-if="col.slots?.header">
                                <component v-for="slot in col.slots.header()" :is="slot" />
                            </template>

                            <template v-else>
                                {{ col.header || '' }}
                            </template>

                            <Wrapper :as="typeof col.sort === 'string' && 'span'" :class="typeof col.sort === 'string' && 'ml-2 flex-none rounded bg-gray-200 text-gray-900 group-hover:bg-gray-300'">
                                <component
                                    v-if="col.sort"
                                    :is="col.sort === 'asc' ? ChevronUpIcon : ChevronDownIcon"
                                    :class="['h-5 w-5', typeof col.sort === 'boolean' && 'ml-2 opacity-0 group-hover:opacity-50']"
                                />
                            </Wrapper>
                        </Wrapper>
                    </th>
                </thead>

                <tbody class="divide-y divide-gray-200 bg-white -space-y-px">
                    <template v-for="row in rows">
                        <tr :class="rowLink(row) && 'hover:bg-gray-100'">
                            <td
                                v-for="col in context.colsArray"
                                :class="
                                    twMerge(
                                        cellStyles({
                                            slim: context.config.slim,
                                            unstyled: Boolean(
                                                col.unstyled || col.expander || (rowLink(row) && !col.noLink),
                                            ),
                                        }),
                                    )
                                "
                            >
                                <button
                                    v-if="col.expander"
                                    @click="row.expIsOpen = !row.expIsOpen"
                                    class="group flex h-full w-full justify-center p-3.5"
                                >
                                    <ChevronDownIcon
                                        :class="[row.expIsOpen && 'rotate-180', 'transform h-6 w-6 text-gray-400 duration-75 group-hover:scale-110 group-hover:text-gray-600']"
                                    />
                                </button>

                                <Wrapper
                                    v-else
                                    :as="Boolean(rowLink(row)) && !col.noLink && 'a'"
                                    :href="rowLink(row)"
                                    :class="twMerge(cellStyles({ unstyled: false }), 'block h-full w-full')"
                                >
                                    <template v-if="col.slots?.body">
                                        <component
                                            v-for="slot in col.slots.body({ row, value: row[col.field] })"
                                            :is="slot"
                                        />
                                    </template>

                                    <template v-else>
                                        {{ row[col.field] }}
                                    </template>
                                </Wrapper>
                            </td>
                        </tr>

                        <tr class="border-none">
                            <td :colspan="context.colsArray.length" class="bg-gray-50 p-0">
                                <SAccordion
                                    :open="row.expIsOpen"
                                    vertical
                                >
                                    <slot name="expansion" v-bind="{ row }" />
                                </SAccordion>
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>

        <template v-if="props.paginator">
            <section
                data-s-paginator
                v-if="!props.paginator.hideWhenSinglePage || (count && count > 1)"
                v-bind="paginatorProps"
                :class="twMerge('overflow-auto border-t border-gray-300 bg-gray-50 p-[14px]', paginatorClass)"
            >
                <SPaginator
                    :class="props.paginator.pageSizes ? '' : 'justify-end'"
                    v-bind="props.paginator"
                    @change="(newState) => $emit('paginatorChange', newState)"
                />
            </section>
        </template>
    </div>
</template>
