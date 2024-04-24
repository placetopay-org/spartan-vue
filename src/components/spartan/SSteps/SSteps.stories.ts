import SSteps from './SSteps.vue';
import SStepsItem from './SStepsItem.vue';
import { buildSourceBinding, createDefault, createHistory, createVariation } from '@/helpers';

export default {
    component: SSteps,
    title: 'navigation/Steps',
    ...createHistory({
        description: 'The steps component is used to navigate between pages.',
        props: [
            {
                name: 'variant',
                type: 'simple | circlesWithText',
                default: 'circlesWithText',
                options: ['simple', 'circlesWithText'],
                description: 'The variant of the steps style.',
            },
            {
                name: 'steps',
                type: 'TStep[]',
                default: '[]',
                description: 'The steps to display.',
            }
        ]
    }),
};

const sourceBinding = buildSourceBinding({});

export const Default = createDefault({
    components: { SSteps },
    template: `<SSteps v-bind="args" />`,
    transform: (args) => `<SSteps ${sourceBinding(args)} />`,
    args: {
        variant: 'circlesWithText',
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
    },
});

export const Base = createVariation({
    components: { SSteps, SStepsItem },
    template: `
<!-- Using props -->    
<SSteps>
    <SStepsItem name="Step 1" description="Step 1 description" href="#" status="complete" /> 
    <SStepsItem name="Step 2" description="Step 2 description" href="#" status="current" />
    <SStepsItem last name="Step 3" description="Step 3 description" href="#" status="upcoming" />   
</SSteps>

<!-- Using slots -->
<SSteps>
    <SStepsItem href="#" status="complete">
        Step 1
        <template #description>Step 1 description</template>
    </SStepsItem> 
    <SStepsItem href="#" status="current">
        Step 2
        <template #description>Step 2 description</template>
    </SStepsItem> 
    <SStepsItem last href="#" status="upcoming">
        Step 3
        <template #description>Step 3 description</template>
    </SStepsItem> 
</SSteps>

<!-- Using step array -->
<SSteps :steps="[
    {
        name: 'Step 1',
        description: 'Step 1 description',
        href: '#',
        status: 'complete',
    },
    {
        name: 'Step 2',
        description: 'Step 2 description',
        href: '#',
        status: 'current',
    },
    {
        name: 'Step 3',
        description: 'Step 3 description',
        href: '#',
        status: 'upcoming',
    },
]"/>`,
});


export const Custom = createVariation({
    components: { SSteps, SStepsItem },
    template: `<SSteps>
    <SStepsItem href="#" status="complete">Step 1</SStepsItem> 
    <SStepsItem href="#" status="current">
        Step 2
        <template #description>Step 2 description</template>
    </SStepsItem> 
    <SStepsItem last href="#" status="upcoming">
        <template #description>Step 3 description</template>
    </SStepsItem> 
</SSteps>`,
});
