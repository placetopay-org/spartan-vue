import type { ClassNameValue } from "tailwind-merge";

export type TDefinitionTermProps = {
    class?: ClassNameValue;
    labels?: string | string[];
    description?: string;
    oneline?: boolean;
};
