import SidebarWithHeader from './SidebarWithHeader.vue';
import OnlySidebar from './OnlySidebar.vue';
import { LinkButton } from '@internal';
import { createDefault } from '@/helpers';

export default {
    title: 'examples/SidebarLayouts/pages',
};

export const SidebarWithHeaderStory = createDefault({
    design: 'https://www.figma.com/file/L7Q1hYhhz42H3zHPngVnbw/Accounts-V2?type=design&node-id=408-1756',
    containerClass: 'h-full w-full',
    components: { LinkButton, SidebarWithHeader },
    args: { buttonPreviewMode: true },
    template: `<LinkButton :mode="args.buttonPreviewMode" example="sidebarlayouts-pages" name="sidebar-with-header-story">
    <SidebarWithHeader />
    </LinkButton>`,
    transform: () => `<script setup lang="ts">
    import { ref } from 'vue';
    import { Mesh } from '@internal';
    import { SAccordion, SModalLeft } from '../../../components/spartan';
    import { Bars3Icon } from '@heroicons/vue/24/outline';
    import MySidebar from './MySidebar.vue';
    
    const open = ref(true);
    const value = ref('Dashboard');
    </script>
    
    <template>
        <div class="flex h-full">
            <SAccordion :open="open" class="hidden lg:block">
                <MySidebar v-model="value" />
            </SAccordion>
    
            <SModalLeft breakpoint="lg" :open="open" @close="() => (open = false)">
                <MySidebar v-model="value" />
            </SModalLeft>
    
            <div class="flex flex-1 flex-col items-start bg-gray-100 font-bold text-gray-600">
                <nav class="flex w-full items-center border-b border-gray-200 p-5">
                    <button @click="open = !open"><Bars3Icon class="relative h-6 w-6 text-gray-400" /></button>
                </nav>
                <main class="h-full w-full py-10">
                    <div class="h-full w-full px-4 sm:px-6 lg:px-8">
    
                        <!-- Example content -->
                        <Mesh class="p-4">
                            <p class="absolute left-1/2 top-1/2 -translate-x-1/2">{{ value }}</p>
                        </Mesh>
                    </div>
                </main>
            </div>
        </div>
    </template>
    `,
});

export const OnlySidebarStory = createDefault({
    design: 'https://www.figma.com/file/L7Q1hYhhz42H3zHPngVnbw/Accounts-V2?type=design&node-id=408-1756',
    containerClass: 'h-full w-full',
    components: { LinkButton, OnlySidebar },
    args: { buttonPreviewMode: true },
    template: `<LinkButton :mode="args.buttonPreviewMode" example="sidebarlayouts-pages" name="only-sidebar">
    <OnlySidebar />
    </LinkButton>`,
    transform: () => `<script setup lang="ts">
    import { ref } from 'vue';
    import { Mesh } from '@internal';
    import { SAccordion, SModalLeft } from '../../../components/spartan';
    import { Bars3Icon } from '@heroicons/vue/24/outline';
    import MySidebar from './MySidebar.vue';
    
    const open = ref(true);
    const value = ref('Dashboard');
    </script>
    
    <template>
        <div class="flex h-full">
            <SAccordion :open="open" class="hidden lg:block">
                <MySidebar v-model="value" />
            </SAccordion>
    
            <SModalLeft breakpoint="lg" :open="open" @close="() => (open = false)">
                <MySidebar v-model="value" />
            </SModalLeft>
    
            <main class="flex flex-1 items-start py-10 font-bold text-gray-600">
                <div class="px-4 sm:px-6 lg:px-8 h-full w-full">
    
                    <!-- Example content -->
                    <Mesh class="p-4">
                        <button @click="open = !open"><Bars3Icon class="relative h-6 w-6 text-gray-400" /></button>
                        <p class="absolute left-1/2 top-1/2 -translate-x-1/2">{{ value }}</p>
                    </Mesh>
                </div>
            </main>
        </div>
    </template>`,
});
