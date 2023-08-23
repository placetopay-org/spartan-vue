<script setup lang="ts">
import SFilterField from './SFilterField.vue';
import FieldSelector from './popovers/FieldSelector.vue';
import FilterSelector from './popovers/FilterSelector.vue';
import { SButton } from '../SButton';
import { FunnelIcon } from '@heroicons/vue/24/outline';
import { PlusIcon } from '@heroicons/vue/20/solid';
import type { TFilter } from './types';
import { computed, reactive, ref } from 'vue';
import { SPopover } from '../SPopover';

defineEmits<{
  (event: 'apply', filters: TFilter[]): void;
}>();

const props = defineProps<{
  customFilters: boolean;
  data: TFilter[];
}>();

const filters = reactive(props.data);

const popover = ref<InstanceType<typeof SPopover> | null>(null);
const preventClose = ref(false);
const activeFilter = ref<TFilter>();

const state = ref(0);
const isState = (stateIdx: number) => state.value === stateIdx;
const nextState = () => state.value++;

const selectFilter = (filter: TFilter) => {
  activeFilter.value = filter;
  nextState();
  preventClose.value = true;
};

const addFilter = (value: { index: number; data: TFilter['filter'] }) => {
  console.log('addFilter', JSON.parse(JSON.stringify(value)));
  filters[value.index].filter = value.data;
  reset();
};

const removeFilter = (filter: TFilter) => {
  filter.filter = undefined;
};

const reset = () => {
  activeFilter.value = undefined;
  state.value = 0;
  preventClose.value = false;
  popover.value?.close();
};

const clean = () => {
  filters.forEach((filter) => (filter.filter = undefined));
};
</script>

<template>
  <div class="flex w-full justify-between gap-8 pr-1">
    <div class="pl-1 flex flex-wrap gap-3">
      <SFilterField v-for="filter in filters" :filter="filter" @remove="removeFilter" />

      <SPopover ref="popover" :preventClose="preventClose" :offset="8">
        <template #reference>
          <button
            @click="popover?.open"
            class="group py-0.5 px-3 text-sm gap-2 flex items-center whitespace-nowrap border border-dashed border-gray-400 hover:border-gray-500 rounded-full text-gray-400 hover:text-gray-600 s-focus-primary"
          >
            <PlusIcon class="w-4 h-4" />
            <span>Agregar filtro</span>
          </button>
        </template>

        <Transition
          mode="out-in"
          enter-active-class="duration-150 ease-out"
          leave-active-class="duration-150 ease-in"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <FieldSelector v-if="isState(0)" :filters="filters.filter((data) => !data.filter)" @select="selectFilter" />
          <FilterSelector
            v-else-if="isState(1) && activeFilter"
            :filter="activeFilter"
            :filterIdx="filters.indexOf(activeFilter)"
            @add="addFilter"
            @cancel="reset"
          />
        </Transition>
      </SPopover>
    </div>

    <div class="flex gap-3">
      <SButton v-if="customFilters" variant="outline" rounded="full" class="!py-0.5" :icon="FunnelIcon" />
      <SButton rounded="full" class="whitespace-nowrap !py-0.5" @click="$emit('apply', filters)">
        Aplicar filtros
      </SButton>
      <SButton @click="clean" variant="secondary" rounded="full" class="whitespace-nowrap !py-0.5">Borrar filtros</SButton>
    </div>
  </div>
</template>
