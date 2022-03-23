import { STabs, STab } from "../index";

export default {
    title: "Components/STabs",
    component: STabs,
    subcomponents: { STab },
};

const Template = ( args ) => ({
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
        </STabs>`,
});

export const Tabs = Template.bind({});

Tabs.args = {
    tabs: [
        { name: 'My Account', href: '#', active: false },
        { name: 'Company', href: '#', active: false },
        { name: 'Team Members', href: '#', active: false },
        { name: 'Billing', href: '#', active: true },
    ]
}