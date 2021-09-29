<template>
  <div class="flex flex-col h-full flex-1 justify-center items-center mt-10">
    <div class="m-5">
      <h2 class="mb-5">Breadcrumbs</h2>
    </div>

    <div class="w-full md:max-w-prose sm:max-w-xs mx-auto space-y-16">
      <div>
        <h3 class="pb-10">Simple</h3>
        <s-breadcrumbs>
          <s-breadcrumb
            :href="homepage.href"
            :active="homepage.active"
          >
            <div class="flex items-center">
              <HomeIcon class="flex-shrink-0 h-5 w-5" aria-hidden="true"/>
              <span class="ml-2">{{ homepage.name }}</span>
            </div>
          </s-breadcrumb>

          <s-breadcrumb
            v-for="(page, index) in pages"
            :icon="page.icon"
            :href="page.href"
            :active="page.active"
          >
            {{ page.name }}
          </s-breadcrumb>
        </s-breadcrumbs>
      </div>

      <div>
        <h3 class="pb-10">No Icon First</h3>
        <s-breadcrumbs>
          <s-breadcrumb
            :href="homepage.href"
            :active="homepage.active"
          >
            {{ homepage.name }}
          </s-breadcrumb>

          <s-breadcrumb
            v-for="(page, index) in pages"
            :icon="page.icon"
            :href="page.href"
            :active="page.active"
          >
            {{ page.name }}
          </s-breadcrumb>
        </s-breadcrumbs>
      </div>
    </div>
  </div>
</template>

<script>
import { SBreadcrumbs, SBreadcrumb } from "../../src/index.js";
import TableComponent from "./components/TableComponent.vue";
import { ChevronRightIcon, HomeIcon } from '@heroicons/vue/solid'

const dataDescription = [
  { prop: 'pages', description: 'array of pages', accepted: '-', default: "[]" },
]

export default {
  setup() {
    return {
      dataDescription,
    }
  },
  components: {
    TableComponent,
    SBreadcrumbs,
    SBreadcrumb,
    ChevronRightIcon,
    HomeIcon
  },
  data() {
    return {
      homepage: {
        name: 'Home', href: '#', icon: HomeIcon, active: false
      },
      pages: [
        { name: 'Projects', href: '#', icon: ChevronRightIcon, active: false },
        { name: 'Checkout', href: '#', icon: ChevronRightIcon, active: true, separator: false },
      ]
    }
  },
}
</script>
