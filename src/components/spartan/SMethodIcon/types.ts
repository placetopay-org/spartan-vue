import { methodName } from './constants';

export type TMethodIconProps = {
    name: typeof methodName[number];
    class?: string;
    size?: number;
};
