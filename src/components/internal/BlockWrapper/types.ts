// TODO: vite plugin prevents splitting types
// export type TBlockWrapperPropsWithLabel = {
//     id: string;
//     label: string;
//     helpText?: string;
//     errorText?: string;
// };

// export type TBlockWrapperPropsWithoutLabel = {
//     id?: string;
//     helpText?: string;
//     errorText?: string;
// };

// export type TBlockWrapperProps = TBlockWrapperPropsWithLabel | TBlockWrapperPropsWithoutLabel;

export type TBlockWrapperProps = {
    id?: string;
    label?: string;
    helpText?: string;
    errorText?: string;
};
