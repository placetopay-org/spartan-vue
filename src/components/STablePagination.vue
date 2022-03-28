<template>
  <div>
    <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px float-right" aria-label="Pagination">
      <button
          @click="currentPage > 1 ? changeCurrentPage(currentPage - 1) : ''"
          class="w-11 h-11 relative inline-flex items-center px-2 py-2 rounded-l-xl border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
        <span class="sr-only">Previous</span>
        <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
      </button>
      <button
          v-for="page in pages"
          @click="changeCurrentPage(page)"
          class="w-11 h-11 border-gray-300 text-gray-900 inline-flex items-center px-4 py-2 border text-sm font-medium">{{ page }}</button>
      <button
          @click="currentPage < lastPage ? changeCurrentPage(currentPage + 1) : ''"
          class="w-11 h-11 relative inline-flex items-center px-2 py-2 rounded-r-xl border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
        <span class="sr-only">Next</span>
        <ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
      </button>
    </nav>
  </div>
</template>

<script>
import { computed } from 'vue';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/solid'

export default {
  components: {
    ChevronLeftIcon,
    ChevronRightIcon,
  },
  props: {
    currentPage: {
      required: true,
      type: Number
    },
    lastPage: {
      required: true,
      type: Number
    }
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
        arr.push('...');
        arr.push(current - 1);
        arr.push(current);
        arr.push(current + 1);
        arr.push('...');
        arr.push(last);

        return arr;
      }

        for (let i = 1; i <= 3; i++) {
          arr.push(i);
        }

        arr.push('...');

        for (let i = size - 5; i >= 0; i--) {
          arr.push(last - i);
        }

        return arr;

    };

    return { pages };
  },
  methods: {
    changeCurrentPage(page) {
      this.$emit('changeCurrentPage', page);
    }
  }
}
</script>