<template>
  <div
    class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
  >
    <div class="flex flex-1 justify-between sm:hidden">
      <a
        href="#"
        class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        Previous
      </a>

      <a
        href="#"
        class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        Next
      </a>
    </div>

    <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
      <div>
        <p class="text-sm text-gray-700">
          Showing
          {{ " " }}
          <span class="font-medium">1</span>
          {{ " " }}
          to
          {{ " " }}
          <span class="font-medium">10</span>
          {{ " " }}
          of
          {{ " " }}
          <span class="font-medium">97</span>
          {{ " " }}
          results
        </p>
      </div>
    </div>

    <div>
      <nav
        class="relative z-0 inline-flex -space-x-px rounded-md shadow-sm"
        aria-label="Pagination"
      >
        <button
          @click="currentPage > 1 ? changeCurrentPage(currentPage - 1) : ''"
          class="relative inline-flex items-center rounded-l-xl border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
        >
          <span class="sr-only">Previous</span>
          <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          v-for="page in pages"
          @click="changeCurrentPage(page)"
          class="inline-flex h-11 w-11 items-center border border-gray-300 px-4 py-2 text-sm font-medium text-gray-900"
        >
          {{ page }}
        </button>
        <button
          @click="
            currentPage < lastPage ? changeCurrentPage(currentPage + 1) : ''
          "
          class="relative inline-flex items-center rounded-r-xl border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
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
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/solid";

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
