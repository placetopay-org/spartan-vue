import { ref } from 'vue';
import MySidebar from './MySidebar.vue';
import { createDefault } from '@/helpers';

export default {
    title: 'examples/SidebarLayouts/components',
};

export const Sidebar = createDefault({
    design: 'https://www.figma.com/file/L7Q1hYhhz42H3zHPngVnbw/Accounts-V2?type=design&node-id=408-1756',
    containerClass: 'h-full w-full',
    components: { MySidebar },
    setup: () => {
        const value = ref('Dashboard');
        return { value };
    },
    template: `<MySidebar v-model="value" />`,
    transform: () => `<script setup lang="ts">
    import { SSidebar, SSidebarItem, SSidebarItemGroup } from '../../../components/spartan';
    import { HomeIcon, DocumentCodeIcon, ReceiptTextIcon, ClipboardTickIcon, ShieldSecurityIcon } from '@placetopay/iconsax-vue/linear';
    
    defineEmits(['update:modelValue']);
    
    defineProps<{
        modelValue: string;
    }>();
    </script>
    
    <template>
        <SSidebar class="w-60 pb-8" placetopayHeader :modelValue="modelValue" @update:modelValue="$emit('update:modelValue', $event)">
            <SSidebarItem :icon="HomeIcon">Dashboard</SSidebarItem>
            <SSidebarItem :icon="ReceiptTextIcon">Transactions</SSidebarItem>
            <SSidebarItem :icon="DocumentCodeIcon">System</SSidebarItem>
    
            <SSidebarItemGroup :icon="ClipboardTickIcon">
                <template #title>Administration</template>
    
                <SSidebarItem>Merchants</SSidebarItem>
                <SSidebarItem>Sites</SSidebarItem>
                <SSidebarItem>Users</SSidebarItem>
            </SSidebarItemGroup>
    
            <SSidebarItemGroup :icon="ShieldSecurityIcon">
                <template #title>Security</template>
    
                <SSidebarItem>Roles</SSidebarItem>
                <SSidebarItem>Permissions</SSidebarItem>
                <SSidebarItem>Logs</SSidebarItem>
            </SSidebarItemGroup>
        </SSidebar>
    </template>
    `,
});
