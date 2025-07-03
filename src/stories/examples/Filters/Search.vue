<script setup lang="ts">
import { ref } from 'vue';
import { SDTable, SDColumn, SInput, SButton } from '../../..';
import { Refresh2Icon } from '@placetopay/iconsax-vue/outline';

const search = ref('');

const DATA = [
    { name: 'John Doe', role: 'admin', email: 'john.doe@example.com', identifier: '1234567890' },
    { name: 'Jane Doe', role: 'user', email: 'jane.doe@example.com', identifier: '1234567891' },
    { name: 'John Smith', role: 'admin', email: 'john.smith@example.com', identifier: '1234567892' },
    { name: 'Jane Smith', role: 'user', email: 'jane.smith@example.com', identifier: '1234567893' },
];

const filteredData = ref(DATA);

const searchData = () => {
    filteredData.value = DATA.filter((item) => {
        const searchTerm = search.value.toLowerCase();
        return (
            item.name.toLowerCase().includes(searchTerm) ||
            item.role.toLowerCase().includes(searchTerm) ||
            item.email.toLowerCase().includes(searchTerm) ||
            item.identifier.includes(searchTerm)
        );
    });
};

const clearSearch = () => {
    search.value = '';
    filteredData.value = DATA;
};
</script>

<template>
    <div class="bg-white">
        <section class="flex">
            <SInput v-model="search" rounded="left" placeholder="Search" />
            <SButton rounded="right" @click="searchData">Search</SButton>
            <SButton variant="outline" class="ml-2 group" @click="clearSearch">
                <Refresh2Icon class="w-4 h-4 group-hover:rotate-90 duration-150" />
            </SButton>
        </section>

        <SDTable v-if="filteredData.length > 0" class="mt-4" :data="filteredData">
            <SDColumn header="Name" field="name" />
            <SDColumn header="Role" field="role" />
            <SDColumn header="Email" field="email" />
            <SDColumn header="Identifier" field="identifier" />
        </SDTable>

        <div v-else class="mt-4 text-center text-gray-500">No data found</div>
    </div>
</template>
