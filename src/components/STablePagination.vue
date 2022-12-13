<template>
  <div
    class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
  >
    <div class="flex flex-1 items-center justify-between">
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
          class="relative inline-flex items-center rounded-l-lg border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 disabled:bg-gray-50 disabled:text-gray-500 hover:bg-gray-50 focus:z-10 active:z-10 focus:border-primary-300 active:bg-primary-50 active:text-primary-600 focus:ring-2 active:ring-2 focus:ring-primary-100 active:ring-primary-100 focus-visible:outline-none"
        >
          <span class="sr-only">Previous</span>
          <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          v-for="page in pages"
          @click="changeCurrentPage(page)"
          :disabled="page === currentPage"
          class="h-11 w-11 items-center border border-gray-300 px-4 py-2 text-sm font-medium text-gray-900 focus:z-10 active:z-10 focus:border-primary-300 active:bg-primary-50 active:text-primary-600 focus:ring-2 active:ring-2 focus:ring-primary-100 active:ring-primary-100 focus-visible:outline-none"
          :class="{
            'inline-flex': page === currentPage,
            'hidden md:inline-flex disabled:bg-gray-50 disabled:text-gray-500': page !== currentPage,
          }"
        >
          {{ page }}
        </button>
        <button
          @click="changeCurrentPage(currentPage + 1)"
          :disabled="currentPage >= lastPage"
          class="relative inline-flex items-center rounded-r-lg border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 disabled:bg-gray-50 disabled:text-gray-500 hover:bg-gray-50 focus:z-10 active:z-10 focus:border-primary-300 active:bg-primary-50 active:text-primary-600 focus:ring-2 active:ring-2 focus:ring-primary-100 active:ring-primary-100 focus-visible:outline-none"
        >
          <span class="sr-only">Next</span>
          <ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
        </button>
      </nav>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/24/solid";

export default {
  components: {
    ChevronLeftIcon,
    ChevronRightIcon,
  },
  props: {
    currentPage: {
      required: true,
      type: Number,
    },
    lastPage: {
      required: true,
      type: Number,
    },
  },
  setup(props) {
    const pages = computed(() => getPages(props.lastPage, props.currentPage));

    const getPages = (last, current) => {
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

    return { pages };
  },
  methods: {
    changeCurrentPage(page) {
      this.$emit("changeCurrentPage", page);
    },
  },
};
</script>
