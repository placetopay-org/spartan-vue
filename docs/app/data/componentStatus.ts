export type ComponentCategory =
    | 'dataInput'
    | 'selectors'
    | 'display'
    | 'modals'
    | 'structure'
    | 'utilities'
    | 'typography';

export interface ComponentImprovements {
    en: string;
    es: string;
}

export interface ComponentStatusEntry {
    name: string;
    typescript?: boolean;
    jsdoc?: boolean;
    darkMode?: boolean;
    responsive?: boolean;
    tests?: number;
    docs?: 'complete' | 'partial' | 'minimal';
    figmaLink?: string;
    improvements?: ComponentImprovements;
    hasBlock?: boolean;
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
    jsdoc: false,
    darkMode: false,
    responsive: false,
    tests: 0,
    docs: 'minimal',
    figmaLink: '',
    improvements: { en: '', es: '' },
    hasBlock: false,
};

const componentsByCategory: Record<ComponentCategory, ComponentStatusEntry[]> = {
    dataInput: [
        {
            name: 'SInput',
            typescript: true,
            jsdoc: true,
            tests: 100,
            docs: 'complete',
            darkMode: true,
            responsive: true,
            hasBlock: true,
            figmaLink:
                'https://www.figma.com/design/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?node-id=13016-16548&t=SeafmOCyazOmoll4-4',
        },
        { name: 'SInputAmount', typescript: true, jsdoc: true, darkMode: true, responsive: true, tests: 65, docs: 'partial', hasBlock: true },
        { name: 'SInputDate', typescript: true, jsdoc: true, darkMode: true, responsive: true, tests: 75, docs: 'complete', hasBlock: true },
        { name: 'SInputIncrement', typescript: true, jsdoc: true, darkMode: true, responsive: true, docs: 'complete', hasBlock: true },
        { name: 'SInputMask', typescript: true, jsdoc: true, darkMode: true, responsive: true, docs: 'complete', hasBlock: true },
        { name: 'SInputOtp', typescript: true, jsdoc: true, darkMode: true, responsive: true, docs: 'complete', hasBlock: true },
        { name: 'SInputPassword', typescript: true, jsdoc: true, darkMode: true, responsive: true, docs: 'complete', hasBlock: true },
        { name: 'SInputTag', typescript: true, jsdoc: true, darkMode: true, responsive: true, docs: 'complete' },
        { name: 'STextarea', typescript: true, jsdoc: true, darkMode: true, responsive: true, docs: 'complete', hasBlock: true },
        { name: 'SCombobox', typescript: true, jsdoc: true, darkMode: true, responsive: true, docs: 'complete', hasBlock: true },
        {
            name: 'SSelect',
            typescript: true,
            jsdoc: true,
            tests: 100,
            docs: 'complete',
            darkMode: true,
            responsive: true,
            hasBlock: true,
        },
    ],
    selectors: [
        {
            name: 'SCheckbox',
            typescript: true,
            jsdoc: true,
            darkMode: true,
            responsive: true,
            tests: 100,
            docs: 'complete',
            figmaLink:
                'https://www.figma.com/design/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?node-id=12935-3756&t=SeafmOCyazOmoll4-4',
        },
        {
            name: 'SRadio',
            typescript: true,
            jsdoc: true,
            darkMode: true,
            responsive: true,
            tests: 100,
            docs: 'complete',
            figmaLink:
                'https://www.figma.com/design/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?node-id=12949-10115&t=SeafmOCyazOmoll4-4',
        },
        {
            name: 'SRadioGroup',
            typescript: true,
            jsdoc: true,
            darkMode: true,
            responsive: true,
            tests: 100,
            docs: 'complete',
            figmaLink:
                'https://www.figma.com/design/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?node-id=15428-10742&t=YejrDL8k9HOQiEjj-4',
        },
        {
            name: 'SSwitch',
            typescript: true,
            jsdoc: true,
            darkMode: true,
            responsive: true,
            tests: 100,
            docs: 'complete',
            figmaLink:
                'https://www.figma.com/design/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?node-id=15423-19904&t=YejrDL8k9HOQiEjj-4',
        },
        {
            name: 'SSelector',
            typescript: true,
            jsdoc: true,
            darkMode: true,
            docs: 'partial',
            hasBlock: true,
            figmaLink: 'https://www.figma.com/design/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?node-id=13097-22397',
        },
        { name: 'SMultiSelector', typescript: true, docs: 'partial' },
    ],
    display: [
        { name: 'SAlert', typescript: true, jsdoc: true, tests: 100, docs: 'complete' },
        {
            name: 'SAvatar',
            typescript: true,
            jsdoc: true,
            darkMode: true,
            responsive: true,
            tests: 100,
            docs: 'complete',
            figmaLink: 'https://www.figma.com/design/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?node-id=200-1795&p=f',
        },
        {
            name: 'SBadge',
            typescript: true,
            jsdoc: true,
            docs: 'complete',
            figmaLink: 'https://www.figma.com/design/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?node-id=220-2083&p=f',
            tests: 100,
            darkMode: true,
            responsive: true,
        },
        {
            name: 'SCard',
            typescript: true,
            jsdoc: true,
            darkMode: true,
            responsive: true,
            docs: 'complete',
            figmaLink:
                'https://www.figma.com/design/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?node-id=15418-12723',
            tests: 90,
        },
        {
            name: 'SCardBrand',
            typescript: true,
            jsdoc: true,
            darkMode: true,
            tests: 50,
            docs: 'complete',
            figmaLink:
                'https://www.figma.com/design/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?node-id=4713-17011',
        },
        {
            name: 'SCaption',
            typescript: true,
            jsdoc: true,
            darkMode: true,
            responsive: true,
            tests: 100,
            docs: 'complete',
        },
        { name: 'SLink', typescript: true, tests: 100, docs: 'complete' },
        {
            name: 'SToast',
            typescript: true,
            jsdoc: true,
            darkMode: true,
            responsive: true,
            tests: 100,
            docs: 'complete',
            figmaLink:
                'https://www.figma.com/design/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?node-id=15399-15680&t=YejrDL8k9HOQiEjj-4',
        },
        {
            name: 'SBreadcrumbs',
            typescript: true,
            jsdoc: true,
            darkMode: true,
            responsive: true,
            tests: 100,
            docs: 'complete',
            figmaLink:
                'https://www.figma.com/design/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?node-id=4809-17317&t=nQ0CaPW3JnnNONVn-4',
        },
        { name: 'SSkeleton', typescript: true, darkMode: true, responsive: true, tests: 100, docs: 'complete' },
        {
            name: 'SPlacetopayLogo',
            typescript: true,
            jsdoc: true,
            darkMode: true,
            responsive: true,
            tests: 100,
            docs: 'complete',
            figmaLink:
                'https://www.figma.com/design/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?node-id=4713-16000',
        },
    ],
    modals: [
        { name: 'SModal', typescript: true, tests: 76, docs: 'partial' },
        { name: 'SModalCard', typescript: true, tests: 84, docs: 'partial' },
        {
            name: 'SModalConfirm',
            typescript: true,
            jsdoc: true,
            darkMode: true,
            responsive: true,
            docs: 'partial',
            figmaLink:
                'https://www.figma.com/design/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?node-id=12770-18720',
        },
        { name: 'SModalLeft', typescript: true, tests: 100, docs: 'complete' },
        { name: 'SModalSide', typescript: true, tests: 100, docs: 'complete' },
        { name: 'SPopover', typescript: true, tests: 61, docs: 'complete' },
        { name: 'STooltip', typescript: true, tests: 70, docs: 'partial' },
        { name: 'SDropdown', typescript: true, tests: 73, docs: 'complete' },
    ],
    structure: [
        { name: 'SAccordion', typescript: true, tests: 100, docs: 'complete' },
        { name: 'SSidebar', typescript: true, tests: 65, docs: 'partial' },
        {
            name: 'STab',
            typescript: true,
            jsdoc: true,
            darkMode: true,
            tests: 43,
            figmaLink: 'https://www.figma.com/design/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?node-id=15389-2514',
            docs: 'complete',
        },
        {
            name: 'STable',
            typescript: true,
            jsdoc: true,
            darkMode: true,
            responsive: true,
            tests: 73,
            docs: 'partial',
            figmaLink:
                'https://www.figma.com/design/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?node-id=4809-17871',
        },
        {
            name: 'SDTable',
            typescript: true,
            jsdoc: true,
            darkMode: true,
            responsive: true,
            tests: 86,
            docs: 'partial',
            figmaLink:
                'https://www.figma.com/design/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?node-id=4809-17871',
        },
        {
            name: 'STemplateHeaderTable',
            typescript: true,
            jsdoc: true,
            darkMode: true,
            responsive: true,
            docs: 'complete',
            figmaLink:
                'https://www.figma.com/design/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?node-id=4809-17871',
        },
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
            jsdoc: true,
            darkMode: true,
            responsive: true,
            figmaLink: 'https://www.figma.com/design/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?node-id=146-240',
            docs: 'complete',
        },
        {
            name: 'SLabel',
            tests: 100,
            typescript: true,
            jsdoc: true,
            darkMode: true,
            responsive: true,
            docs: 'complete',
            figmaLink:
                'https://www.figma.com/design/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?node-id=12877-21698&t=YejrDL8k9HOQiEjj-4',
        },
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
        {
            name: 'SCopy',
            tests: 62,
            typescript: true,
            jsdoc: true,
            darkMode: true,
            docs: 'complete',
            figmaLink:
                'https://www.figma.com/design/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?node-id=15446-11314',
        },
    ],
    typography: [
        {
            name: 'SPageTitle',
            responsive: true,
            typescript: true,
            jsdoc: true,
            tests: 100,
            docs: 'complete',
            darkMode: true,
            figmaLink:
                'https://www.figma.com/design/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?node-id=12877-21698&t=nQ0CaPW3JnnNONVn-4',
        },
        {
            name: 'SSectionTitle',
            tests: 100,
            typescript: true,
            jsdoc: true,
            darkMode: true,
            responsive: true,
            docs: 'complete',
            figmaLink:
                'https://www.figma.com/design/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?node-id=12877-21698&t=YejrDL8k9HOQiEjj-4',
        },
        {
            name: 'SSectionDescription',
            tests: 100,
            typescript: true,
            jsdoc: true,
            darkMode: true,
            responsive: true,
            docs: 'complete',
            figmaLink:
                'https://www.figma.com/design/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?node-id=12877-21698&t=YejrDL8k9HOQiEjj-4',
        },
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
