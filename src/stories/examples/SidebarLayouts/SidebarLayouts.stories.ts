import SidebarWithHeader from './SidebarWithHeader.vue';
import OnlySidebar from './OnlySidebar.vue';
import { createDefault } from '../../../helpers';

export default {
    title: 'examples/SidebarLayouts',
};

export const SidebarWithHeaderStory = createDefault({
    design: 'https://www.figma.com/file/L7Q1hYhhz42H3zHPngVnbw/Accounts-V2?type=design&node-id=408-1756',
    containerClass: 'h-full w-full',
    components: { SidebarWithHeader },
    args: {},
    template: `<SidebarWithHeader route="signup" />`,
    transform: () => `---`
});

export const OnlySidebarStory = createDefault({
    design: 'https://www.figma.com/file/L7Q1hYhhz42H3zHPngVnbw/Accounts-V2?type=design&node-id=408-1756',
    containerClass: 'h-full w-full',
    components: { OnlySidebar },
    args: {},
    template: `<OnlySidebar route="signup" />`,
    transform: () => `---`
});