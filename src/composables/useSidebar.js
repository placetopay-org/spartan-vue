import { reactive } from 'vue';

const sidebar = reactive({
    mobile: { isOpen: false },
    desktop: { isOpen: true },
});

export default function useSidebar(name = 'desktop') {
    const toggleSidebar = (name) => {
        sidebar[name].isOpen = !sidebar[name].isOpen;
    };

    const openSidebar = (name) => {
        sidebar[name].isOpen = true;
    };

    const closeSidebar = (name) => {
        sidebar[name].isOpen = false;
    };

    return {
        openSidebar,
        closeSidebar,
        toggleSidebar,
        sidebar,
    };
}
