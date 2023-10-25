import { ref } from 'vue';
import SInputAmount from './SInputAmount.vue';
import { buildSourceBinding, createDefault, createVariation } from '@/helpers';

export default {
    component: SInputAmount,
    title: 'new/InputAmount',
    parameters: {
        docs: {
            description: {
                component: 'The link component is used to navigate between pages.',
            },
        },
    },
    argTypes: {
        // Props
        href: {
            control: 'text',
            description: 'The type of the input element.',
            table: { type: { summary: 'string' } },
        },
    },
};

const sourceBinding = buildSourceBinding({});

export const Default = createDefault({
    components: { SInputAmount },
    args: {
        currency: 'USD',
    },
    setup: () => {
        const value = ref(123);
        const currency = ref('USD');
        const locale = ref('es');

        return { value, currency, locale };
    },
    template: `
    <select v-model="locale">
        <option value="es">es</option>
        <option value="en">en</option>
    </select>
    <SInputAmount symbol :currencies="['USD', 'EUR', 'COP']" :locale="locale" v-model:currency="currency" v-model=value />
    `,
    transform: (args) => `<SInputAmount ${sourceBinding(args)}>${args.default}</SInputAmount>`,
});

export const Base = createVariation({
    components: { SInputAmount },
    setup: () => {
        const value = ref(123);
        const currency = ref('USD');

        return { value, currency };
    },
    template: `<!-- currency: USD -->
<SInputAmount v-model:currency="currency"/>`,
});

export const WithSuffix = createVariation({
    components: { SInputAmount },
    setup: () => {
        const value = ref(123);
        const currency = ref('USD');

        return { value, currency };
    },
    template: `<!-- currency: USD -->
<SInputAmount v-model:currency="currency" suffixCurrency />`,
});

export const WithSymbol = createVariation({
    components: { SInputAmount },
    setup: () => {
        const value = ref(123);
        const currency = ref('USD');

        return { value, currency };
    },
    template: `<!-- currency: USD -->
<SInputAmount v-model:currency="currency" symbol />`,
});

export const WithSelector = createVariation({
    components: { SInputAmount },
    setup: () => {
        const value = ref(123);
        const currency = ref('USD');

        return { value, currency };
    },
    template: `<!-- currency: USD -->
<SInputAmount v-model:currency="currency" symbol :currencies="['USD', 'EUR', 'JPY']" />`,
});
