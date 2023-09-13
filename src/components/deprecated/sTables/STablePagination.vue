<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from 'vue-i18n'
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/24/solid";

const emits = defineEmits<{
  (e: "changeCurrentPage", page: number): void;
}>();

const props = defineProps<{
    currentPage: number;
    lastPage: number;
    simple?: boolean;
}>();

const { t } = useI18n({
  useScope: 'local',
  messages: {
    en: {
      spartan: {
        sfilters: {
          previous: 'Previous',
          next: 'Next',
        }
      }
    },
    es: {
      spartan: {
        sfilters: {
          previous: 'Anterior',
          next: 'Siguiente',
        }
      }
    },
    it: {
      spartan: {
        sfilters: {
          previous: 'Precedente',
          next: 'Prossimo',
        }
      }
    },
    pt: {
      spartan: {
        sfilters: {
          previous: 'anterior',
          next: 'Next',
        }
      }
    },
  }
});

const pages = computed(() => props.simple ? [] : getPages(props.lastPage, props.currentPage));

const getPages = (last: number, current: number) => {
  const size = 7;
  let arr = [];

  if (last <= size) {
    const total = last < size ? last : size;
    return Array.from({ length: total }, (value, index) => index + 1 );
  }

  if (last - current > 2 && current > 3) {
    arr = [];

    arr.push(1);
    arr.push("...");
    arr.push(current - 1);
    arr.push(current);
    arr.push(current + 1);
    arr.push("...");
    arr.push(last);

    return arr;
  }

  for (let i = 1; i <= 3; i++) {
    arr.push(i);
  }

  arr.push("...");

  for (let i = size - 5; i >= 0; i--) {
    arr.push(last - i);
  }

  return arr;
};

const changeCurrentPage = (page: number) => {
  emits("changeCurrentPage", page);
}
</script>

<template>
  <div
    class="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6"
  >
    <div class="flex items-center justify-between flex-1">
      <slot/>
    </div>

    <div>
      <nav
        class="relative z-0 inline-flex"
        :class="{
          '-space-x-px shadow-sm rounded-md': !simple,
          'gap-3': simple,
        }"
        aria-label="Pagination"
      >
        <button
          @click="changeCurrentPage(currentPage - 1)"
          :disabled="currentPage <= 1"
          class="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 disabled:bg-gray-50 disabled:text-gray-500 hover:bg-gray-50 focus:z-10 active:z-10 focus:border-primary-300 active:bg-primary-50 active:text-primary-600 focus:ring-2 active:ring-2 focus:ring-primary-100 active:ring-primary-100 focus-visible:outline-none"
          :class="{
            'rounded-lg': simple,
            'rounded-l-lg': !simple,
          }"
        >
          <span :class="{ 'sr-only': !simple }">{{ t('spartan.sfilters.previous') }}</span>
          <ChevronLeftIcon v-if="!simple" class="w-5 h-5" aria-hidden="true" />
        </button>

        <button
          v-if="!simple"
          v-for="page in pages"
          @click="typeof page === 'string' ? undefined : changeCurrentPage(page)"
          :disabled="page === currentPage"
          class="items-center px-4 py-2 text-sm font-medium text-gray-900 border border-gray-300 h-11 w-11 disabled:bg-gray-50 disabled:text-gray-500 focus:z-10 active:z-10 focus:border-primary-300 active:bg-primary-50 active:text-primary-600 focus:ring-2 active:ring-2 focus:ring-primary-100 active:ring-primary-100 focus-visible:outline-none"
          :class="{
            'inline-flex bg-neutral-200': page === currentPage,
            'hidden md:inline-flex disabled:bg-gray-50 disabled:text-gray-500': page !== currentPage,
          }"
        >
          {{ page }}
        </button>

        <button
          @click="changeCurrentPage(currentPage + 1)"
          :disabled="currentPage >= lastPage"
          class="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 disabled:bg-gray-50 disabled:text-gray-500 hover:bg-gray-50 focus:z-10 active:z-10 focus:border-primary-300 active:bg-primary-50 active:text-primary-600 focus:ring-2 active:ring-2 focus:ring-primary-100 active:ring-primary-100 focus-visible:outline-none"
          :class="{
            'rounded-lg': simple,
            'rounded-r-lg': !simple,
          }"
        >
          <span :class="{ 'sr-only': !simple }">{{ t('spartan.sfilters.next') }}</span>
          <ChevronRightIcon v-if="!simple" class="w-5 h-5" aria-hidden="true" />
        </button>
      </nav>
    </div>
  </div>
</template>
