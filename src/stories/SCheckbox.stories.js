import { SCheckbox } from "../index";

export default {
    title: "Components/SCheckbox",
    component: SCheckbox,
};


const Template = ( args ) => ({
    components: { SCheckbox },
    setup() {
        return { args };
    },
    template: `
        <SCheckbox
            :id="args.id"
            :label="args.label"
            :description="args.description"
            :leading="args.leading"
        >
        </SCheckbox>`,
});

export const Trailing = Template.bind({});

Trailing.args = {
    id: 'comments',
    label: 'Comment',
    description: 'Get notified when someones posts a comment on a posting.',
    leading: false,
}

export const Leading = Template.bind({});

Leading.args = {
    id: 'comments',
    label: 'Comment',
    description: 'Get notified when someones posts a comment on a posting.',
    leading: true,
}
