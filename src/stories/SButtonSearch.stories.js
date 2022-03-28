import { SButtonSearch } from "../index.js";
import { SearchIcon } from '@heroicons/vue/outline'

export default {
    title: "Components/SInputSearch",
    component: SButtonSearch,
    args: {
        color: "primary",
    },
    argTypes: {
        color: {
            control: { type: "select" },
            options: ["primary", "white"],
        },
    },
};

const Template = (args) => ({
    components: { SButtonSearch },
    setup() {
        return { args, SearchIcon };
    },
    template: `
        <SButtonSearch
            :color="args.color"
            :icon="args.icon"
        >
        {{ args.label }}
        </SButtonSearch>
    `,
});

export const Primary = Template.bind({});
Primary.args = {
    color: "primary",
    label: "Search",
};

export const PrimaryWithIcon = Template.bind({});
PrimaryWithIcon.args = {
    color: "primary",
    icon: SearchIcon,
    label: "Search",
};

export const PrimaryIcon = Template.bind({});
PrimaryIcon.args = {
    color: "primary",
    icon: SearchIcon,
};

export const White = Template.bind({});
White.args = {
    color: "white",
    icon: SearchIcon,
    label: "Search",
};

export const WhiteWithIcon = Template.bind({});
WhiteWithIcon.args = {
    color: "white",
    icon: SearchIcon,
    label: "Search",
};


export const WhiteIcon = Template.bind({});
WhiteIcon.args = {
    color: "white",
    icon: SearchIcon,
};