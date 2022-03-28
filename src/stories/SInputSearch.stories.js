import { SInputSearch } from "../index.js";
import { SearchIcon } from '@heroicons/vue/outline'

export default {
    title: "Components/SInputSearch",
    component: SInputSearch,
};

const Template = (args) => ({
    components: { SInputSearch },
    setup() {
        return { args, SearchIcon };
    },
    template: `
      <SInputSearch
          :drop="args.enabled"
          :drop-label="args.dropLabel"
          :input-args="args.input"
          :btn-icon="args.button.icon"
          :btn-label="args.button.label"
      ></SInputSearch>
      `,
});

export const Primary = Template.bind({});
Primary.args = {
    enabled: false,
    input: {
        placeholder: "John Doe",
        type: "text",
        id: "field_name",
        name: "field_name",
    },
    button: {
        label: 'Search',
        icon: SearchIcon
    }
};

export const PrimaryWithDropdown = Template.bind({});
PrimaryWithDropdown.args = {
    enabled: true,
    dropLabel: 'Options',
    input: {
        placeholder: "John Doe",
        type: "text",
        id: "field_name",
        name: "field_name",
    },
    button: {
        label: 'Search',
        icon: SearchIcon
    }
};