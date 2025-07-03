<script setup lang="ts">
import { ref } from 'vue';
import { SFilter, SDTable, SDColumn, type TFilterProps } from '../../..';
import EmptyBanner from './EmptyBanner.vue';

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

const apply = (fields: TFilterProps['fields']) => {
    data.value = PAYLOAD.filter((item) => {
        return fields.every((field) => {
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
};
</script>

<template>
    <div class="bg-white">
        <SFilter :fields @apply="apply" />

        <SDTable v-if="data.length > 0" class="mt-4" :data>
            <SDColumn header="Name" field="name" />
            <SDColumn header="Role" field="role" />
            <SDColumn header="Email" field="email" />
            <SDColumn header="Identifier" field="identifier" />
        </SDTable>

        <EmptyBanner v-else />
    </div>
</template>
