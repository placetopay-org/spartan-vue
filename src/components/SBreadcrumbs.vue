<template>
    <nav class="flex max-w-7xl mx-auto sm:px-6 md:px-8 m-2" aria-label="Breadcrumb">
        <ol role="list" class="flex items-center space-x-4">
            <li>
                <div>
                    <a :href="route('dashboard')" class="text-gray-400 hover:text-gray-500">
                        <!-- <ShieldCheckIcon class="flex-shrink-0 h-5 w-5" aria-hidden="true" /> -->
                        <span class="sr-only">Home</span>
                    </a>
                </div>
            </li>
            <li v-for="page in pages" :key="page.name">
                <div class="flex items-center">
                    <!-- <ChevronRightIcon class="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" /> -->
                    <a :href="page.href" class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700" :aria-current="page.current ? 'page' : undefined">{{ page.name }}</a>
                </div>
            </li>
        </ol>
    </nav>
</template>

<script>

/* import { ChevronRightIcon, ShieldCheckIcon } from '@heroicons/vue/solid' */

const props = defineProps({
  pages: {
    type: Array,
    required: true,
    default: []
  }
})

</script>

<style scoped>

</style>
