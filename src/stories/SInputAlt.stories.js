import {
  SDropdown,
  SDropdownButton,
  SDropdownItem,
  SInputAlt,
  SButtonInputRight,
  SButton,
} from "../index.js";
import { SearchIcon } from "@heroicons/vue/outline";

export default {
  title: "Components/SInputAlt",
  component: SInputAlt,
  decorators: [
    () => ({
      template: '<div class="max-w-md mx-auto border-none"><story /></div>',
    }),
  ],
};

const Template = (args) => ({
  components: {
    SDropdown,
    SInputAlt,
    SDropdownItem,
    SButtonInputRight,
    SButton,
    SDropdownButton,
  },
  setup() {
    return { args, SearchIcon };
  },
  template: `
  <SInputAlt>
    <template v-if="args.dropdown.enabled" #left>
      <SDropdown>
        <template v-slot>
          <SDropdownButton color="white" :flat-right="true">
            Options
          </SDropdownButton>
        </template>
        <template v-slot:menu-items>
          <SDropdownItem>Name</SDropdownItem>
          <SDropdownItem>Role</SDropdownItem>
          <SDropdownItem>Email</SDropdownItem>
        </template>
      </SDropdown>
    </template>

    <template v-if="args.button.enabled" #right>
      <SButton :icon="args.button.icon" color="primary" flat-left>
        {{ args.button.label }}
      </SButton>
    </template>
  </SInputAlt>
      `,
});

export const Default = Template.bind({});
Default.args = {
  dropdown: {
    enabled: false,
  },
  input: {
    placeholder: "John Doe",
    type: "text",
    id: "field_name",
    name: "field_name",
  },
  button: {
    enabled: false,
    label: "Search",
    icon: SearchIcon,
  },
};

export const WithButtonRight = Template.bind({});
WithButtonRight.args = {
  dropdown: {
    enabled: false,
  },
  input: {
    placeholder: "John Doe",
    type: "text",
    id: "field_name",
    name: "field_name",
  },
  button: {
    enabled: true,
    label: "Search",
    icon: SearchIcon,
  },
};

export const WithDropdownLeft = Template.bind({});
WithDropdownLeft.args = {
  dropdown: {
    enabled: true,
  },
  input: {
    placeholder: "John Doe",
    type: "text",
    id: "field_name",
    name: "field_name",
  },
  button: {
    icon: SearchIcon,
  },
};
