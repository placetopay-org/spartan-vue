<script setup lang="ts">
import { ref } from 'vue';
import { SFilter, SDTable, SDColumn, type TFilterProps, SInput, SButton } from '../../..';
import { Refresh2Icon, SearchNormalIcon, FilterEditIcon } from '@placetopay/iconsax-vue/outline';
import { ChevronDownIcon } from '@heroicons/vue/24/solid';
import EmptyBanner from './EmptyBanner.vue';

const $filter = ref<InstanceType<typeof SFilter>>();

const fields = ref<TFilterProps['fields']>([
    {
        id: 'name',
        name: 'Name',
        interfaces: { single: { operators: ['equal', 'notEqual', 'contains'] } },
    },
    {
        id: 'email',
        name: 'Email',
        interfaces: { single: { operators: ['equal', 'notEqual', 'contains'] } },
    },
    {
        id: 'identifier',
        name: 'Identifier',
        interfaces: { range: { operators: ['between', 'notBetween'] } },
    },
    {
        id: 'role',
        name: 'Role',
        interfaces: {
            options: {
                operators: ['equal', 'notEqual'],
                options: [
                    { id: 'admin', label: 'Admin' },
                    { id: 'user', label: 'User' },
                ],
            },
        },
    },
]);

const PAYLOAD = [
    { name: 'John Doe', role: 'admin', email: 'john.doe@example.com', identifier: '123' },
    { name: 'Jane Smith', role: 'user', email: 'jane.smith@example.com', identifier: '234' },
    { name: 'John Mey', role: 'user', email: 'john.mey@example.com', identifier: '345' },
    { name: 'Kevin Klaus', role: 'admin', email: 'kevin.klaus@example.com', identifier: '456' },
];

const data = ref(PAYLOAD);

// Estado para mantener los filtros activos
const activeFilters = ref<TFilterProps['fields']>([]);
const searchTerm = ref('');

const applyFilters = () => {
    let filteredData = [...PAYLOAD];

    // Aplicar filtros de SFilter
    if (activeFilters.value.length > 0) {
        filteredData = filteredData.filter((item) => {
            return activeFilters.value.every((field) => {
                if (field.state?.operator === 'equal') {
                    return String(item[field.id]).toLowerCase() === String(field.state?.value).toLowerCase();
                }

                if (field.state?.operator === 'notEqual') {
                    return String(item[field.id]).toLowerCase() !== String(field.state?.value).toLowerCase();
                }

                if (field.state?.operator === 'contains') {
                    return String(item[field.id]).toLowerCase().includes(String(field.state?.value).toLowerCase());
                }

                if (field.state?.operator === 'between') {
                    return (
                        Number(item[field.id]) >= Number(field.state?.value[0]) &&
                        Number(item[field.id]) <= Number(field.state?.value[1])
                    );
                }

                if (field.state?.operator === 'notBetween') {
                    return (
                        Number(item[field.id]) < Number(field.state?.value[0]) ||
                        Number(item[field.id]) > Number(field.state?.value[1])
                    );
                }

                return false;
            });
        });
    }

    // Aplicar búsqueda de texto
    if (searchTerm.value.trim()) {
        const searchLower = searchTerm.value.toLowerCase();
        filteredData = filteredData.filter((item) => {
            return (
                item.name.toLowerCase().includes(searchLower) ||
                item.role.toLowerCase().includes(searchLower) ||
                item.email.toLowerCase().includes(searchLower) ||
                item.identifier.includes(searchLower)
            );
        });
    }

    data.value = filteredData;
};

const apply = (fields: TFilterProps['fields']) => {
    activeFilters.value = fields;
    applyFilters();
};

const clearAllFilters = () => {
    searchTerm.value = '';
    activeFilters.value = [];
    data.value = PAYLOAD;
};
</script>

<template>
    <div class="bg-white space-y-4">
        <section class="flex justify-end items-center gap-3">
            <div class="flex -space-x-px">
                <SInput v-model="searchTerm" rounded="left" placeholder="Search" @keyup.enter="applyFilters" />
                <SButton rounded="right" :icon="SearchNormalIcon" variant="secondary" @click="applyFilters">Search</SButton>
            </div>
            
            <div class="flex -space-x-px">
                <SButton variant="secondary" rounded="left" class="group" @click="$filter?.add">
                    <FilterEditIcon class="w-4 h-4" />
                    <span>Filter</span>
                </SButton>
                <SButton variant="secondary" rounded="right" class="group" @click="clearAllFilters">
                    <ChevronDownIcon class="w-4 h-4" />
                </SButton>
            </div>
        </section>

        <SFilter ref="$filter" :fields @apply="apply" @clear="clearAllFilters" />

        <SDTable v-if="data.length > 0" :data>
            <SDColumn header="Name" field="name" />
            <SDColumn header="Role" field="role" />
            <SDColumn header="Email" field="email" />
            <SDColumn header="Identifier" field="identifier" />
        </SDTable>

        <EmptyBanner v-else />
    </div>
</template>
