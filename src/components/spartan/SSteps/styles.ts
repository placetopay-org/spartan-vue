import { cva, type VariantProps } from 'class-variance-authority';

export type TContainerStyles = VariantProps<typeof containerStyles>;
export const containerStyles = cva('', {
    variants: {
        variant: {
            simple: [
                'space-y-4 md:flex md:space-x-8 md:space-y-0',
            ],
            circlesWithText: [
                'overflow-hidden',
            ],
        },
    },
});

export type TIndicatorStyles = VariantProps<typeof indicatorStyle>;
export const indicatorStyle = cva('relative z-10 flex h-8 w-8 items-center justify-center rounded-full', {
    variants: {
        status: {
            complete: [
                'bg-primary-500 group-hover:bg-primary-700',
            ],
            current: [
                'border-2 border-primary-500 bg-white',
            ],
            upcoming: [
                'border-2 border-gray-300 bg-white group-hover:border-gray-400',
            ],
        },
    },
});
