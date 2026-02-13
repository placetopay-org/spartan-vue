export type ComponentCategory = 'dataInput' | 'selectors' | 'display' | 'modals' | 'structure' | 'utilities';

export interface ComponentImprovements {
    en: string;
    es: string;
}

export interface ComponentStatusEntry {
    name: string;
    typescript?: boolean;
    darkMode?: boolean;
    responsive?: boolean;
    tests?: number;
    docs?: 'complete' | 'partial' | 'minimal';
    figmaLink?: string;
    improvements?: ComponentImprovements;
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
    figmaLink: '',
    improvements: { en: '', es: '' },
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
        { name: 'SAlert', typescript: true, tests: 100, docs: 'complete' },
        { name: 'SAvatar', typescript: true, docs: 'complete', figmaLink: 'https://www.figma.com/design/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?node-id=200-1795&p=f', tests: 100 },
        {
            name: 'SBadge',
            typescript: true,
            docs: 'complete',
            figmaLink: 'https://www.figma.com/design/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?node-id=220-2083&p=f',
            tests: 100,
            improvements: {
                en: '- Outline mode should be transparent\n- Cursor pointer for the remove button',
                es: '- El modo outline debe ser transparente\n- Cursor pointer para el botón remover',
            },
        },
        { name: 'SCard', typescript: true, docs: 'complete', figmaLink: 'https://www.figma.com/design/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?node-id=272-4850&p=f', tests: 90 },
        { name: 'SCardBrand' },
        { name: 'SCaption' },
        { name: 'SLink' },
        { name: 'SToast' },
        { name: 'SBreadcrumbs' },
        { name: 'SSkeleton', typescript: true, darkMode: true, responsive: true, tests: 100, docs: 'complete' },
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
        {
            name: 'SButton',
            tests: 100,
            typescript: true,
            figmaLink: 'https://www.figma.com/design/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?node-id=146-240',
            docs: 'complete',
            improvements: {
                en: '- Improve loading mode icon\n- Add new Figma variants\n- Unify dimensions and spacing',
                es: '- Mejorar el icono del modo loading\n- Agregar variantes nuevas de figma\n- Unificar las dimensiones y espaciados',
            },
        },
        { name: 'SLabel', tests: 100, typescript: true, docs: 'complete' },
        {
            name: 'SFilter',
            typescript: true,
            tests: 67,
            docs: 'partial',
            improvements: {
                en: '- Optimize source code\n- Decouple reserved operators from custom ones\n- Improve multiple popovers handling',
                es: '- Optimizar el código fuente\n- Desacomplar los operadores reservados de los personalizados\n- Mejorar el manejo de múltiples popovers',
            },
        },
        { name: 'SSectionTitle', tests: 100, typescript: true, docs: 'complete' },
        { name: 'SSectionDescription', tests: 100, typescript: true, docs: 'complete' },
        { name: 'SCopy', tests: 62, typescript: true, docs: 'complete' },
    ],
};

export const components: ComponentStatusData[] = Object.entries(componentsByCategory).flatMap(([category, entries]) =>
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
