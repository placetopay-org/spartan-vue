import {
  SDataTable,
  SButton,
  SBadge,
} from "../index";

import {PencilSquareIcon, TrashIcon} from "@heroicons/vue/24/outline";

export default {
  title: "Components/SDatatable",
  component: SDataTable,
  argTypes: {
  }
};
const Template = (args) => ({
  components: {
    SDataTable,
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
      <SDataTable :columns="args.columns" :options="args.options" :records="args.records" :total-records="args.records.length">
        <template #item(first_name)="{ value, record }">
          <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">{{ value }}</a>
        </template>

        <template #item(gender)="{ value, record }">
          <SBadge v-if="value === 'Male'" color="green">{{ value }}</SBadge>
          <SBadge v-else color="yellow">{{ value }}</SBadge>
        </template>

        <template #item(action)="{ value, record }">
          <SButton color="primary" @click="editRecord(record)">
            <PencilSquareIcon class="h-5 w-5 text-white" />
          </SButton>

          <SButton color="white" class="ml-2" @click="removeRecord(record)">
            <TrashIcon class="h-5 w-5 text-red-600" />
          </SButton>
        </template>
      </SDataTable>        
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
  records: [
    {
      id: 1,
      first_name: "Hube",
      last_name: "Slaight",
      email: "hslaight0@blogger.com",
      gender: "Male",
      ip_address: "166.161.160.185",
      phone: "721-240-4330"
    },
    {
      id: 2,
      first_name: "Inessa",
      last_name: "McIllroy",
      email: "imcillroy1@yellowbook.com",
      gender: "Female",
      ip_address: "137.98.246.227",
      phone: "586-549-4102"
    },
    {
      id: 3,
      first_name: "Erhard",
      last_name: "Brownsett",
      email: "ebrownsett2@cisco.com",
      gender: "Male",
      ip_address: "217.170.177.144",
      phone: "727-507-5815"
    },
    {
      id: 4,
      first_name: "Bekki",
      last_name: "Dury",
      email: "bdury3@instagram.com",
      gender: "Bigender",
      ip_address: "18.54.237.97",
      phone: "466-685-7574"
    },
    {
      id: 5,
      first_name: "Christal",
      last_name: "O'Kynsillaghe",
      email: "cokynsillaghe4@sphinn.com",
      gender: "Female",
      ip_address: "193.34.148.120",
      phone: "972-213-0853"
    },
    {
      id: 6,
      first_name: "Nadya",
      last_name: "Womersley",
      email: "nwomersley5@apple.com",
      gender: "Female",
      ip_address: "55.91.167.71",
      phone: "816-180-6638"
    },
    {
      id: 7,
      first_name: "Chanda",
      last_name: "Campbell-Dunlop",
      email: "ccampbelldunlop6@zimbio.com",
      gender: "Female",
      ip_address: "94.8.158.75",
      phone: "753-784-7015"
    },
    {
      id: 8,
      first_name: "Burton",
      last_name: "Celle",
      email: "bcelle7@google.it",
      gender: "Male",
      ip_address: "42.121.24.126",
      phone: "497-702-8879"
    },
    {
      id: 9,
      first_name: "Meriel",
      last_name: "Moreinu",
      email: "mmoreinu8@linkedin.com",
      gender: "Female",
      ip_address: "228.251.66.141",
      phone: "608-712-9321"
    },
    {
      id: 10,
      first_name: "Savina",
      last_name: "McDonnell",
      email: "smcdonnell9@vimeo.com",
      gender: "Female",
      ip_address: "223.233.84.98",
      phone: "858-464-0700"
    },
    {
      id: 11,
      first_name: "Elisabeth",
      last_name: "Du Fray",
      email: "edufraya@exblog.jp",
      gender: "Female",
      ip_address: "208.169.247.156",
      phone: "848-590-3941"
    },
    {
      id: 12,
      first_name: "Kessia",
      last_name: "Lewis",
      email: "klewisb@virginia.edu",
      gender: "Genderfluid",
      ip_address: "217.94.18.250",
      phone: "839-133-1216"
    },
    {
      id: 13,
      first_name: "Adrianna",
      last_name: "Enochsson",
      email: "aenochssonc@wisc.edu",
      gender: "Female",
      ip_address: "178.101.42.50",
      phone: "256-147-5093"
    },
    {
      id: 14,
      first_name: "Gage",
      last_name: "Bernaldo",
      email: "gbernaldod@amazon.co.jp",
      gender: "Male",
      ip_address: "182.187.150.243",
      phone: "267-993-4460"
    }
  ],
  options: {
    search: {
      enable: true,
      value: ''
    },
    ordering: {
      by: 'first_name',
      dir: 'asc'
    },
    pagination: {
      perPage: 10,
      menu: [10 , 20, 35, 50, 100]
    }
  }
};
