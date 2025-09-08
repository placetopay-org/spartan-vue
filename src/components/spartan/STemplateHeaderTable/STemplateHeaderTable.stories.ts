import { ref } from 'vue';
import STemplateHeaderTable from './STemplateHeaderTable.vue';
import { buildSourceBinding, createDefault, createHistory } from '@/helpers';
import { SDTable, SDColumn } from '@spartan';

export default {
    component: STemplateHeaderTable,
    title: 'tables/STemplateHeaderTable',
    ...createHistory({
        description: 'The table with search component is used to search in a table.',
        props: [
            {
                name: 'title',
                type: 'string',
                default: 'undefined',
                description: 'The title of the table.',
            },
        ],
        slots: [{ name: 'default', description: 'The content of the link.' }],
    }),
};

const sourceBinding = buildSourceBinding({
    prop: { title: undefined },
});

export const Default = createDefault({
    components: { STemplateHeaderTable, SDTable, SDColumn },
    setup: () => {
        const data = ref([
            { name: 'John Doe', email: 'john.doe@example.com', title: 'Software Engineer', role: 'Developer' },
            { name: 'Jane Smith', email: 'jane.smith@example.com', title: 'Product Manager', role: 'Manager' },
            { name: 'Jim Beam', email: 'jim.beam@example.com', title: 'Designer', role: 'Designer' },
            { name: 'Jill Johnson', email: 'jill.johnson@example.com', title: 'Developer', role: 'Developer' },
            { name: 'Jack Martin', email: 'jack.martin@example.com', title: 'Product Manager', role: 'Manager' },
            { name: 'Dave Clark', email: 'dave.clark@example.com', title: 'Product Manager', role: 'Manager' },
            { name: 'Mike Doe', email: 'mike.doe@example.com', title: 'Product Manager', role: 'Manager' },
            { name: 'Tom Zimmer', email: 'tom.zimmer@example.com', title: 'Product Manager', role: 'Manager' },
        ]);

        const updateData = (query: string) => {
            data.value = data.value.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()));
        };

        return { data, updateData };
    },
    template: `
<STemplateHeaderTable v-bind="args" @search="updateData">
    <template #table>
        <SDTable :data="data">
            <SDColumn field="name" header="Nombre" />
            <SDColumn field="email" header="Correo" />
            <SDColumn field="title" header="Titulo" />
            <SDColumn field="role" header="Rol" />
        </SDTable>
    </template>
</STemplateHeaderTable>`,
    transform: (args) => `<STemplateHeaderTable ${sourceBinding(args)}>
    <template #table>
        <SDTable :data="data">
            <SDColumn field="name" header="Nombre" />
            <SDColumn field="email" header="Correo" />
            <SDColumn field="title" header="Titulo" />
            <SDColumn field="role" header="Rol" />
        </SDTable>
    </template>
</STemplateHeaderTable>`,
    args: {
        title: 'Table with Search',
    },
});
