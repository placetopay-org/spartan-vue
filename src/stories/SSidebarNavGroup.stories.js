import {
  SSidebarNavChild,
  SSidebarNavParent,
  SSidebarNavGroup,
} from "../index.js";

import { CogIcon } from "@heroicons/vue/outline";

export default {
  title: "Components/SSidebarNavGroup",
  component: SSidebarNavGroup,
  argTypes: {
    active: {
      control: { type: "boolean" },
    },
  },
  decorators: [() => ({ template: '<div class="max-w-xs"><story /></div>' })],
  subcomponents: { SSidebarNavChild, SSidebarNavParent },
};

const Template = (args) => ({
  components: {
    SSidebarNavGroup,
    SSidebarNavChild,
    SSidebarNavParent,
  },
  setup() {
    return { args };
  },
  template: `
    <SSidebarNavGroup>
      <template v-slot>
        <SSidebarNavParent :icon="args.group.icon" :active="args.group.active">
          {{ args.group.name }}
        </SSidebarNavParent>
      </template>

      <template v-slot:items-list>
        <SSidebarNavChild v-for="child in args.group.children" :active="child.active">
          {{ child.name }}
        </SSidebarNavChild>
      </template>
    </SSidebarNavGroup>
  `,
});

const group = {
  name: "Settings",
  icon: CogIcon,
  active: true,
  children: [
    { name: "Roles" },
    { name: "Permisos", active: true },
    { name: "Usuarios" },
    { name: "ACL" },
  ],
};

export const Default = Template.bind({});
Default.args = {
  group,
};
