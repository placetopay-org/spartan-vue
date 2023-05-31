import { SServerTable, SButton, SBadge } from "../index";

import { PencilSquareIcon, TrashIcon } from "@heroicons/vue/24/outline";

export default {
  title: "Components/SServerTable",
  component: SServerTable,
  argTypes: {},
};
const Template = (args) => ({
  components: {
    SServerTable,
    SButton,
    SBadge,
    PencilSquareIcon,
    TrashIcon,
  },
  setup() {
    const editRecord = (record) =>
      alert("Editing record:  " + record.first_name);
    const removeRecord = (record) =>
      alert("Removing record:  " + record.first_name);

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
      name: "id",
      label: "#",
      orderable: true,
    },
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
    },
  ],
  options: {
    search: {
      enable: true,
      delay: 500,
      value: "",
    },
    ordering: {
      by: "first_name",
      dir: "asc",
    },
    pagination: {
      perPage: 2,
      menu: [2, 3, 5],
    },
  },
  fetch: async (event) => {
    const data = [
      {
        id: 1,
        email: "george.bluth@reqres.in",
        first_name: "George",
        last_name: "Bluth",
        gender: "Male",
        avatar: "https://reqres.in/img/faces/1-image.jpg",
      },
      {
        id: 2,
        email: "janet.weaver@reqres.in",
        first_name: "Janet",
        last_name: "Weaver",
        gender: "Female",
        avatar: "https://reqres.in/img/faces/2-image.jpg",
      },
      {
        id: 3,
        email: "emma.wong@reqres.in",
        first_name: "Emma",
        last_name: "Wong",
        gender: "Female",
        avatar: "https://reqres.in/img/faces/3-image.jpg",
      },
      {
        id: 4,
        email: "eve.holt@reqres.in",
        first_name: "Eve",
        last_name: "Holt",
        gender: "Male",
        avatar: "https://reqres.in/img/faces/4-image.jpg",
      },
      {
        id: 5,
        email: "charles.morris@reqres.in",
        first_name: "Charles",
        last_name: "Morris",
        gender: "Male",
        avatar: "https://reqres.in/img/faces/5-image.jpg",
      },
      {
        id: 6,
        email: "tracey.ramos@reqres.in",
        first_name: "Tracey",
        last_name: "Ramos",
        gender: "Male",
        avatar: "https://reqres.in/img/faces/6-image.jpg",
      },
    ];

    const currentPage = event.pagination.currentPage ?? 1;
    const perPage = event.pagination.perPage ?? 10;

    const startDataIdx = (currentPage - 1) * perPage;
    const endDataIdx = startDataIdx + perPage;

    let responseFiltered = data;
    if (event.searchValue) {
      responseFiltered = data.filter((item) => {
        return (
          item.first_name
            .toLowerCase()
            .includes(event.searchValue.toLowerCase()) ||
          item.last_name.toLowerCase().includes(event.searchValue.toLowerCase()) ||
          item.email.toLowerCase().includes(event.searchValue.toLowerCase())
        );
      });
    }

    const response = responseFiltered.slice(startDataIdx, endDataIdx).sort((a, b) => {
      if (event.ordering.dir === "asc") {
        return a[event.ordering.by] > b[event.ordering.by] ? 1 : -1;
      } else {
        return a[event.ordering.by] < b[event.ordering.by] ? 1 : -1;
      }
    });

    return {
      records: response,
      totalRecords: responseFiltered.length,
    };
  },
};
