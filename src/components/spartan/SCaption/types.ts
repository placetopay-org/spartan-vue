enum TVariant {
    error = 'error',
    info = 'info',
}

export type TCaptionProps = {
    text: string;
    variant: keyof typeof TVariant;
};
