import { STableLayout, STable, STableHeader, STableHeaderItem, STableContent, STableContentItem, STableContentItemAttr, STableFooter, STablePagination } from "../index";
import { QrcodeIcon, DocumentDuplicateIcon, TrashIcon } from '@heroicons/vue/outline'

export default {
    title: "Components/STable",
    component: STableLayout,
    args: {
        currentPage: "1",
        default: "1",
    },
    argTypes: {
        currentPage: {
            control: { type: "number" },
        },
        default: {
            control: { type: "text" },
        },
    },
    subcomponents: { STablePagination }
};

const Template = ( args ) => ({
    components: { STableLayout, STable, STableHeader, STableHeaderItem, STableContent, STableContentItem, STableContentItemAttr, STableFooter, STablePagination, QrcodeIcon, DocumentDuplicateIcon, TrashIcon },
    setup() {
        return { args };
    },
    template: `
    <STableLayout>
        <STable>
            <STableHeader>
                <STableHeaderItem
                    v-for="column of args.columns"
                    :key="column"
                >
                  {{ column }}
                </STableHeaderItem>
            </STableHeader>
            <STableContent>
                <STableContentItem
                    v-for="row in args.rows"
                >
                    <STableContentItemAttr
                        v-for="item in row"
                        :key="item"
                    >
                        {{ item }}
                    </STableContentItemAttr>
                    <STableContentItemAttr>
                        <QrcodeIcon class="mr-2.5 h-5 w-5"></QrcodeIcon>
                        <DocumentDuplicateIcon class="mr-2.5 h-5 w-5"></DocumentDuplicateIcon>
                        <TrashIcon class="mr-2.5 h-5 w-5 text-red-500"></TrashIcon>
                    </STableContentItemAttr>
                </STableContentItem>
            </STableContent>
        </STable>
        <STableFooter :info="args.footer.info">
            <STablePagination
                :current-page="args.footer.currentPage"
                :last-page="args.footer.lastPage"
            >
            </STablePagination>
        </STableFooter>
    </STableLayout>
  `,
});

export const Table = Template.bind({});

Table.args = {
    columns: [ 'Name', 'Title', 'Email', 'Role', 'Actions'],
    rows : [
        { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
        { name: 'Jhon Connor', title: 'Back-end Developer', email: 'jhon.connor@example.com', role: 'Member' },
    ],
    footer: {
        info: 'Mostrando 01 a 10 de 14 resultados',
        currentPage: 1,
        lastPage: 12,
    }
}