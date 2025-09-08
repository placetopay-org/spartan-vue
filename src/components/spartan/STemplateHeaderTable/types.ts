export type TTemplateHeaderTableProps = {
    title: string;
};

export type TTemplateHeaderTableEmits = {
    (e: 'search', query: string): void;
};
