import CheckoutDemo from './CheckoutDemo.vue';
import { buildDesign } from '../../helpers';

export default {
    component: CheckoutDemo,
    title: 'examples/CheckoutDemo',
};

const design = buildDesign(
    'https://www.figma.com/file/B6y8dDM2ZwDiJTiOE48sYk/WebCheckout-4?type=design&node-id=13448-36364',
);

export const Default = {
    decorators: [() => ({ template: '<div style="width: 512px;"><story/></div>' })],
    render: (args: any) => ({
        components: { CheckoutDemo },
        setup() {
            return { args };
        },
        template: `<CheckoutDemo v-bind="args" v-model="args.modelValue"/>`,
    }),
    parameters: {
        design,
        docs: {
            canvas: { layout: 'centered' },
            source: {
                code: `<script setup lang="ts">
        import { ref } from 'vue';
        import { SDropdown, SDropdownItem, SButton, SRadioGroup, SRadioGroupItem, SSwitch } from '../../';
        import { ChevronDownIcon } from '@heroicons/vue/24/outline';
        
        const useCase = ref('payment');
        const allowPartialPayments = ref(false);
        const startARecurringPayment = ref(false);
        const allowSubscription = ref(false);
        const dispersion = ref(false);
        </script>
        
        <template>
          <div class="bg-white">
            <header class="flex items-center justify-between mb-8">
              <h1 class="text-xl font-semibold">Checkout Demo</h1>
              <SDropdown>
                <SButton variant="secondary" :icon="ChevronDownIcon" endIcon>ES</SButton>
        
                <template #items>
                  <SDropdownItem> Español </SDropdownItem>
                  <SDropdownItem> Inglés </SDropdownItem>
                  <SDropdownItem> Portugués </SDropdownItem>
                </template>
              </SDropdown>
            </header>
        
            <section>
              <h2 class="text-sm text-gray-700 mb-1">Casos de uso</h2>
              <SRadioGroup v-model="useCase" class="grid grid-cols-2 w-full gap-4">
                <SRadioGroupItem value="payment">
                  <template #title> Flujo de pagos </template>
                  <template #description> Para productos físicos o digitales </template>
                </SRadioGroupItem>
        
                <SRadioGroupItem value="subscription">
                  <template #title> Suscripción </template>
                  <template #description> Inscribir un medio de pago en un comercio </template>
                </SRadioGroupItem>
              </SRadioGroup>
            </section>
        
            <section class="mt-6 flex flex-col gap-6">
              <SSwitch v-model="allowPartialPayments" passive>
                <template #label> Permitir pagos parciales </template>
                <template #description> Permite al usuario completar el pago en varias transacciones. </template>
              </SSwitch>
        
              <SSwitch v-model="startARecurringPayment" passive>
                <template #label> Iniciar un pago recurrente </template>
                <template #description>
                  Además del pago principal, se iniciará un pago recurrente cada mes durante 3 meses.
                </template>
              </SSwitch>
        
              <SSwitch v-model="allowSubscription" passive>
                <template #label> Permitir suscripción </template>
                <template #description> Permite que el usuario guarde el medio de pago para compartirlo al comercio. </template>
              </SSwitch>
        
              <SSwitch v-model="dispersion" passive>
                <template #label> Dispersión </template>
                <template #description> Permite que el usuario guarde el medio de pago para compartirlo al comercio. </template>
              </SSwitch>
            </section>
        
            <section class="mt-10 flex gap-2">
              <SButton variant="primary"> Iniciar Checkout </SButton>
              <SButton variant="secondary"> Lightbox </SButton>
            </section>
          </div>
        </template>
        `,
                type: 'dynamic',
                language: 'html',
            },
        },
    },
    args: {
        modelValue: true,
    },
};
