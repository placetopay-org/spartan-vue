import { STabs, STab } from "../index";

export default {
    title: "Example/Tabs",
    component: STabs,
};


const Template = ( tabs ) => ({
    components: { STabs, STab },
    setup() {
        return { tabs };
    },
    template:
        '<s-tabs>' +
            '<s-tab ' +
                'v-for="(tab, index) in tabs" ' +
                ':name="tab.name" ' +
                ':href="tab.href" ' +
                ':active="tab.active"' +
            '>' +
            '</s-tab>' +
        '</s-tabs>',
});

export const Tabs = Template.bind({});

Tabs.args = {
    Account: {name: 'My Account', href: '#', active: false},
    Company: {name: 'Company', href: '#', active: false},
    Members: {name: 'Team Members', href: '#', active: false},
    Billing: {name: 'Billing', href: '#', active: true},
}