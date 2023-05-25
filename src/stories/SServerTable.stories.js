import {
  SServerTable,
  SButton,
  SBadge,
} from "../index";

import {PencilSquareIcon, TrashIcon} from "@heroicons/vue/24/outline";
import axios from "axios";

export default {
  title: "Components/SServerTable",
  component: SServerTable,
  argTypes: {
  }
};
const Template = (args) => ({
  components: {
    SServerTable,
    SButton,
    SBadge,
    PencilSquareIcon,
    TrashIcon
  },
  setup() {
    const editRecord = (record) => alert('Editing record:  ' + record.first_name);
    const removeRecord = (record) => alert('Removing record:  ' + record.first_name);

    return { args, editRecord, removeRecord };
  },
  template: `
      <SServerTable :columns="args.columns" :options="args.options" :fetch="args.fetch">

        <template #item(first_name)="{ value, record }">
          <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">{{ value }}</a>
        </template>

        <template #item(action)="{ value, record }">
          <SButton color="primary" @click="editRecord(record)">
            <PencilSquareIcon class="h-5 w-5 text-white" />
          </SButton>

          <SButton color="white" class="ml-2" @click="removeRecord(record)">
            <TrashIcon class="h-5 w-5 text-red-600" />
          </SButton>
        </template>

      </SServerTable>      
  `,
});

export const Default = Template.bind({});

Default.args = {
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
      label: "Email",
      orderable: false,
    },
    {
      name: "gender",
      label: "Gender",
      orderable: false,
    },
    {
      name: "action",
      label: "Action",
      orderable: false,
    }
  ],
  options: {
    search: {
      enable: true,
      delay: 500,
      value: ''
    },
    ordering: {
      by: 'first_name',
      dir: 'asc'
    },
    pagination: {
      perPage: 10,
      menu: [10 , 20, 50, 100]
    }
  },
  fetch: async (event) => {
    let params = {
      limit: event.pagination.perPage,
      page: event.pagination.currentPage,
      order: {
        by: event.ordering.by,
        dir: event.ordering.dir,
      }
    };

    if (event.searchValue) {
      params.query = event.searchValue;
    }

    let response = await axios.request({
      method: 'get',
      url: process.env.STORYBOOK_MOCK_URL,
      params: params
    });

    return {
      records: response.data.data,
      totalRecords: response.data.total,
    };
  }
};
