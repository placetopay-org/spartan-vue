export type ComponentCategory = 'dataInput' | 'selectors' | 'display' | 'modals' | 'structure' | 'utilities' | 'typography';

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
        { name: 'SInput', typescript: true, tests: 85, docs: 'complete' },
        { name: 'SInputAmount', typescript: true, tests: 65, docs: 'partial' },
        { name: 'SInputDate', typescript: true, docs: 'complete' },
        { name: 'SInputIncrement', typescript: true, docs: 'complete' },
        { name: 'SInputMask', typescript: true, docs: 'complete' },
        { name: 'SInputOtp', typescript: true, docs: 'complete' },
        { name: 'SInputPassword', typescript: true, docs: 'complete' },
        { name: 'SInputTag', typescript: true, docs: 'complete' },
        { name: 'STextarea', typescript: true, docs: 'complete' },
        { name: 'SCombobox', typescript: true, docs: 'complete' },
        { name: 'SSelect', typescript: true, docs: 'complete' },
    ],
    selectors: [
        {
            name: 'SCheckbox',
            typescript: true,
            tests: 94,
            docs: 'complete',
            improvements: {
                en: 'Review the inline mode that leaves no space between the label and the description',
                es: 'Revisar el modo inline que no deja espacio entre el label y la descripción',
            },
        },
        {
            name: 'SRadio',
            typescript: true,
            tests: 100,
            docs: 'complete',
            improvements: {
                en: 'Review the inline mode that leaves no space between the label and the description',
                es: 'Revisar el modo inline que no deja espacio entre el label y la descripción',
            },
        },
        { name: 'SRadioGroup', typescript: true, tests: 100, docs: 'partial' },
        { name: 'SSwitch', typescript: true, tests: 100, docs: 'partial' },
        { name: 'SSelector', typescript: true, docs: 'partial' },
        { name: 'SMultiSelector', typescript: true, docs: 'partial' },
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
        { name: 'SCardBrand', typescript: true, tests: 50, docs: 'complete' },
        { name: 'SCaption', typescript: true, tests: 100, docs: 'complete' },
        { name: 'SLink', typescript: true, tests: 100, docs: 'complete' },
        { name: 'SToast', typescript: true, tests: 66, docs: 'complete' },
        { name: 'SBreadcrumbs', typescript: true, tests: 100, docs: 'complete' },
        { name: 'SSkeleton', typescript: true, darkMode: true, responsive: true, tests: 100, docs: 'complete' },
        { name: 'SPlacetopayLogo', typescript: true, tests: 100, docs: 'complete' },
    ],
    modals: [
        { name: 'SModal', typescript: true, tests: 76, docs: 'partial' },
        { name: 'SModalCard', typescript: true, tests: 84, docs: 'partial' },
        { name: 'SModalConfirm', typescript: true, docs: 'partial' },
        { name: 'SModalLeft', typescript: true, tests: 100, docs: 'complete' },
        { name: 'SModalSide', typescript: true, tests: 100, docs: 'complete' },
        { name: 'SPopover', typescript: true, tests: 61, docs: 'complete' },
        { name: 'STooltip', typescript: true, tests: 70, docs: 'partial' },
        { name: 'SDropdown', typescript: true, tests: 73, docs: 'complete' },
    ],
    structure: [
        { name: 'SAccordion', typescript: true, tests: 100, docs: 'complete' },
        { name: 'SSidebar', typescript: true, tests: 65, docs: 'partial' },
        { name: 'STab', typescript: true, tests: 43, docs: 'partial' },
        { name: 'STable', typescript: true, tests: 73, docs: 'partial' },
        { name: 'SDTable', typescript: true, tests: 86, docs: 'partial' },
        { name: 'STemplateHeaderTable', typescript: true, docs: 'complete' },
        { name: 'SSteps', typescript: true, docs: 'complete' },
        { name: 'SPaginator', typescript: true, docs: 'complete' },
        { name: 'SStackedList', typescript: true, docs: 'complete' },
        { name: 'SButtonGroup', typescript: true, docs: 'complete' },
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
        { name: 'SCopy', tests: 62, typescript: true, docs: 'complete' },
    ],
    typography: [
        { name: 'SPageTitle', typescript: true, tests: 100, docs: 'complete' },
        { name: 'SSectionTitle', tests: 100, typescript: true, docs: 'complete' },
        { name: 'SSectionDescription', tests: 100, typescript: true, docs: 'complete' },
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
