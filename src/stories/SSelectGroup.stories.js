import { ref } from 'vue';
import { SSelectGroup } from '../index.ts';

export default {
    title: 'Components/SSelectGroup',
    component: SSelectGroup,
    argTypes: {},
    decorators: [
        () => ({
            template: '<div class="max-w-md mx-auto border-none"><story /></div>',
        }),
    ],
};

const Template = (args) => ({
    components: { SSelectGroup },
    setup() {
        const model = ref('');
        return { args, model };
    },
    template: `
    <SSelectGroup v-bind="args" v-model="model"></SSelectGroup>
  `,
});

const defaultArgs = {
    label: 'Medio de pago',
    id: 'payment_method',
    name: 'payment_method',
    placeholder: 'Seleccione un tipo de documento',
    options: [
        {
            label: 'Colombia',
            options: [
                { value: 'cc', label: 'Cedula de ciudadania' },
                { value: 'ce', label: 'Cedula de extranjeria' },
            ],
        },
        {
            label: 'Chile',
            options: [{ value: 'rut', label: 'RUT' }],
        },
    ],
    model: null,
};

export const Select = Template.bind({});
Select.args = {
    ...defaultArgs,
};
