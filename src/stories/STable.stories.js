import {
  STableLayout,
  STable,
  STableHead,
  STableHeadItem,
  STableBody,
  STableRow,
  STableRowItem,
  STablePagination,
} from "../index";
import {
  QrcodeIcon,
  DocumentDuplicateIcon,
  TrashIcon,
} from "@heroicons/vue/outline";

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
  subcomponents: { STablePagination },
};

const Template = (args) => ({
  components: {
    STableLayout,
    STable,
    STableHead,
    STableHeadItem,
    STableBody,
    STableRow,
    STableRowItem,
    STablePagination,
    QrcodeIcon,
    DocumentDuplicateIcon,
    TrashIcon,
  },
  setup() {
    return { args };
  },
  template: `
    <STableLayout>
        <STable>
            <STableHead>
                <STableHeadItem
                    v-for="column of args.columns"
                    :key="column"
                >
                  {{ column }}
                </STableHeadItem>
            </STableHead>
            <STableBody>
                <STableRow v-for="row in args.rows">
                    <STableRowItem :primary="true">
                        {{ row.name }}
                    </STableRowItem>
                    <STableRowItem>
                        {{ row.title }}
                    </STableRowItem>
                    <STableRowItem>
                        {{ row.email }}
                    </STableRowItem>
                    <STableRowItem>
                        {{ row.role }}
                    </STableRowItem>
                    <STableRowItem>
                        <QrcodeIcon class="mr-2.5 h-5 w-5"></QrcodeIcon>
                        <DocumentDuplicateIcon class="mr-2.5 h-5 w-5"></DocumentDuplicateIcon>
                        <TrashIcon class="mr-2.5 h-5 w-5 text-red-500"></TrashIcon>
                    </STableRowItem>
                </STableRow>
            </STableBody>
        </STable>
        <STablePagination
            :current-page="args.footer.currentPage"
            :last-page="args.footer.lastPage"
        >
        </STablePagination>
    </STableLayout>
  `,
});

export const Table = Template.bind({});

Table.args = {
  columns: ["Name", "Title", "Email", "Role", ""],
  rows: [
    {
      name: "Lindsay Walton",
      title: "Front-end Developer",
      email: "lindsay.walton@example.com",
      role: "Member",
    },
    {
      name: "Jhon Connor",
      title: "Back-end Developer",
      email: "jhon.connor@example.com",
      role: "Member",
    },
    {
      name: "Jhon Connor",
      title: "Back-end Developer",
      email: "jhon.connor@example.com",
      role: "Member",
    },
    {
      name: "Jhon Connor",
      title: "Back-end Developer",
      email: "jhon.connor@example.com",
      role: "Member",
    },
    {
      name: "Jhon Connor",
      title: "Back-end Developer",
      email: "jhon.connor@example.com",
      role: "Member",
    },
    {
      name: "Jhon Connor",
      title: "Back-end Developer",
      email: "jhon.connor@example.com",
      role: "Member",
    },
  ],
  footer: {
    info: "Mostrando 01 a 10 de 14 resultados",
    currentPage: 1,
    lastPage: 12,
  },
};