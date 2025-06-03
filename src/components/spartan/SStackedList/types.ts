import type { Component } from 'vue';
import type { ClassNameValue } from 'tailwind-merge';

export type TStackedListProps = {
    class?: ClassNameValue;
};

export type TStackedListItemProps = {
    class?: ClassNameValue;
    icon?: Component;
};
