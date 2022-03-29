import { SFormLayout, SInput, SButton } from "../index";

export default {
    title: "Components/SFormLayout",
    component: SFormLayout,
};

const Template = (args) => ({
    components: { SFormLayout, SInput, SButton },
    setup() {
        return { args };
    },
    template: `
    <SFormLayout
        :max="args.max"
        :title="args.title"
        :description="args.description"
    >
        <template v-slot:col-1>
            <SInput
                v-for="input in args.col1"
                v-bind="{label: input.label}"></SInput>
        </template>
        <template v-slot:col-2>
            <SInput
                v-for="input in args.col2"
                v-bind="{label: input.label}"></SInput>
        </template>
        <SButton color="primary">{{ args.button.label }}</SButton>
    </SFormLayout>
  `,
});

export const FormMin = Template.bind({});

FormMin.args = {
    max: false,
    title: 'Personal Information',
    description: 'Use a permanent address where you can receive mail.',
    col1: [
        { label: 'Name' },
        { label: 'Email' },
        { label: 'Phone' },
        { label: 'Address' },
        { label: 'Country' },
        { label: 'Role' },
    ],
    button: {
        label: 'Send'
    }
};

export const FormMax = Template.bind({});

FormMax.args = {
    max: true,
    title: 'Personal Information',
    description: 'Use a permanent address where you can receive mail.',
    col1:
    [
        { label: 'Name' },
        { label: 'Email' },
        { label: 'Phone' },
    ],
    col2:
    [
        { label: 'Address' },
        { label: 'Country' },
        { label: 'Role' },
    ],
    button: {
        label: 'Send'
    }
};
