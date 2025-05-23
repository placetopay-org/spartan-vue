export type TBadgeEmits = {
    (event: 'removed'): void;
};

export type TBadgeProps = {
    color?: 'gray' | 'white' | 'primary' | 'red' | 'blue' | 'green' | 'yellow' | 'indigo' | 'purple' | 'neutral';
    dot?: boolean;
    outline?: boolean;
    pill?: boolean;
    removable?: boolean | 'stopPropagation';
    size?: 'sm' | 'md' | 'lg';
    reverse?: boolean;
    class?: string;
};
