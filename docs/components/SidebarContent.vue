<template>
  <div>
    <div class="flex-1 flex flex-col pt-4 md:pt-5 pb-4 overflow-y-auto">
      <div class="flex items-center flex-shrink-0 px-4 md:px-5">
        <img class="h-9 w-auto" src="https://static.placetopay.com/placetopay-logo.svg" alt="Placetopay Logo"/>
      </div>

      <nav class="mt-6 md:mt-10 flex-1 px-4 md:px-5 space-y-1">
        <router-link
          v-for="item in navigation"
          :key="item.name"
          :to="item.href"
          v-slot="{ navigate, href, isActive }"
          custom
        >
          <a
            :class="isActive? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'"
            class="group flex items-center px-3 py-3 md:py-3.5 md:px-4 text-base md:text-sm font-medium rounded-lg"
            :href="href"
            @click="navigate"
          >
            {{ item.name }}
          </a>
        </router-link>
      </nav>
    </div>
  </div>
</template>

<script>

const navigation = [
  { name: 'Home', href: '/'},
  { name: 'Buttons', href: '/components/buttons'},
  { name: 'Inputs', href: '/components/inputs'},
  { name: 'Sidebar', href: '/components/Sidebar'},
  { name: 'Breadcrumbs', href: '/components/Breadcrumbs'},
  { name: 'Avatar', href: '/components/Avatar'}
]

export default {
  name: "SideBarContent",
  setup() {
    return {
      navigation,
    }
  }
}
</script>
