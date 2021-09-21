import { ref } from 'vue'

const sidebarOpen = ref(false)

export default function useSidebar() {
  const toggleSidebar = () => {
    sidebarOpen.value = !sidebarOpen.value;
  }

  const openSidebar = () => {
    sidebarOpen.value = true;
  }

  const closeSidebar = () => {
    sidebarOpen.value = false;
  }

  return {
    sidebarOpen,
    toggleSidebar,
    openSidebar,
    closeSidebar
  }
}
