export type TCopyEmits = {
    (event: 'copied', value: string): void;
};

export type TCopyProps = {
    value?: string;
    class?: string;
};
