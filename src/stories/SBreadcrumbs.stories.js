import {SBreadcrumbs, SBreadcrumb } from "../index";
import { ChevronRightIcon, HomeIcon } from "@heroicons/vue/solid";

export default {
    title: "Components/SBreadcrumbs",
    component: SBreadcrumbs,
    subcomponents: { SBreadcrumb },
};

const Template = ( pages ) => ({
    components: { SBreadcrumbs, SBreadcrumb, HomeIcon },
    setup() {
        return { pages };
    },
    template: `
        <SBreadcrumbs>
            <SBreadcrumb
                :href="pages.home.href"
                :active="pages.home.active"
            >
                <div class="flex items-center">
                    <HomeIcon class="flex-shrink-0 h-5 w-5" aria-hidden="true"/>
                </div>
            </SBreadcrumb>
            <SBreadcrumb
                v-for="page in pages.content"
                :icon="page.icon"
                :href="page.href"
                :active="page.active"
            >
                {{ page.name }}
            </SBreadcrumb>
        </SBreadcrumbs>`,
});

export const Breadcrumbs = Template.bind({});
Breadcrumbs.args = {
    home: { name: 'Home', href: '#', active: false },
    content: {
        projects: { name: 'Label', href: '#', icon: ChevronRightIcon, active: false },
        checkout: { name: 'Label', href: '#', icon: ChevronRightIcon, active: true, separator: false },
    }
}