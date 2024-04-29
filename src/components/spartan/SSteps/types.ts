type TVariant = 'simple' | 'circlesWithText';

export type TStepsItemsProps = {
    status: 'complete' | 'current' | 'upcoming';
    href: string;
    name?: string;
    description?: string;
    last?: boolean;
};

export type TStepsProps = {
    variant?: TVariant;
    steps?: TStepsItemsProps[];
};

export type TApiState = {
    variant: TVariant;
};

export type TStepItemData = TStepsItemsProps & {
    isComplete: boolean;
    isCurrent: boolean;
    isUpcoming: boolean;
    ariaCurrent: { 'aria-current': 'step' } | undefined;
    hasName: false | { slot: boolean };
    hasDescription: false | { slot: boolean };
    hasOnlyOneSlot: boolean | { slot: boolean };
};
