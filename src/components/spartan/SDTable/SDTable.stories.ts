import SDTable from './SDTable.vue';
import SDColumn from './SDColumn.vue';
import { rows as data } from '@/data/table';
import { DirectIcon } from '@placetopay/iconsax-vue/twotone'
import { buildSourceBinding, createDefault, createVariation } from '@/helpers';
import { ref } from 'vue';

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

export const CollapsibleRows = createVariation({
    ...variationConfig,
    template: `
<SDTable :data="data">
    <SDColumn field="name" header="Nombre" />
    <SDColumn field="email" header="Correo" />
    <SDColumn field="title" header="Titulo" />
    <SDColumn field="role" header="Rol" />
    <SDColumn expander />

    <template #expansion="{ row }">
        <div class="bg-yellow-500 text-white flex flex-col p-4 justify-center">
            <p class="font-bold">Any element!</p>
            <p><span class="font-bold">row.name:</span> {{ row.name }}</p>
        </div>
    </template>
</SDTable>`,
});

export const Sorting = createVariation({
    ...variationConfig,
    setup: () => ({ data: data.slice(0, 5), alert: (e: any) => alert(JSON.stringify(e)) }),
    template: `
<SDTable :data="data" @sort="alert">
    <SDColumn field="name" header="Nombre" sort="asc" />
    <SDColumn field="email" header="Correo" sort="des" />
    <SDColumn field="title" noLink header="Titulo" :sort="true" />
    <SDColumn field="role" header="Rol" :sort="false" />
</SDTable>`,
});

export const HandleSorting = createVariation({
    ...variationConfig,
    setup: () => {
        const nameSort = ref<string | boolean>('asc');
        const handle = (e: any): any => {
            switch(e.field) {
                case 'name':
                    if (e.sort === 'des') {
                        nameSort.value = 'asc';
                    }

                    if (e.sort === 'asc') {
                        nameSort.value = true;
                    }

                    if (e.sort === true) {
                        nameSort.value = 'des';
                    }
                    break;
            }
        };

        return { data: data.slice(0, 5), handle, nameSort };
    },
    template: `
<SDTable :data="data" @sort="handle">
    <SDColumn field="name" header="Nombre" :sort="nameSort" />
    <SDColumn field="email" header="Correo" sort="des" />
    <SDColumn field="title" noLink header="Titulo" :sort="true" />
    <SDColumn field="role" header="Rol" :sort="false" />
</SDTable>`,
});

export const Loading = createVariation({
    ...variationConfig,
    template: `
<SDTable :data="data" loading>
    <SDColumn field="name" header="Nombre" />
    <SDColumn field="email" header="Correo" />
    <SDColumn field="title" header="Titulo" />
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

export const Slim = createVariation({
    ...variationConfig,
    template: `
<SDTable :data="data" slim>
    <SDColumn field="name" header="Nombre" />
    <SDColumn field="email" header="Correo" />
    <SDColumn field="title" header="Titulo" />
    <SDColumn field="role" header="Rol" />
</SDTable>`,
});

export const UnstyledColumnBody = createVariation({
    ...variationConfig,
    template: `
<SDTable :data="data">
    <SDColumn field="name" header="Nombre" unstyled/>
    <SDColumn field="email" header="Correo" unstyled/>
    <SDColumn field="title" header="Titulo" unstyled/>
    <SDColumn field="role" header="Rol" unstyled/>
</SDTable>`,
});

export const Pagination = createVariation({
    components: { SDTable, SDColumn },
    setup: () => {
        const paginator = ref({ page: 1, size: 5, total: 15, pageSizes: [5, 10, 15] });
        const paginatorChange = (newState: any) => alert(JSON.stringify(newState));
        return { data: data.slice(0, 5), paginator, paginatorChange };
    },
    template: `<!-- paginator: { page: 1, size: 5, total: 15, pageSizes: [5, 10, 15] } -->
<SDTable :data="data" :paginator="paginator" @paginatorChange="paginatorChange">
    <SDColumn field="name" header="Nombre" />
    <SDColumn field="email" header="Correo" />
    <SDColumn field="title" noLink header="Titulo" />
    <SDColumn field="role" header="Rol" />
</SDTable>`,
});

export const HidePaginationWhenSinglePage = createVariation({
    components: { SDTable, SDColumn },
    setup: () => {
        const paginator = ref({ page: 1, size: 5, total: 5, pageSizes: [5, 10, 15], hideWhenSinglePage: true });
        return { data: data.slice(0, 5), paginator };
    },
    template: `<!-- paginator: { page: 1, size: 5, total: 5, pageSizes: [5, 10, 15], hideWhenSinglePage: true } -->
<SDTable :data="data" :paginator="paginator" @paginatorChange="newState => paginator = {...paginator, ...newState}">
    <SDColumn field="name" header="Nombre" />
    <SDColumn field="email" header="Correo" />
    <SDColumn field="title" noLink header="Titulo" />
    <SDColumn field="role" header="Rol" />
</SDTable>`,
});

export const Scroll = createVariation({
    components: { SDTable, SDColumn },
    setup: () => {
        const paginator = ref({ page: 1, size: 5, pageSizes: [5, 10, 15] });
        return { data: data.slice(0, 5).map(i => ({...i, email2: i.email, email3: i.email})), paginator };
    },
    template: `<!-- paginator: { page: 1, size: 5, pageSizes: [5, 10, 15] } -->
<div class="w-1/2">
    <SDTable :data="data" :paginator="paginator" @paginatorChange="newState => paginator = {...paginator, ...newState}">
        <SDColumn field="name" header="Nombre" />
        <SDColumn field="email" header="Correo" />
        <SDColumn field="email2" header="Correo" />
        <SDColumn field="email3" header="Correo" />
        <SDColumn field="title" noLink header="Titulo" />
        <SDColumn field="role" header="Rol" />
    </SDTable>
</div>`,
});

export const WithoutHeader = createVariation({
    ...variationConfig,
    template: `
<SDTable :data="data" pt:thead="hidden">
    <SDColumn field="name" header="Nombre" />
    <SDColumn field="email" header="Correo" />
    <SDColumn field="title" header="Titulo" />
    <SDColumn field="role" header="Rol" />
</SDTable>`,
});

export const CustomCellStyle = createVariation({
    ...variationConfig,
    template: `
<SDTable :data="data">
    <SDColumn field="name" header="Nombre"/>
    <SDColumn field="email" header="Correo" />
    <SDColumn unstyled field="title" header="Titulo">
        <template #body="{ value }">
            <div :class="['absolute inset-0', 'flex items-center', value[0] === 'F' ? 'bg-yellow-400' : 'bg-blue-400']">
                {{ value }}
            </div>
        </template>
    </SDColumn>
    <SDColumn field="role" header="Rol">
        <template #body="{ value }">
            <div class="py-4">
                {{ value }}
            </div>
        </template>
    </SDColumn>
</SDTable>`,
});