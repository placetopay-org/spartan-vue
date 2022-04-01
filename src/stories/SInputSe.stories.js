import {
  SInputSearch,
  SDropdown,
  SDropdownMenu,
  SDropdownMenuSection,
  SDropdownMenuItem,
  SInput2,
  SButtonInputRight,
} from "../index.js";
import { SearchIcon } from "@heroicons/vue/outline";

export default {
  title: "Components/SInput2",
  component: SInput2,
  decorators: [
    () => ({ template: '<div class="max-w-md border-none"><story /></div>' }),
  ],
};

const Template = (args) => ({
  components: {
    SInputSearch,
    SDropdown,
    SInput2,
    SDropdownMenu,
    SDropdownMenuSection,
    SDropdownMenuItem,
    SButtonInputRight,
  },
  setup() {
    return { args, SearchIcon };
  },
  template: `
  <SInput2>
    <template v-if="args.dropdown.enabled" #left>
      <SDropdown>
        <SDropdownMenu>
          <SDropdownMenuSection>
            <SDropdownMenuItem>Name</SDropdownMenuItem>
            <SDropdownMenuItem>Role</SDropdownMenuItem>
            <SDropdownMenuItem>Email</SDropdownMenuItem>
          </SDropdownMenuSection>
        </SDropdownMenu>
      </SDropdown>
    </template>

    <template v-if="args.button.enabled" #right>
      <SButtonInputRight :icon="args.button.icon">
        {{ args.button.label }}
      </SButtonInputRight>
    </template>
  </SInput2>
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
