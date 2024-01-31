export type TBadgeEmits = {
    (event: 'removed'): void;
};

export type TBadgeProps = {
    color: 'white' | 'primary' | 'gray' | 'red' | 'blue' | 'green' | 'yellow' | 'indigo';
    dot: boolean;
    outline: boolean;
    pill: boolean;
    removable: boolean;
    size: 'sm' | 'md' | 'lg';
    border: boolean;
};
