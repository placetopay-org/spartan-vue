export type ComponentCategory = 'dataInput' | 'selectors' | 'display' | 'modals' | 'structure' | 'utilities';

export interface ComponentStatusData {
    name: string;
    slug: string;
    category: ComponentCategory;
    typescript: boolean;
    darkMode: boolean;
    responsive: boolean;
    tests: number;
    docs: 'complete' | 'partial' | 'minimal';
}

export const components: ComponentStatusData[] = [
    // Data Input
    { name: 'SInput', slug: 'input', category: 'dataInput', typescript: false, darkMode: false, responsive: false, tests: 0, docs: 'minimal' },
    { name: 'SInputAmount', slug: 'input-amount', category: 'dataInput', typescript: false, darkMode: false, responsive: false, tests: 0, docs: 'minimal' },
    { name: 'SInputDate', slug: 'input-date', category: 'dataInput', typescript: false, darkMode: false, responsive: false, tests: 0, docs: 'minimal' },
    { name: 'SInputIncrement', slug: 'input-increment', category: 'dataInput', typescript: false, darkMode: false, responsive: false, tests: 0, docs: 'minimal' },
    { name: 'SInputMask', slug: 'input-mask', category: 'dataInput', typescript: false, darkMode: false, responsive: false, tests: 0, docs: 'minimal' },
    { name: 'SInputOtp', slug: 'input-otp', category: 'dataInput', typescript: false, darkMode: false, responsive: false, tests: 0, docs: 'minimal' },
    { name: 'SInputPassword', slug: 'input-password', category: 'dataInput', typescript: false, darkMode: false, responsive: false, tests: 0, docs: 'minimal' },
    { name: 'SInputTag', slug: 'input-tag', category: 'dataInput', typescript: false, darkMode: false, responsive: false, tests: 0, docs: 'minimal' },
    { name: 'STextarea', slug: 'textarea', category: 'dataInput', typescript: false, darkMode: false, responsive: false, tests: 0, docs: 'minimal' },
    { name: 'SCombobox', slug: 'combobox', category: 'dataInput', typescript: false, darkMode: false, responsive: false, tests: 0, docs: 'minimal' },
    { name: 'SSelect', slug: 'select', category: 'dataInput', typescript: false, darkMode: false, responsive: false, tests: 0, docs: 'minimal' },

    // Selectors
    { name: 'SCheckbox', slug: 'checkbox', category: 'selectors', typescript: false, darkMode: false, responsive: false, tests: 0, docs: 'minimal' },
    { name: 'SRadio', slug: 'radio', category: 'selectors', typescript: false, darkMode: false, responsive: false, tests: 0, docs: 'minimal' },
    { name: 'SRadioGroup', slug: 'radio-group', category: 'selectors', typescript: false, darkMode: false, responsive: false, tests: 0, docs: 'minimal' },
    { name: 'SSwitch', slug: 'switch', category: 'selectors', typescript: false, darkMode: false, responsive: false, tests: 0, docs: 'minimal' },
    { name: 'SSelector', slug: 'selector', category: 'selectors', typescript: false, darkMode: false, responsive: false, tests: 0, docs: 'minimal' },
    { name: 'SMultiSelector', slug: 'multi-selector', category: 'selectors', typescript: false, darkMode: false, responsive: false, tests: 0, docs: 'minimal' },

    // Display
    { name: 'SAlert', slug: 'alert', category: 'display', typescript: false, darkMode: false, responsive: false, tests: 0, docs: 'minimal' },
    { name: 'SAvatar', slug: 'avatar', category: 'display', typescript: false, darkMode: false, responsive: false, tests: 0, docs: 'minimal' },
    { name: 'SBadge', slug: 'badge', category: 'display', typescript: false, darkMode: false, responsive: false, tests: 0, docs: 'minimal' },
    { name: 'SCard', slug: 'card', category: 'display', typescript: false, darkMode: false, responsive: false, tests: 0, docs: 'minimal' },
    { name: 'SCardBrand', slug: 'card-brand', category: 'display', typescript: false, darkMode: false, responsive: false, tests: 0, docs: 'minimal' },
    { name: 'SCaption', slug: 'caption', category: 'display', typescript: false, darkMode: false, responsive: false, tests: 0, docs: 'minimal' },
    { name: 'SLink', slug: 'link', category: 'display', typescript: false, darkMode: false, responsive: false, tests: 0, docs: 'minimal' },
    { name: 'SToast', slug: 'toast', category: 'display', typescript: false, darkMode: false, responsive: false, tests: 0, docs: 'minimal' },
    { name: 'SBreadcrumbs', slug: 'breadcrumbs', category: 'display', typescript: false, darkMode: false, responsive: false, tests: 0, docs: 'minimal' },
    { name: 'SSkeleton', slug: 'skeleton', category: 'display', typescript: false, darkMode: false, responsive: false, tests: 0, docs: 'minimal' },
    { name: 'SPageTitle', slug: 'page-title', category: 'display', typescript: false, darkMode: false, responsive: false, tests: 0, docs: 'minimal' },
    { name: 'SPlacetopayLogo', slug: 'placetopay-logo', category: 'display', typescript: false, darkMode: false, responsive: false, tests: 0, docs: 'minimal' },

    // Modals
    { name: 'SModal', slug: 'modal', category: 'modals', typescript: false, darkMode: false, responsive: false, tests: 0, docs: 'minimal' },
    { name: 'SModalCard', slug: 'modal-card', category: 'modals', typescript: false, darkMode: false, responsive: false, tests: 0, docs: 'minimal' },
    { name: 'SModalConfirm', slug: 'modal-confirm', category: 'modals', typescript: false, darkMode: false, responsive: false, tests: 0, docs: 'minimal' },
    { name: 'SModalLeft', slug: 'modal-left', category: 'modals', typescript: false, darkMode: false, responsive: false, tests: 0, docs: 'minimal' },
    { name: 'SModalSide', slug: 'modal-side', category: 'modals', typescript: false, darkMode: false, responsive: false, tests: 0, docs: 'minimal' },
    { name: 'SPopover', slug: 'popover', category: 'modals', typescript: false, darkMode: false, responsive: false, tests: 0, docs: 'minimal' },
    { name: 'STooltip', slug: 'tooltip', category: 'modals', typescript: false, darkMode: false, responsive: false, tests: 0, docs: 'minimal' },
    { name: 'SDropdown', slug: 'dropdown', category: 'modals', typescript: false, darkMode: false, responsive: false, tests: 0, docs: 'minimal' },

    // Structure
    { name: 'SAccordion', slug: 'accordion', category: 'structure', typescript: false, darkMode: false, responsive: false, tests: 0, docs: 'minimal' },
    { name: 'SSidebar', slug: 'sidebar', category: 'structure', typescript: false, darkMode: false, responsive: false, tests: 0, docs: 'minimal' },
    { name: 'STab', slug: 'tab', category: 'structure', typescript: false, darkMode: false, responsive: false, tests: 0, docs: 'minimal' },
    { name: 'STable', slug: 'table', category: 'structure', typescript: false, darkMode: false, responsive: false, tests: 0, docs: 'minimal' },
    { name: 'SDTable', slug: 'dtable', category: 'structure', typescript: false, darkMode: false, responsive: false, tests: 0, docs: 'minimal' },
    { name: 'STemplateHeaderTable', slug: 'template-header-table', category: 'structure', typescript: false, darkMode: false, responsive: false, tests: 0, docs: 'minimal' },
    { name: 'SSteps', slug: 'steps', category: 'structure', typescript: false, darkMode: false, responsive: false, tests: 0, docs: 'minimal' },
    { name: 'SPaginator', slug: 'paginator', category: 'structure', typescript: false, darkMode: false, responsive: false, tests: 0, docs: 'minimal' },
    { name: 'SStackedList', slug: 'stacked-list', category: 'structure', typescript: false, darkMode: false, responsive: false, tests: 0, docs: 'minimal' },
    { name: 'SButtonGroup', slug: 'button-group', category: 'structure', typescript: false, darkMode: false, responsive: false, tests: 0, docs: 'minimal' },

    // Utilities
    { name: 'SButton', slug: 'button', category: 'utilities', typescript: true, darkMode: false, responsive: true, tests: 85, docs: 'complete' },
    { name: 'SLabel', slug: 'label', category: 'utilities', typescript: true, darkMode: false, responsive: false, tests: 0, docs: 'complete' },
    { name: 'SFilter', slug: 'filter', category: 'utilities', typescript: false, darkMode: false, responsive: false, tests: 0, docs: 'minimal' },
    { name: 'SSectionTitle', slug: 'section-title', category: 'utilities', typescript: true, darkMode: false, responsive: false, tests: 0, docs: 'complete' },
    { name: 'SSectionDescription', slug: 'section-description', category: 'utilities', typescript: true, darkMode: false, responsive: false, tests: 0, docs: 'complete' },
    { name: 'SCopy', slug: 'copy', category: 'utilities', typescript: true, darkMode: false, responsive: false, tests: 0, docs: 'complete' },
];

const statusMap = new Map(components.map((c) => [c.slug, c]));

export function getStatusBySlug(slug: string): ComponentStatusData | undefined {
    return statusMap.get(slug);
}
