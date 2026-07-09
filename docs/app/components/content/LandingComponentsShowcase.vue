<script setup lang="ts">
import { computed, ref } from 'vue';

const route = useRoute();
const isEs = computed(() => route.path.startsWith('/es'));

const reference = ref('ORD-2048');
const accepted = ref(true);
const online = ref(true);

const labels = computed(() =>
    isEs.value
        ? {
              badgeReady: 'Listo',
              badgeLive: 'Producción',
              alertTitle: 'Flujo sincronizado',
              alertDescription: 'Estados, formularios y acciones usan componentes reales de Spartan.',
              reference: 'Referencia',
              review: 'Revisar',
              copy: 'Copiar',
              check: 'Guardar método',
              checkDescription: 'Usa SCheckbox con descripción y estado controlado.',
              switch: 'Autorizaciones activas',
              switchDescription: 'SSwitch refleja cambios de estado al instante.',
          }
        : {
              badgeReady: 'Ready',
              badgeLive: 'Production',
              alertTitle: 'Flow synced',
              alertDescription: 'States, forms, and actions use real Spartan components.',
              reference: 'Reference',
              review: 'Review',
              copy: 'Copy',
              check: 'Save method',
              checkDescription: 'Uses SCheckbox with description and controlled state.',
              switch: 'Authorizations active',
              switchDescription: 'SSwitch reflects state changes instantly.',
          },
);
</script>

<template>
    <div class="flex w-full flex-col gap-4 py-3">
        <div class="flex flex-wrap items-center gap-2">
            <SBadge color="green" dot pill>{{ labels.badgeReady }}</SBadge>
            <SBadge color="blue" outline pill>{{ labels.badgeLive }}</SBadge>
            <SBadge color="purple" pill>Vue 3</SBadge>
        </div>

        <SAlert color="info" variant="soft" :title="labels.alertTitle" :description="labels.alertDescription" />

        <div class="grid gap-3 md:grid-cols-[1fr_auto] md:items-end">
            <div>
                <SLabel for="landing-reference">{{ labels.reference }}</SLabel>
                <SInput id="landing-reference" v-model="reference" placeholder="ORD-2048" />
            </div>

            <div class="flex flex-wrap gap-2">
                <SButton size="md">{{ labels.review }}</SButton>
                <SButton size="md" outline>{{ labels.copy }}</SButton>
            </div>
        </div>

        <div class="grid gap-4 border-t border-gray-200 pt-4 md:grid-cols-2 dark:border-white/10">
            <SCheckbox v-model="accepted">
                <template #default>{{ labels.check }}</template>
                <template #description>{{ labels.checkDescription }}</template>
            </SCheckbox>

            <SSwitch v-model="online" icon>
                <template #default>{{ labels.switch }}</template>
                <template #description>{{ labels.switchDescription }}</template>
            </SSwitch>
        </div>
    </div>
</template>
