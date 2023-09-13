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
    <div v-if="visible" class="rounded shadow text-sm border border-gray-900 mb-3">
      <header class="bg-gray-900 text-white pl-3 flex justify-between">
        <h1>Panel</h1>
        <button
          @click="close"
          class="border-l hover:bg-white hover:border-gray-900 hover:text-gray-900 hover:border-b rounded-tr duration-75"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
            <path
              d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"
            />
          </svg>
        </button>
      </header>
      <div class="px-3 py-2 flex">
        <div class="flex flex-col">
          <span>Language:</span>
          <select v-model="locale" class="py-0 pl-2">
            <option v-for="locale in availableLocales" :key="`locale-${locale}`" :value="locale">{{ locale }}</option>
          </select>
        </div>
      </div>
    </div>
    <button
      v-else
      class="rounded border shadow text-xs text-white bg-gray-900 px-2 py-1 mb-2 hover:bg-white hover:text-gray-900 hover:border duration-75"
      @click="visible = true"
    >
      panel
    </button>
    <hr class="mb-2" />
  </div>
</template>
