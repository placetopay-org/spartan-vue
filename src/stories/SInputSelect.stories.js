import { SInputSelect } from "../index.js";

export default {
    title: "Components/SInputSelect",
    component: SInputSelect,
    argTypes: {},
    decorators: [
        () => ({ template: '<div class="max-w-xs border-none"><story /></div>' }),
    ],
};

const Template = (args) => ({
    components: { SInputSelect },
    setup() {
        return { args };
    },
    template: `
    <SInputSelect
        v-bind="args"
    >
      
    </SInputSelect>`,
});

const defaultArgs = {
    label: "Filtrar",
    items: [
        { id: 1, name: 'Wade Cooper' },
        { id: 2, name: 'Arlene Mccoy' },
        { id: 3, name: 'Devon Webb' },
        { id: 4, name: 'Label' },
        { id: 5, name: 'Tanya Fox' },
        { id: 6, name: 'Hellen Schmidt' },
        { id: 7, name: 'Caroline Schultz' },
        { id: 8, name: 'Mason Heaney' },
        { id: 9, name: 'Claudie Smitham' },
        { id: 10, name: 'Emil Schaefer' },
    ]
};

export const SelectInput = Template.bind({});
SelectInput.args = {
    ...defaultArgs,
};

export const DisabledInput = Template.bind({});
DisabledInput.args = {
    ...defaultArgs,
    disabled: true,
};