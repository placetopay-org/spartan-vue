import {
    SSidebarNavChild,
    SSidebarNavParent,
    SSidebarNavGroup,
    SSidebar,
    SSidebarLogo,
    SSidebarContent,
    SSidebarNavItem,
    SRootLayout,
} from '../index.ts';

import { CogIcon, HomeIcon, UserIcon, LockOpenIcon, RectangleStackIcon } from '@heroicons/vue/24/outline';

export default {
    title: 'Components/SSidebar',
    component: SSidebarNavGroup,
    argTypes: {
        active: {
            control: { type: 'boolean' },
        },
    },
    parameters: {
        layout: 'fullscreen',
    },
    subcomponents: { SSidebarNavChild, SSidebarNavParent },
};

const Template = (args) => ({
    components: {
        SSidebarNavGroup,
        SSidebarNavChild,
        SSidebarNavParent,
        SSidebarNavItem,
        SSidebar,
        SSidebarLogo,
        SSidebarContent,
        RectangleStackIcon,
        SRootLayout,
    },
    setup() {
        return { args };
    },
    template: `
    <SRootLayout>
      <template v-slot:sidebar>
        <SSidebar>
          <SSidebarLogo />

          <SSidebarContent>
            <template v-for="group in args.groups" :key="group.id">
              <SSidebarNavItem v-if="!group.children" :href="group.href" :icon="group.icon">
                  {{ group.name }}
              </SSidebarNavItem>

              <SSidebarNavGroup v-else :default-open="group.active">
                <template v-slot>
                  <SSidebarNavParent :icon="group.icon" :active="group.active">
                    {{ group.name }}
                  </SSidebarNavParent>
                </template>

                <template v-slot:items-list>
                  <SSidebarNavChild v-for="child in group.children" :active="child.active">
                    {{ child.name }}
                  </SSidebarNavChild>
                </template>
              </SSidebarNavGroup>
            </template>
          </SSidebarContent>
        </SSidebar>
      </template>
    </SRootLayout>  
  `,
});

const groups = [
    {
        name: 'Dashboard',
        icon: HomeIcon,
        active: false,
        href: '#',
    },
    {
        name: 'Accounts',
        icon: UserIcon,
        active: false,
        href: '#',
    },
    {
        name: 'Clientes',
        icon: RectangleStackIcon,
        active: true,
        children: [{ name: 'Comercios' }, { name: 'Sucursales', active: true }, { name: 'Sitios' }, { name: 'ACL' }],
    },
    {
        name: 'Security',
        icon: LockOpenIcon,
        active: false,
        children: [{ name: 'Roles' }, { name: 'Permisos' }, { name: 'Usuarios' }, { name: 'ACL' }],
    },
    {
        name: 'Settings',
        icon: CogIcon,
        active: false,
        children: [{ name: 'Roles' }, { name: 'Permisos' }, { name: 'Usuarios' }, { name: 'ACL' }],
    },
];

export const Default = Template.bind({});
Default.args = {
    groups,
};
