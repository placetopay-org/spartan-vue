import type { TOperatorId, TCustomOperator, TOptions, TInputType } from '../types';
import { Currencies } from '@/constants';

// Base interface configuration
export interface IBaseConfig {
    operators: (TOperatorId | TCustomOperator)[];
}

// Input interface configuration
export interface IInputConfig extends IBaseConfig {
    type?: TInputType;
    minorUnitMode?: boolean;
    currency?: keyof typeof Currencies;
    currencies?: (keyof typeof Currencies)[];
}

// Options interface configuration
export interface IOptionsConfig extends IBaseConfig {
    options: TOptions;
    multiple?: boolean;
}

// Selection interface configuration
export interface ISelectionConfig extends IBaseConfig {
    operators: (TOperatorId | TCustomOperator)[];
}
