import { SSteps } from '../index';

export default {
    title: 'Components/SSteps',
    component: SSteps,
    decorators: [
        () => ({
            template: '<div class="border-none"><story /></div>',
        }),
    ],
};

const Template = (args) => ({
    components: { SSteps },
    setup() {
        return { args };
    },
    template: `
  <SSteps :steps="args.steps"/>
    `,
});

export const Default = Template.bind({});

Default.args = {
    steps: [
        {
            name: 'Create account',
            description: 'Vitae sed mi luctus laoreet.',
            href: '#',
            status: 'complete',
        },
        {
            name: 'Profile information',
            description: 'Cursus semper viverra facilisis et et some more.',
            href: '#',
            status: 'current',
        },
        {
            name: 'Business information',
            description: 'Penatibus eu quis ante.',
            href: '#',
            status: 'upcoming',
        },
        {
            name: 'Theme',
            description: 'Faucibus nec enim leo et.',
            href: '#',
            status: 'upcoming',
        },
        {
            name: 'Preview',
            description: 'Iusto et officia maiores porro ad non quas.',
            href: '#',
            status: 'upcoming',
        },
    ],
};
