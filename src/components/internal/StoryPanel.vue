<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { locale, availableLocales } = useI18n();

const visible = ref(true);
const close = () => {
    visible.value = false;
};
</script>

<template>
    <div>
        <div v-if="visible" class="mb-3 rounded border border-gray-900 text-sm shadow">
            <header class="flex justify-between bg-gray-900 pl-3 text-white">
                <h1>Panel</h1>
                <button
                    class="rounded-tr border-l duration-75 hover:border-b hover:border-gray-900 hover:bg-white hover:text-gray-900"
                    @click="close"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4">
                        <path
                            d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"
                        />
                    </svg>
                </button>
            </header>
            <div class="flex px-3 py-2">
                <div class="flex flex-col">
                    <span>Language:</span>
                    <select v-model="locale" class="py-0 pl-2">
                        <option
                            v-for="localeItem in availableLocales"
                            :key="`locale-${localeItem}`"
                            :value="localeItem"
                        >
                            {{ localeItem }}
                        </option>
                    </select>
                </div>
            </div>
        </div>
        <button
            v-else
            class="mb-2 rounded border bg-gray-900 px-2 py-1 text-xs text-white shadow duration-75 hover:border hover:bg-white hover:text-gray-900"
            @click="visible = true"
        >
            panel
        </button>
        <hr class="mb-2" />
    </div>
</template>
