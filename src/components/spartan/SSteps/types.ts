export type TStepsProps = {
    steps: Array<{
        name: string;
        href: string;
        description: string;
        status: 'complete' | 'current' | 'upcoming';
    }>;
};
