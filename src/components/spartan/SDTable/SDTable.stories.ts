import SDTable from './SDTable.vue';
import SDColumn from './SDColumn.vue';
import { rows as data } from '@/data/table';
import { DirectIcon } from '@placetopay/iconsax-vue/twotone'
import { buildSourceBinding, createDefault, createVariation } from '@/helpers';

export default {
    component: SDTable,
    title: 'tables/DTable',
    parameters: {
        docs: {
            description: {
                component: 'The component is a flexible and feature-rich table solution designed for dynamic data display. It provides capabilities such as customizable row content, sortable columns, and interactive rows with clickable links. Additionally, it supports custom headers and an option for a borderless layout, offering versatility and adaptability for a wide range of data presentation scenarios in professional environments.',
            },
        },
    },
    argTypes: {
        // Slots
        default: {
            control: 'text',
            table: { type: { summary: null }, category: 'Slots' },
            description: 'The content of the table.',
        },

        // Props
        borderless: {
            description: 'The type of the input element.',
            table: { type: { summary: 'boolean' } },
        },
    },
};

const sourceBinding = buildSourceBinding({
    check: ['borderless'],
    prop: {}
});

export const Default = createDefault({
    components: { SDTable, SDColumn },
    template: `
<SDTable v-bind="args">
    <SDColumn field="name" header="Nombre" />
    <SDColumn field="email" header="Correo" />
    <SDColumn field="title" header="Titulo" />
    <SDColumn field="role" header="Rol" />
</SDTable>`,
    args: {
        borderless: false,
        data: data.slice(0, 5),
    },
    transform: (args) => `<SDTable :data="data" ${sourceBinding(args)}>
    <SDColumn field="id" header="ID" />
    <SDColumn field="code" header="CÓDIGO" />
    <SDColumn field="name" header="NOMBRE" />
    <SDColumn field="category" header="CATEGORÍA" />
    <SDColumn field="quantity" header="CANTIDAD" />    
</SDTable>`,
})

const variationConfig = {
    components: { SDTable, SDColumn },
    setup: () => ({ data: data.slice(0, 5) }),
}

export const Base = createVariation({
    ...variationConfig,
    template: `
<SDTable :data="data">
    <SDColumn field="name" header="Nombre" />
    <SDColumn field="email" header="Correo" />
    <SDColumn field="title" header="Titulo" />
    <SDColumn field="role" header="Rol" />
</SDTable>`,
});

export const CustomRowCell = createVariation({
    ...variationConfig,
    template: `
<SDTable :data="data">
    <SDColumn field="name" header="Nombre" />
    <SDColumn field="email" header="Correo">
        <template #body="{ value }">
            <span class="text-blue-500">{{ value }}</span>
        </template>
    </SDColumn>
    <SDColumn field="title" header="Titulo" />
    <SDColumn field="role" header="Rol" />
</SDTable>`,
});

export const CustomHeadCell = createVariation({
    ...variationConfig,
    components: { SDTable, SDColumn, DirectIcon },
    template: `
<SDTable :data="data">
    <SDColumn field="name" header="Nombre" />
    <SDColumn field="email">
        <template #header>
            <div class="flex gap-2">
                <DirectIcon class="text-blue-500 w-5" />
                <span class="text-blue-500">Correo</span>
            </div>
        </template>
    </SDColumn>
    <SDColumn field="title" header="Titulo" />
    <SDColumn field="role" header="Rol" />
</SDTable>`,
});

export const RowLink = createVariation({
    ...variationConfig,
    template: `
<SDTable :data="data" :rowLink="(row) => row.email">
    <SDColumn field="name" header="Nombre" />
    <SDColumn field="email" header="Correo" />
    <SDColumn field="title" noLink header="Titulo" />
    <SDColumn field="role" header="Rol" />
</SDTable>`,
});

export const Sorting = createVariation({
    ...variationConfig,
    setup: () => ({ data: data.slice(0, 5), alert: (e: any) => alert(JSON.stringify(e)) }),
    template: `
<SDTable :data="data" @sort="alert">
    <SDColumn field="name" header="Nombre" sort="asc" />
    <SDColumn field="email" header="Correo" sort="des" />
    <SDColumn field="title" noLink header="Titulo" />
    <SDColumn field="role" header="Rol" />
</SDTable>`,
});

export const Borderless = createVariation({
    ...variationConfig,
    template: `
<SDTable :data="data" borderless>
    <SDColumn field="name" header="Nombre" />
    <SDColumn field="email" header="Correo" />
    <SDColumn field="title" noLink header="Titulo" />
    <SDColumn field="role" header="Rol" />
</SDTable>`,
});