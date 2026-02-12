export type ComponentCategory = 'dataInput' | 'selectors' | 'display' | 'modals' | 'structure' | 'utilities';

export interface ComponentStatusEntry {
    name: string;
    typescript?: boolean;
    darkMode?: boolean;
    responsive?: boolean;
    tests?: number;
    docs?: 'complete' | 'partial' | 'minimal';
}

export interface ComponentStatusData extends Required<ComponentStatusEntry> {
    slug: string;
    category: ComponentCategory;
}

/** Converts component name (e.g. 'SInputAmount') to route slug (e.g. 'input-amount') */
function nameToSlug(name: string): string {
    return name
        .slice(1) // Remove 'S' prefix
        .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
        .toLowerCase();
}

const defaults: Required<Omit<ComponentStatusEntry, 'name'>> = {
    typescript: false,
    darkMode: false,
    responsive: false,
    tests: 0,
    docs: 'minimal',
};

const componentsByCategory: Record<ComponentCategory, ComponentStatusEntry[]> = {
    dataInput: [
        { name: 'SInput' },
        { name: 'SInputAmount' },
        { name: 'SInputDate' },
        { name: 'SInputIncrement' },
        { name: 'SInputMask' },
        { name: 'SInputOtp' },
        { name: 'SInputPassword' },
        { name: 'SInputTag' },
        { name: 'STextarea' },
        { name: 'SCombobox' },
        { name: 'SSelect' },
    ],
    selectors: [
        { name: 'SCheckbox' },
        { name: 'SRadio' },
        { name: 'SRadioGroup' },
        { name: 'SSwitch' },
        { name: 'SSelector' },
        { name: 'SMultiSelector' },
    ],
    display: [
        { name: 'SAlert', typescript: true, docs: 'complete' },
        { name: 'SAvatar', typescript: true, docs: 'complete' },
        { name: 'SBadge', typescript: true, docs: 'complete' },
        { name: 'SCard', typescript: true, docs: 'complete' },
        { name: 'SCardBrand' },
        { name: 'SCaption' },
        { name: 'SLink' },
        { name: 'SToast' },
        { name: 'SBreadcrumbs' },
        { name: 'SSkeleton', typescript: true, docs: 'complete' },
        { name: 'SPageTitle' },
        { name: 'SPlacetopayLogo' },
    ],
    modals: [
        { name: 'SModal' },
        { name: 'SModalCard' },
        { name: 'SModalConfirm' },
        { name: 'SModalLeft' },
        { name: 'SModalSide' },
        { name: 'SPopover' },
        { name: 'STooltip' },
        { name: 'SDropdown' },
    ],
    structure: [
        { name: 'SAccordion' },
        { name: 'SSidebar' },
        { name: 'STab' },
        { name: 'STable' },
        { name: 'SDTable' },
        { name: 'STemplateHeaderTable' },
        { name: 'SSteps' },
        { name: 'SPaginator' },
        { name: 'SStackedList' },
        { name: 'SButtonGroup' },
    ],
    utilities: [
        { name: 'SButton', typescript: true, docs: 'complete' },
        { name: 'SLabel', typescript: true, docs: 'complete' },
        { name: 'SFilter', typescript: true, docs: 'complete' },
        { name: 'SSectionTitle', typescript: true, docs: 'complete' },
        { name: 'SSectionDescription', typescript: true, docs: 'complete' },
        { name: 'SCopy', typescript: true, docs: 'complete' },
    ],
};

export const components: ComponentStatusData[] = Object.entries(componentsByCategory).flatMap(
    ([category, entries]) =>
        entries.map((entry) => ({
            ...defaults,
            ...entry,
            slug: nameToSlug(entry.name),
            category: category as ComponentCategory,
        })),
);

const statusMap = new Map(components.map((c) => [c.slug, c]));

export function getStatusBySlug(slug: string): ComponentStatusData | undefined {
    return statusMap.get(slug);
}
