import { SBreadcrumbs, SBreadcrumb } from "../index";
import { ChevronRightIcon, HomeIcon } from "@heroicons/vue/24/solid";

export default {
  title: "Components/SBreadcrumbs",
  component: SBreadcrumbs,
  subcomponents: { SBreadcrumb },
};

const Template = (pages) => ({
  components: { SBreadcrumbs, SBreadcrumb, HomeIcon },
  setup() {
    return { pages };
  },
  template: `
        <SBreadcrumbs>
            <SBreadcrumb
                :href="pages.home.href"
                :active="pages.home.active"
                :icon="pages.home.icon"
                :separator="false"
            > </SBreadcrumb>
            <SBreadcrumb
                v-for="page in pages.content"
                :href="page.href"
                :active="page.active"
            >
                {{ page.name }}
            </SBreadcrumb>
        </SBreadcrumbs>`,
});

export const Breadcrumbs = Template.bind({});
Breadcrumbs.args = {
  home: {
    name: "Home",
    href: "#",
    active: false,
    icon: HomeIcon,
    separator: false,
  },
  content: {
    projects: {
      name: "Projects",
      href: "#",
      active: false,
    },
    core: {
      name: "Core",
      href: "#",
      active: false,
    },
    checkout: {
      name: "Checkout",
      href: "#",
      active: true,
    },
  },
};
