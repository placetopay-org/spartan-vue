<script setup lang="ts">
import { ref, computed } from 'vue';

const from = ref<Date | null>(null);
const to = ref<Date | null>(null);

const hasInvalidRange = computed(() => {
    if (!from.value || !to.value) return false;
    return to.value < from.value;
});
</script>

<template>
    <div class="w-full max-w-md">
        <SLabel>Rango de fechas</SLabel>
        <div class="grid grid-cols-2 gap-3">
            <div>
                <span class="mb-1 block text-xs text-gray-500 dark:text-gray-400">Desde</span>
                <SInputDate
                    id="range-from"
                    v-model="from"
                    :error="hasInvalidRange"
                    show-icon
                    placeholder="dd/mm/aaaa"
                />
            </div>
            <div>
                <span class="mb-1 block text-xs text-gray-500 dark:text-gray-400">Hasta</span>
                <SInputDate id="range-to" v-model="to" :error="hasInvalidRange" show-icon placeholder="dd/mm/aaaa" />
            </div>
        </div>
        <p v-if="hasInvalidRange" class="mt-2 text-xs text-red-500">
            La fecha final no puede ser anterior a la inicial.
        </p>
    </div>
</template>
