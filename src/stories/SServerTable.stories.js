import {
  STableLayout,
  SServerTable,
  SButton,
  SBadge,
  SInput,
  SCard
} from "../index";

import MyServerTableFilter from "./MyServerTableFilter.vue";

export default {
  title: "Components/SServerTable",
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
  subcomponents: { SServerTable },
};
const Template = (args) => ({
  components: {
    STableLayout,
    SServerTable,
    SButton,
    SBadge,
    SInput,
    SCard,
    MyServerTableFilter
  },
  setup() {
    return { args };
  },
  template: `        
      <div>
        <MyServerTableFilter></MyServerTableFilter>

        <SServerTable ref="usersTable" :columns="args.columns" :config="args.config" url="http://spartan-mock.loc:2020/api/users">
  
          <template #item(first_name)="{ value, record }">
            <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">{{ value }}</a>
          </template>
  
          <template #item(gender)="{ value, record }">
            <SBadge v-if="value === 'Male'" color="green">{{ value }}</SBadge>
            <SBadge v-else color="yellow">{{ value }}</SBadge>
          </template>
  
          <template #item(action)="{ value, record }">
            <SButton>Edit</SButton>
          </template>
  
        </SServerTable>
      </div>    
  `,
});

export const Table = Template.bind({});

Table.args = {
  columns: [
    {
      name: "first_name",
      label: "First name",
      orderable: true,
    },
    {
      name: "last_name",
      label: "Last name",
      orderable: true,
    },
    {
      name: "email",
      label: "Email"
    },
    {
      name: "gender",
      label: "Gender",
    },
    {
      name: "action",
      label: "Action",
    }
  ],
  config: {
    search: {
      placeholder: 'Search... ',
      delay: 500,
    },
    ordering: {
      by: 'first_name',
      dir: 'asc'
    },
    pagination: {
      perPage: 10,
    }
  }
};
