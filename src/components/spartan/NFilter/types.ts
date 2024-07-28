export type TInterfaceId = 'none' | 'oneInput' | 'twoInputs' | 'options';

export type TField = {
    id: string;
    name: string;
    permanent?: boolean;
    interfaces: {
        none?: any;
        oneInput?: any;
        twoInputs?: any;
        options?: any;
    };
    state?: {
        operator: string;
        value: any;
    };
};

export type NFilterProps = {
    fields: TField[];
    hideApplyButton?: boolean;
    hideClearButton?: boolean;
    applyWhenClear?: boolean;
    immediateApply?: boolean;
    notResponsive?: boolean;
};

export type NFilterEmits = {
    (event: 'apply', fields: Omit<TField, 'interfaces'>[] | undefined): void;
};