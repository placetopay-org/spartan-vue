<script setup lang="ts">
import { computed } from 'vue';
import { useContext } from '../../api';
import { twMerge } from 'tailwind-merge';
import { cellStyles } from '../../styles';
import RowsSkeleton from '../RowsSkeleton.vue';
import { Wrapper } from '@internal';
import { SAccordion } from '@spartan';
import { ChevronDownIcon } from '@heroicons/vue/20/solid';

const context = useContext('TableBody');

const rowLink = computed(() => context.props.rowLink || (() => {}));
</script>

<template>
    <tbody class="-space-y-px divide-y divide-gray-200 bg-white">
        <template v-if="context.props.loading">
            <RowsSkeleton :cols="context.colsArray" :slim="context.config.slim" />
        </template>
        <template v-else>
            <template v-for="row in context.rows">
                <tr :class="rowLink(row.data) && 'hover:bg-gray-100'">
                    <td
                        v-for="col in context.colsArray"
                        :class="
                            twMerge(
                                cellStyles({
                                    slim: context.config.slim,
                                    unstyled: Boolean(
                                        col.unstyled || col.expander || (rowLink(row.data) && !col.noLink),
                                    ),
                                }),
                            )
                        "
                    >
                        <button
                            v-if="col.expander"
                            @click="row.isExpanded = !row.isExpanded"
                            class="group flex h-full w-full justify-center p-3.5"
                        >
                            <ChevronDownIcon
                                :class="[
                                    row.isExpanded && 'rotate-180',
                                    'h-6 w-6 transform text-gray-400 duration-75 group-hover:scale-110 group-hover:text-gray-600',
                                ]"
                            />
                        </button>

                        <Wrapper
                            v-else
                            :as="
                                Boolean(rowLink(row.data)) &&
                                !col.noLink &&
                                (context.props.rowLinkAs ? context.props.rowLinkAs : 'a')
                            "
                            :href="rowLink(row.data)"
                            :class="
                                twMerge(
                                    cellStyles({ slim: context.config.slim, unstyled: false }),
                                    'block h-full w-full',
                                )
                            "
                        >
                            <template v-if="col.slots?.body">
                                <component
                                    v-for="slot in col.slots.body({ row: row.data, value: row.data[col.field] })"
                                    :is="slot"
                                />
                            </template>

                            <template v-else>
                                {{ row.data[col.field] }}
                            </template>
                        </Wrapper>
                    </td>
                </tr>

                <tr class="border-none">
                    <td :colspan="context.colsArray.length" class="bg-gray-50 p-0">
                        <SAccordion :open="row.isExpanded" vertical>
                            <component v-for="slot in context.slots.expansion?.({ row: row.data })" :is="slot" />
                        </SAccordion>
                    </td>
                </tr>
            </template>
        </template>
    </tbody>
</template>
