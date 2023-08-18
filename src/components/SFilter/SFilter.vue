<script setup lang="ts">
import SFilterField from './SFilterField.vue';
import { SButton } from '../SButton';
import { FunnelIcon } from '@heroicons/vue/24/outline';
import { PlusIcon } from '@heroicons/vue/20/solid';
import type { TFilter } from './types';
import { ref } from 'vue';
import { SDropdown, SDropdownItem } from '../SDropdown';

defineEmits<{
  (event: 'apply', filters: TFilter[]): void;
}>();

const props = withDefaults(
  defineProps<
    Partial<{
      customFilters: boolean;
      filters?: TFilter[];
    }>
  >(),
  {
    customFilters: false,
    filters: undefined,
  }
);

const addFilterPopover = ref(false);

const addFilter = () => {
  addFilterPopover.value = !addFilterPopover.value;
  document.getElementById('modal')?.focus();
};
</script>

<template>
  <div class="flex w-full justify-between gap-8 pr-1">
    <div class="pl-1 flex flex-wrap gap-3">
      <SFilterField v-for="filter in filters" :filter="filter" />
      <SDropdown left-to-right>
        <button
          class="group py-0.5 px-3 text-sm gap-2 flex items-center whitespace-nowrap border border-dashed border-gray-400 hover:border-gray-500 rounded-full text-gray-400 hover:text-gray-600 s-focus-primary"
        >
          <PlusIcon class="w-4 h-4" />
          <span>Agregar filtro</span>
        </button>

        <template #items>
          <SDropdownItem>
            <input type="text" class="w-full mt-2 border border-gray-300 rounded-md shadow-sm" />
          </SDropdownItem>

          <SDropdownItem v-for="{ field } in filters">
            {{ field }}
          </SDropdownItem>
        </template>
      </SDropdown>

      <!-- <Transition
          enter-active-class="transition duration-200 ease-out"
          leave-active-class="transition duration-150 ease-in"
          enter-from-class="-translate-y-2 opacity-0"
          enter-to-class="translate-y-0 opacity-100"
          leave-from-class="translate-y-0 opacity-100"
          leave-to-class="-translate-y-2 opacity-0"
        >
          <div
            v-show="addFilterPopover"
            id="modal"
            tabindex="-1"
            class="absolute left-0 border focus:border-black --translate-x-10 translate-y-2 z-20 bg-white shadow-2xl rounded-lg flex flex-col"
          >
            <div class="px-4 pt-4 pb-3"><input type="text" /></div>
            <ul class="w-full">
              <li class="hover:text-primary-600 hover:bg-gray-50 rounded-lg" v-for="{ field } in filters">
                <button class="w-full text-left px-4 py-2">{{ field }}</button>
              </li>
            </ul>
          </div>
        </Transition> -->
    </div>
    <div class="flex gap-3">
      <SButton v-if="customFilters" variant="outline" rounded="full" class="!py-0.5" :icon="FunnelIcon" />
      <SButton rounded="full" class="whitespace-nowrap !py-0.5" @click="$emit('apply', filters)"
        >Aplicar filtros</SButton
      >
      <SButton variant="secondary" rounded="full" class="whitespace-nowrap !py-0.5">Borrar filtros</SButton>
    </div>
  </div>
</template>

<style scoped>
/* height */
::-webkit-scrollbar {
  height: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f3f4f6;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #ff6c0c;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #da5a0d;
}
</style>
