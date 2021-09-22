<template>
  <div class="h-full flex bg-white overflow-hidden">
    <s-sidebar>
      <s-sidebar-logo/>
      <s-sidebar-content>
        <s-sidebar-nav-item :href="home.href" :icon="home.icon">
          {{ home.name }}
        </s-sidebar-nav-item>

        <div class="mb-2.5 mt-5">
          <s-sidebar-nav-title >
            Proyectos
          </s-sidebar-nav-title>
        </div>

          <div class="space-y-1">
            <s-sidebar-nav-item
              v-for="item in nav.items"
              :key="item.name"
              :href="item.href"
              :active="item.current"
              :icon="item.icon"
            >
              {{ item.name }}
            </s-sidebar-nav-item>
          </div>
      </s-sidebar-content>
    </s-sidebar>
  </div>
</template>

<script>
import {
  SInput,
  SInputError,
  SInputHelper,
  SSidebar,
  SSidebarLogo,
  SSidebarNavItem,
  SSidebarNavTitle,
  SSidebarContent
} from "../../src/index.js";

import { ShieldCheckIcon,
  CursorClickIcon, TemplateIcon, ChipIcon, HomeIcon } from '@heroicons/vue/outline'

export default {
  components: {
    SInput,
    SInputError,
    SInputHelper,
    SSidebar,
    SSidebarLogo,
    SSidebarNavItem,
    SSidebarNavTitle,
    SSidebarContent,
  },
  data() {
    return {
      home: { name: 'Inicio', href: '#', icon: HomeIcon(), current: false },

      nav: {
        items: [
          { name: 'Checkout', href: '#', icon: ShieldCheckIcon, current: false },
          { name: 'Microsites', href: '#', icon: CursorClickIcon, current: true },
          { name: 'Rest', href: '#', icon: ChipIcon, current: false },
          { name: 'Panel', href: '#', icon: TemplateIcon, current: false },
        ]
      }
    }
  }
}
</script>

<style scoped>

</style>
