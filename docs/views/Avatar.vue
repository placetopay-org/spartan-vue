<template>
  <div class="flex flex-col h-full flex-1 justify-center items-center mt-10">
    <div class="m-5">
      <h2 class="mb-5">Avatars</h2>
    </div>

    <div class="space-y-16">
      <div class="m-5">
        <p class="pb-8 text-sm font-medium text-gray-600">Simple</p>
        <SAvatar name="Jhon Due" />
      </div>
      <div class="m-5">
        <p class="pb-8 text-sm font-medium text-gray-600">With menu</p>
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
      </div>
    </div>
  </div>
</template>

<script>
import { SAvatar, SAvatarMenu, SMenuItem, } from "../../src/index.js";
import {
  CogIcon,
  HomeIcon,
  LogoutIcon,
  UserCircleIcon
} from "@heroicons/vue/outline";

export default {
  name: "Avatar",
  components: {
    SAvatar,
    SAvatarMenu,
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
    };
  },
}
</script>

<style scoped>

</style>