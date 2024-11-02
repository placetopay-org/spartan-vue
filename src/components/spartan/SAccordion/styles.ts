import { cbv } from "@/helpers";
import { cva } from "class-variance-authority";

const compoundOpen = (vertical: boolean, open: boolean, className: string): any => ({
    vertical,
    open,
    class: className,
});

export const accordionStyles = cva('grid', {
    variants: {
        vertical: cbv('[transition:_250ms_grid-template-rows_ease]', '[transition:_250ms_grid-template-columns_ease]'),
        open: cbv()
    },
    compoundVariants: [
        compoundOpen(true, true, '[grid-template-rows:1fr]'),
        compoundOpen(true, false, '[grid-template-rows:0fr]'),
        compoundOpen(false, true, '[grid-template-columns:1fr]'),
        compoundOpen(false, false, '[grid-template-columns:0fr]'),
    ]
});
