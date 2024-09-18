import SDTable from './SDTable.vue';
import SDColumn from './SDColumn.vue';
import { buildSourceBinding, createDefault } from '@/helpers';

export default {
    component: SDTable,
    title: 'tables/DTable',
    parameters: {
        docs: {
            description: {
                component: 'A table displays rows of data.',
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

const data = Array.from({ length: 5 }).map(() => ({
    id: '0',
    code: 'f230fh0g3',
    name: 'Bamboo Watch',
    description: 'Product Description',
    image: 'bamboo-watch.jpg',
    price: 65000,
    category: 'Accessories',
    quantity: 24,
    inventoryStatus: 'INSTOCK',
    rating: 5
}));

const sourceBinding = buildSourceBinding({
    check: ['borderless'],
    prop: {}
});

export const Default = createDefault({
    components: { SDTable, SDColumn },
    template: `
<SDTable v-bind="args">
    <SDColumn field="id" header="ID" />
    <SDColumn field="code" header="CÓDIGO" />
    <SDColumn field="name" header="NOMBRE" />
    <SDColumn field="category" header="CATEGORÍA" />
    <SDColumn field="quantity" header="CANTIDAD" />
</SDTable>`,
    args: {
        borderless: false,
        data,
    },
    transform: (args) => `<SDTable :data="data" ${sourceBinding(args)}>
    <SDColumn field="id" header="ID" />
    <SDColumn field="code" header="CÓDIGO" />
    <SDColumn field="name" header="NOMBRE" />
    <SDColumn field="category" header="CATEGORÍA" />
    <SDColumn field="quantity" header="CANTIDAD" />    
</SDTable>`,
})