<script setup lang="ts">
import FieldFilter from './FieldFilter.vue';
import FieldSelector from './popovers/FieldSelector.vue';
import FilterSelector from './popovers/FilterSelector.vue';
import { SButton } from '../SButton';
import { FunnelIcon } from '@heroicons/vue/24/outline';
import { PlusIcon } from '@heroicons/vue/20/solid';
import type { TField } from './types';
import { reactive, ref } from 'vue';
import { SPopover } from '../SPopover';
import { closeActivePopover } from './globalStore';

defineEmits<{
  (event: 'apply', fields: TField[]): void;
}>();

const props = defineProps<{
  customFilters: boolean;
  fields: TField[];
}>();

const fields = reactive(props.fields);

const popover = ref<InstanceType<typeof SPopover> | null>(null);
const preventClose = ref(false);
const activeField = ref<TField>();

const state = ref(0);
const isState = (stateIdx: number) => state.value === stateIdx;
const nextState = () => state.value++;

const openCustomFilters = () => {
  // TODO: Open custom filters
}

const openFieldSelector = () => {
  popover.value?.open();
  if (closeActivePopover.value && closeActivePopover.value !== reset) closeActivePopover.value();
  closeActivePopover.value = reset;
};

const selectField = (filter: TField) => {
  activeField.value = filter;
  nextState();
  preventClose.value = true;
};

const updateFilter = ({ field, filter }: { field: TField; filter: TField['filter'] }) => {
  field.filter = filter;
  closeActivePopover.value();
};

const removeFilter = (field: TField) => {
  field.filter = undefined;
};

const reset = () => {
  activeField.value = undefined;
  state.value = 0;
  preventClose.value = false;
  popover.value?.close();
};

const clean = () => {
  fields.forEach((filter) => !filter.required && (filter.filter = undefined));
};
</script>

<template>
  <div class="flex w-full justify-between gap-8 pr-1">
    <div class="pl-1 flex flex-wrap gap-3">
      <FieldFilter
        v-for="filter in fields"
        :key="filter.name"
        :field="filter"
        :filterIdx="fields.indexOf(filter)"
        @update="updateFilter"
        @remove="removeFilter"
      />

      <SPopover ref="popover" :preventClose="preventClose" :offset="8">
        <template #reference>
          <button
            @click="openFieldSelector"
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
          <FieldSelector v-if="isState(0)" :fields="fields.filter((data) => !data.filter)" @select="selectField" />
          <FilterSelector
            v-else-if="isState(1) && activeField"
            :field="activeField"
            @add="updateFilter"
            @cancel="reset"
          />
        </Transition>
      </SPopover>
    </div>

    <div class="flex gap-3">
      <SButton
        v-if="customFilters"
        variant="outline"
        rounded="full"
        class="!py-0.5"
        :icon="FunnelIcon"
        @click="openCustomFilters"
      />
      <SButton
        rounded="full"
        class="whitespace-nowrap !py-0.5"
        @click="
          $emit(
            'apply',
            fields.filter((filter) => filter.filter)
          )
        "
      >
        Aplicar filtros
      </SButton>
      <SButton @click="clean" variant="secondary" rounded="full" class="whitespace-nowrap !py-0.5"
        >Borrar filtros</SButton
      >
    </div>
  </div>
</template>
