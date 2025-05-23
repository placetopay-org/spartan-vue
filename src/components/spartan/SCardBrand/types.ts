import { brandName } from './constants';

export type TCardBrandProps = {
    name: (typeof brandName)[number];
    class?: string;
    size?: number;
};
