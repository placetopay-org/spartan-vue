import { SBadge } from "../index.js";

export default {
    title: "Components/SBadge",
    component: SBadge,
};

const Template = (args) => ({
    components: { SBadge },
    setup() {
        return { args };
    },
    template: `<SBadge v-bind="args">{{ args.label }}</SBadge>`,
});

export const Badge = Template.bind({});

Badge.args = {
    size: 'sm',
    color: 'green',
    label: 'Badge',
};

export const BadgeMedium = Template.bind({});

BadgeMedium.args = {
    size: 'md',
    color: 'red',
    label: 'Badge',
};

export const BadgeLarge = Template.bind({});

BadgeLarge.args = {
    size: 'lg',
    color: 'gray',
    label: '12',
};