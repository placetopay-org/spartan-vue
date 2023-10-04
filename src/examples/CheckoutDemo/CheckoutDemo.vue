<script setup lang="ts">
import { ref } from 'vue';
import { SSelect, SButton, SRadioGroup, SRadioGroupItem, SSwitch } from '../../';

const lang = ref('es');
const useCase = ref('payment');
const allowPartialPayments = ref(false);
const startARecurringPayment = ref(false);
const allowSubscription = ref(false);
const dispersion = ref(false);
</script>

<template>
    <div class="bg-white">
        <header class="mb-8 flex items-center justify-between">
            <h1 class="text-xl font-semibold">Checkout Demo</h1>
            <div class="w-18">
                <SSelect v-model="lang">
                    <option value="es">ES</option>
                    <option value="en">EN</option>
                    <option value="it">IT</option>
                    <option value="pt">PT</option>
                </SSelect>
            </div>
        </header>

        <section>
            <h2 class="mb-1 text-sm text-gray-700">Casos de uso</h2>
            <SRadioGroup v-model="useCase" class="grid w-full grid-cols-2 gap-4">
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
            <SSwitch v-model="allowPartialPayments" passive reverse>
                <template #label> Permitir pagos parciales </template>
                <template #description> Permite al usuario completar el pago en varias transacciones. </template>
            </SSwitch>

            <SSwitch v-model="startARecurringPayment" passive reverse>
                <template #label> Iniciar un pago recurrente </template>
                <template #description>
                    Además del pago principal, se iniciará un pago recurrente cada mes durante 3 meses.
                </template>
            </SSwitch>

            <SSwitch v-model="allowSubscription" passive reverse>
                <template #label> Permitir suscripción </template>
                <template #description>
                    Permite que el usuario guarde el medio de pago para compartirlo al comercio.
                </template>
            </SSwitch>

            <SSwitch v-model="dispersion" passive reverse>
                <template #label> Dispersión </template>
                <template #description>
                    Permite que el usuario guarde el medio de pago para compartirlo al comercio.
                </template>
            </SSwitch>
        </section>

        <section class="mt-10 flex gap-2">
            <SButton variant="primary"> Iniciar Checkout </SButton>
            <SButton variant="secondary"> Lightbox </SButton>
        </section>
    </div>
</template>
