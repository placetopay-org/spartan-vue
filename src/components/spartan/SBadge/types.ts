export type TBadgeEmits = {
    (event: 'removed'): void;
};

export type TBadgeProps = {
    color?: 'gray' | 'white' | 'primary'  | 'red' | 'blue' | 'green' | 'yellow' | 'indigo' | 'purlpe' | 'neutral';
    dot?: boolean;
    outline?: boolean;
    pill?: boolean;
    removable?: boolean;
    size?: 'sm' | 'md' | 'lg';
    reverse?: boolean;
    class?: string;
};
