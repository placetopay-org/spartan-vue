<script setup lang="ts">
import { ref, computed, watch } from 'vue';

const countries = [
    { code: 'CO', name: 'Colombia' },
    { code: 'MX', name: 'México' },
];

const departmentsByCountry: Record<string, { code: string; name: string }[]> = {
    CO: [
        { code: 'ANT', name: 'Antioquia' },
        { code: 'CUN', name: 'Cundinamarca' },
        { code: 'VAL', name: 'Valle del Cauca' },
    ],
    MX: [
        { code: 'CMX', name: 'Ciudad de México' },
        { code: 'JAL', name: 'Jalisco' },
        { code: 'NLE', name: 'Nuevo León' },
    ],
};

const citiesByDepartment: Record<string, { code: string; name: string }[]> = {
    ANT: [
        { code: 'MDE', name: 'Medellín' },
        { code: 'ENV', name: 'Envigado' },
    ],
    CUN: [
        { code: 'BOG', name: 'Bogotá' },
        { code: 'CHA', name: 'Chía' },
    ],
    VAL: [
        { code: 'CAL', name: 'Cali' },
        { code: 'PAL', name: 'Palmira' },
    ],
    CMX: [
        { code: 'CUA', name: 'Cuauhtémoc' },
        { code: 'BJU', name: 'Benito Juárez' },
    ],
    JAL: [
        { code: 'GDL', name: 'Guadalajara' },
        { code: 'ZAP', name: 'Zapopan' },
    ],
    NLE: [
        { code: 'MTY', name: 'Monterrey' },
        { code: 'SPG', name: 'San Pedro Garza García' },
    ],
};

const country = ref<string | undefined>();
const department = ref<string | undefined>();
const city = ref<string | undefined>();

const departments = computed(() => (country.value ? (departmentsByCountry[country.value] ?? []) : []));
const cities = computed(() => (department.value ? (citiesByDepartment[department.value] ?? []) : []));

watch(country, () => {
    department.value = undefined;
    city.value = undefined;
});
watch(department, () => {
    city.value = undefined;
});
</script>

<template>
    <div class="w-full max-w-md space-y-3">
        <div>
            <SLabel for="country">País</SLabel>
            <SSelector
                id="country"
                v-model="country"
                :options="countries"
                option-label="name"
                option-value="code"
                placeholder="Selecciona un país"
            />
        </div>
        <div>
            <SLabel for="department">Departamento / Estado</SLabel>
            <SSelector
                id="department"
                v-model="department"
                :options="departments"
                option-label="name"
                option-value="code"
                placeholder="Selecciona un departamento"
                :disabled="!country"
            />
        </div>
        <div>
            <SLabel for="city">Ciudad</SLabel>
            <SSelector
                id="city"
                v-model="city"
                :options="cities"
                option-label="name"
                option-value="code"
                placeholder="Selecciona una ciudad"
                :disabled="!department"
            />
        </div>
    </div>
</template>
