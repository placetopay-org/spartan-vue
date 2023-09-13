import { STabsLine } from '../index';
import { BuildingOfficeIcon, CreditCardIcon, UserIcon, UsersIcon } from '@heroicons/vue/20/solid';

export default {
    title: 'Components/STabsLine',
    component: STabsLine,
    decorators: [
        () => ({
            template: '<div class="border-none"><story /></div>',
        }),
    ],
};

const Template = (args) => ({
    components: { STabsLine },
    setup() {
        return { args };
    },
    template: `
    <STabsLine :tabs="args.tabs"/>
  `,
});

export const Default = Template.bind({});

Default.args = {
    tabs: [
        {
            name: 'My Account',
            href: '#',
            icon: UserIcon,
            number: 12,
            current: true,
        },
        { name: 'Company', href: '#', icon: BuildingOfficeIcon, current: false },
        { name: 'Team Members', href: '#', icon: UsersIcon, current: false },
        {
            name: 'Billing',
            href: '#',
            icon: CreditCardIcon,
            number: 2,
            current: false,
        },
    ],
};
