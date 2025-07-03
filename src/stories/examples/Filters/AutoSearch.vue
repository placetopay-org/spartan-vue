<script setup lang="ts">
import { computed, ref } from 'vue';
import { SDTable, SDColumn, SInput, SButton } from '../../..';
import { Eraser1Icon } from '@placetopay/iconsax-vue/outline';

const search = ref('');

const data = computed(() => {
    const data = [
        { name: 'John Doe', role: 'admin', email: 'john.doe@example.com', identifier: '1234567890' },
        { name: 'Jane Doe', role: 'user', email: 'jane.doe@example.com', identifier: '1234567891' },
        { name: 'John Smith', role: 'admin', email: 'john.smith@example.com', identifier: '1234567892' },
        { name: 'Jane Smith', role: 'user', email: 'jane.smith@example.com', identifier: '1234567893' },
    ];

    if (search.value) {
        return data.filter((item) => {
            const searchTerm = search.value.toLowerCase();
            return (
                item.name.toLowerCase().includes(searchTerm) ||
                item.role.toLowerCase().includes(searchTerm) ||
                item.email.toLowerCase().includes(searchTerm) ||
                item.identifier.includes(searchTerm)
            );
        });
    }

    return data;
});

const clearSearch = () => {
    search.value = '';
};
</script>

<template>
    <div class="bg-white">
        <section class="flex">
            <SInput v-model="search" placeholder="Search" />

            <SButton variant="outline" class="ml-2 group" @click="clearSearch">
                <Eraser1Icon class="w-4 h-4 group-hover:rotate-90 duration-150" />
            </SButton>
        </section>

        <SDTable class="mt-4" :data>
            <SDColumn header="Name" field="name" />
            <SDColumn header="Role" field="role" />
            <SDColumn header="Email" field="email" />
            <SDColumn header="Identifier" field="identifier" />
        </SDTable>
    </div>
</template>
