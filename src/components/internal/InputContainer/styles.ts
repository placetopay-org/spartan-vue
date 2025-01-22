import { cva } from 'class-variance-authority';
import { createBooleanVariation as cbv, roundedClass } from '@/helpers';
import { roundedStyle } from '@/constants';

export const containerStyles = cva('relative flex items-center gap-2 bg-white border', {
    variants: {
        disabled: cbv('opacity-50 cursor-not-allowed'),
        error: cbv('border-red-500 focus-within:s-ring-error', 'border-gray-300 focus-within:s-ring'),
        rounded: roundedStyle,
    },
});

export const inputStyles = cva(
    'w-full border-none p-0 text-gray-900 outline-none placeholder:text-gray-400 focus:ring-0',
    {
        variants: {
            rounded: roundedClass
        }
    }
);



// export const inputStyle = {
//     root: 'w-full outline-none focus:outline-none',
//     background: 'bg-white',
//     disabled: 'opacity-50 cursor-not-allowed',
//     padding: 'px-3 py-1.5',
//     text: 'text-gray-900 font-normal',
//     placeholder: 'placeholder:text-gray-400',
//     rounded: 'rounded-lg',
//     border: {
//         base: 'border border-gray-300',
//         error: 'border border-red-500'
//     },
//     ring: {
//         base: 'focus-within:s-ring',
//         error: 'focus-within:s-ring-error'
//     }
// }
