import { type FunctionalComponent } from 'vue';

export type TDropdownProps = {
    leftToRight: boolean;
};

export type TDropdownItemProps = {
    disabled: boolean;
    icon: FunctionalComponent;
}
