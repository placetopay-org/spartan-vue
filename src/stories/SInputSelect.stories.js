import { SInputSelect, SInputItem } from "../index.js";

export default {
    title: "Components/SInputSelect",
    component: SInputSelect,
    argTypes: {},
    decorators: [
        () => ({ template: '<div class="max-w-xs border-none"><story /></div>' }),
    ],
};

const Template = (args) => ({
    components: { SInputSelect, SInputItem },
    setup() {
        return { args };
    },
    template: `
    <SInputSelect
          :items="args.items"
          :label="'Filtrar'"
    >
      
    </SInputSelect>`,
});

const defaultArgs = {
    label: "Nombre",
    placeholder: "John Doe",
    type: "text",
    id: "field_name",
    name: "field_name",
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

export const TextInput = Template.bind({});
TextInput.args = {
    ...defaultArgs,
};

export const EmailInput = Template.bind({});
EmailInput.args = {
    ...defaultArgs,
    label: "Correo electrónico",
    placeholder: "jhon@example.com",
    type: "email",
};

export const DisabledInput = Template.bind({});
DisabledInput.args = {
    ...defaultArgs,
    disabled: true,
};
