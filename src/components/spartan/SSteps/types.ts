export type TStepsItemsProps = {
    status: 'complete' | 'current' | 'upcoming';
    href: string;
    name?: string;
    description?: string;
    last?: boolean;
};

export type TStepsProps = {
    variant: 'simple' | 'circlesWithText';
    steps: TStepsItemsProps[];
};
