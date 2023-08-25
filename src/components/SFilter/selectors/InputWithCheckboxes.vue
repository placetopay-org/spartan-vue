<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { SInput } from '../../SInput';
import { SBadge } from '../../SBadge';
import { XMarkIcon } from '@heroicons/vue/24/solid';
import type { TFilter } from '../types';

const emit = defineEmits(['update:modelValue']);

const props = defineProps<{
  modelValue?: string[];
  filter: TFilter;
}>();

const search = ref('');

const checked = computed({
  get() {
    return props.modelValue ?? [];
  },
  set(value) {
    emit('update:modelValue', value);
  },
});

const computedOptions = computed(() => {
  return props.filter.options?.filter((option) => option.toLowerCase().includes(search.value.toLowerCase())) ?? [];
});

const removeCheck = (option: string) => (checked.value = checked.value.filter((item) => item !== option));

const clear = () => {
  checked.value = [];
  search.value = '';
};
</script>

<template>
  <div class="flex flex-col gap-4">
    <div
      :tabindex="-1"
      @focus="
        (event: FocusEvent) => ((event.target as HTMLDivElement).querySelector('input') as HTMLInputElement).focus()
      "
      class="flex items-center gap-3 border border-gray-300 bg-white focus-within:ring-primary-100 focus-within:ring transition focus-within:border-primary-300 px-3 py-2 rounded-lg"
    >
      <div class="w-full flex gap-3 flex-wrap overflow-auto max-h-20 scroll-hide">
        <SBadge
          v-if="checked.length"
          :key="option"
          v-for="option in checked"
          @removed="removeCheck(option)"
          removable
          pill
          size="sm"
        >
          {{ option }}
        </SBadge>
        <input
          id="input-search"
          type="text"
          v-model="search"
          :placeholder="checked.length ? '' : 'Selecciona una o varias opciones'"
          class="text-sm w-full p-0 border-0 placeholder:text-gray-400 focus:ring-0 focus:outline-0"
        />
      </div>
      <div class="flex items-center">
        <button @click="clear"><XMarkIcon class="w-5 h-5 text-gray-500 hover:scale-105 hover:text-gray-700 duration-75" /></button>
      </div>
    </div>
    <div class="overflow-y-auto max-h-32 scroll-primary pl-1.5">
      <div class="flex gap-2 items-center" v-for="option in computedOptions">
        <SInput :id="option" v-model="checked" :value="option" type="checkbox" />
        <label :for="option" class="text-sm text-gray-900 font-medium">{{ option }}</label>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* width */
.scroll-primary::-webkit-scrollbar {
  width: 5px;
}

/* Track */
.scroll-primary::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
.scroll-primary::-webkit-scrollbar-thumb {
  background: #ff6c0c;
  border-radius: 16px;
}

/* For Webkit-based browsers (Chrome, Safari and Opera) */
.scroll-hide::-webkit-scrollbar {
    display: none;
}

/* For IE, Edge and Firefox */
.scroll-hide {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
}
</style>