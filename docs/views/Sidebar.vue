<template>
  <div class="h-full flex bg-gray-100 overflow-hidden">
    <SSidebar>
      <SSidebarLogo />
      <SSidebarContent>
        <SSidebarNavItem :href="home.href" :icon="home.icon">
          {{ home.name }}
        </SSidebarNavItem>

        <div class="mb-2.5 mt-5">
          <SSidebarNavTitle> Proyectos </SSidebarNavTitle>
        </div>

        <div class="space-y-1">
          <SSidebarNavItem
            v-for="item in nav.items"
            :key="item.name"
            :href="item.href"
            :active="item.current"
            :icon="item.icon"
          >
            {{ item.name }}
          </SSidebarNavItem>
        </div>
      </SSidebarContent>
    </SSidebar>
    <div class="flex flex-col w-0 flex-1 overflow-hidden">
      <STopBar>
        <SAvatarMenu>
          <SAvatar name="Jhon Ge" alt="John Ge Avatar"></SAvatar>

          <template v-slot:menu-items>
            <SMenuItem
              v-for="item in userNavigation"
              :key="item.name"
              :icon="item.icon"
              :href="item.href"
            >
              {{ item.name }}
            </SMenuItem>
          </template>
        </SAvatarMenu>
      </STopBar>

      <main class="flex-1 relative overflow-y-auto focus:outline-none">
        <div class="py-6">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <h1 class="text-2xl font-semibold text-gray-900">Dashboard</h1>
          </div>
          <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <!-- Replace with your content -->
            <div class="py-4">
              <div
                class="border-4 border-dashed border-gray-200 rounded-lg h-96"
              />
            </div>
            <!-- /End replace -->
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import {
  SSidebar,
  SSidebarLogo,
  SSidebarNavItem,
  SSidebarNavTitle,
  SSidebarContent,
  STopBar,
  SAvatar,
  SAvatarMenu,
  SMenuItem,
} from "../../src/index.js";

import {
  ShieldCheckIcon,
  CursorClickIcon,
  TemplateIcon,
  ChipIcon,
  HomeIcon,
  UserCircleIcon,
  CogIcon,
  LogoutIcon,
} from "@heroicons/vue/outline";

export default {
  components: {
    SSidebar,
    SSidebarLogo,
    SSidebarNavItem,
    SSidebarNavTitle,
    SSidebarContent,
    STopBar,
    SAvatar,
    SAvatarMenu,
    UserCircleIcon,
    CogIcon,
    SMenuItem,
  },
  data() {
    const userNavigation = [
      { name: "Editar perfil", href: "#", icon: UserCircleIcon },
      { name: "Ajustes", href: "#", icon: CogIcon },
      { name: "Cerrar sesión", href: "#", icon: LogoutIcon },
    ];
    return {
      userNavigation,
      home: { name: "Inicio", href: "#", icon: HomeIcon(), current: false },

      nav: {
        items: [
          {
            name: "Checkout",
            href: "#",
            icon: ShieldCheckIcon,
            current: false,
          },
          {
            name: "Microsites",
            href: "#",
            icon: CursorClickIcon,
            current: true,
          },
          { name: "Rest", href: "#", icon: ChipIcon, current: false },
          { name: "Panel", href: "#", icon: TemplateIcon, current: false },
        ],
      },
    };
  },
};
</script>

<style scoped>
</style>
