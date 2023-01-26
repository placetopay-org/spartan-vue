<script setup lang="ts">
import { computed } from "vue";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/solid";

const emits = defineEmits<{
  (e: "changeCurrentPage", page: number): void;
}>();

const props = defineProps<{
    currentPage: number;
    lastPage: number;
    simple?: boolean;
}>();

const pages = computed(() => props.simple ? [] : getPages(props.lastPage, props.currentPage));

const getPages = (last: number, current: number) => {
  const size = 7;
  let arr = [];

  if (last <= size) {
    return last;
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
        class="relative z-0 inline-flex -space-x-px rounded-md shadow-sm"
        aria-label="Pagination"
      >
        <button
          @click="changeCurrentPage(currentPage - 1)"
          :disabled="currentPage <= 1"
          class="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-lg disabled:bg-gray-50 disabled:text-gray-500 hover:bg-gray-50 focus:z-10 active:z-10 focus:border-primary-300 active:bg-primary-50 active:text-primary-600 focus:ring-2 active:ring-2 focus:ring-primary-100 active:ring-primary-100 focus-visible:outline-none"
        >
          <span class="sr-only">Previous</span>
          <ChevronLeftIcon class="w-5 h-5" aria-hidden="true" />
        </button>

        <template v-if="simple">
          <button
            disabled
            class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 border border-gray-300 h-11 w-11 focus:z-10 active:z-10 focus:border-primary-300 active:bg-primary-50 active:text-primary-600 focus:ring-2 active:ring-2 focus:ring-primary-100 active:ring-primary-100 focus-visible:outline-none"
          >
            {{ currentPage }}
          </button>
        </template>
        <template v-else>
          <button
            v-for="page in pages"
            @click="typeof page === 'string' ? undefined : changeCurrentPage(page)"
            :disabled="page === currentPage"
            class="items-center px-4 py-2 text-sm font-medium text-gray-900 border border-gray-300 h-11 w-11 disabled:bg-gray-50 disabled:text-gray-500 focus:z-10 active:z-10 focus:border-primary-300 active:bg-primary-50 active:text-primary-600 focus:ring-2 active:ring-2 focus:ring-primary-100 active:ring-primary-100 focus-visible:outline-none"
            :class="{
              'inline-flex': page === currentPage,
              'hidden md:inline-flex disabled:bg-gray-50 disabled:text-gray-500': page !== currentPage,
            }"
          >
            {{ page }}
          </button>
        </template>

        <button
          @click="changeCurrentPage(currentPage + 1)"
          :disabled="currentPage >= lastPage"
          class="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-lg disabled:bg-gray-50 disabled:text-gray-500 hover:bg-gray-50 focus:z-10 active:z-10 focus:border-primary-300 active:bg-primary-50 active:text-primary-600 focus:ring-2 active:ring-2 focus:ring-primary-100 active:ring-primary-100 focus-visible:outline-none"
        >
          <span class="sr-only">Next</span>
          <ChevronRightIcon class="w-5 h-5" aria-hidden="true" />
        </button>
      </nav>
    </div>
  </div>
</template>
