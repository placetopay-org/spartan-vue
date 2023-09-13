import { STabs, STab } from '../index';

export default {
    title: 'Components/STabs',
    component: STabs,
    decorators: [
        () => ({
            template: '<div class="max-w-2xl border-none bg-gray-100 py-12 px-8"><story /></div>',
        }),
    ],
    subcomponents: { STab },
};

const Template = (args) => ({
    components: { STabs, STab },
    setup() {
        return { args };
    },
    template: `
    <STabs>
        <STab 
            v-for="(tab, index) in args.tabs" 
            :name="tab.name"
            :href="tab.href"
            :active="tab.active"
        >
        </STab>
    </STabs>
  `,
});

export const Default = Template.bind({});

Default.args = {
    tabs: [
        { name: 'My Account', href: '#', active: false },
        { name: 'Team Members', href: '#', active: true },
        { name: 'Billing', href: '#', active: false },
    ],
};
