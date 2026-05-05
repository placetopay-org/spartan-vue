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
        {
            name: 'SInputAmount',
            typescript: true,
            jsdoc: true,
            darkMode: true,
            responsive: true,
            tests: 100,
            docs: 'complete',
            hasBlock: true,
            figmaLink:
                'https://www.figma.com/design/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?node-id=15396-10732&t=YejrDL8k9HOQiEjj-4',
        },
        {
            name: 'SInputDate',
            typescript: true,
            jsdoc: true,
            darkMode: true,
            responsive: true,
            tests: 100,
            docs: 'complete',
            hasBlock: true,
            figmaLink:
                'https://www.figma.com/design/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?node-id=13102-10152&t=chH7DYdlsITfmdld-0',
        },
        {
            name: 'SInputIncrement',
            typescript: true,
            jsdoc: true,
            darkMode: true,
            responsive: true,
            tests: 100,
            docs: 'complete',
            hasBlock: true,
            figmaLink:
                'https://www.figma.com/design/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?node-id=15747-51821&t=UNarrVuzQ0KaP5NV-0',
        },
        {
            name: 'SInputMask',
            typescript: true,
            jsdoc: true,
            darkMode: true,
            responsive: true,
            tests: 100,
            docs: 'complete',
            hasBlock: true,
            figmaLink:
                'https://www.figma.com/design/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?node-id=15757-53181&t=G21EOo9VQkdC8FlW-0',
        },
        {
            name: 'SInputOtp',
            typescript: true,
            jsdoc: true,
            darkMode: true,
            responsive: true,
            tests: 90,
            docs: 'complete',
            hasBlock: true,
            figmaLink:
                'https://www.figma.com/design/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?node-id=13127-10907&t=chH7DYdlsITfmdld-0',
        },
        {
            name: 'SInputPassword',
            typescript: true,
            jsdoc: true,
            darkMode: true,
            responsive: true,
            tests: 84,
            docs: 'complete',
            hasBlock: true,
            figmaLink:
                'https://www.figma.com/design/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?node-id=13025-22609&t=chH7DYdlsITfmdld-0',
        },
        {
            name: 'SInputTag',
            typescript: true,
            jsdoc: true,
            darkMode: true,
            responsive: true,
            tests: 100,
            docs: 'complete',
            figmaLink:
                'https://www.figma.com/design/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?node-id=13134-8958&t=chH7DYdlsITfmdld-0',
        },
        {
            name: 'STextarea',
            typescript: true,
            jsdoc: true,
            darkMode: true,
            responsive: true,
            tests: 100,
            docs: 'complete',
            hasBlock: true,
            figmaLink:
                'https://www.figma.com/design/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?node-id=13110-19745&t=chH7DYdlsITfmdld-0',
        },
        {
            name: 'SSelect',
            typescript: true,
            jsdoc: true,
            tests: 100,
            docs: 'complete',
            darkMode: true,
            responsive: true,
            hasBlock: true,
            figmaLink:
                'https://www.figma.com/design/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?node-id=13097-22634&t=r5bgL3BUPfSEhXZn-0',
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
            responsive: true,
            tests: 47,
            docs: 'complete',
            hasBlock: true,
            figmaLink: 'https://www.figma.com/design/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?node-id=13097-22397',
        },
        {
            name: 'SMultiSelector',
            typescript: true,
            jsdoc: true,
            darkMode: true,
            responsive: true,
            tests: 43,
            docs: 'complete',
            figmaLink:
                'https://www.figma.com/design/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?node-id=15398-14522&t=YejrDL8k9HOQiEjj-4',
        },
    ],
    display: [
        {
            name: 'SAlert',
            typescript: true,
            jsdoc: true,
            darkMode: true,
            responsive: true,
            tests: 100,
            docs: 'complete',
            figmaLink:
                'https://www.figma.com/design/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?node-id=15399-15680&t=DcObZzVEgYYZURV0-4',
        },
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
            tests: 100,
        },
        {
            name: 'SCardBrand',
            typescript: true,
            jsdoc: true,
            darkMode: true,
            responsive: true,
            tests: 66,
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
            figmaLink:
                'https://www.figma.com/design/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?node-id=13014-16382&t=DcObZzVEgYYZURV0-4',
        },
        {
            name: 'SDefinitionTerm',
            typescript: true,
            jsdoc: true,
            darkMode: true,
            responsive: true,
            tests: 100,
            docs: 'complete',
            figmaLink:
                'https://www.figma.com/design/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?node-id=8742-7732&t=DcObZzVEgYYZURV0-4',
        },
        {
            name: 'SLink',
            typescript: true,
            jsdoc: true,
            darkMode: true,
            responsive: true,
            tests: 100,
            docs: 'complete',
            figmaLink:
                'https://www.figma.com/design/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?node-id=15738-27297&t=91RrLBvDNIZDvMwA-0',
        },
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
        {
            name: 'SSkeleton',
            typescript: true,
            jsdoc: true,
            darkMode: true,
            responsive: true,
            tests: 100,
            docs: 'complete',
            figmaLink:
                'https://www.figma.com/design/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?t=SGrVmYUPYOkyfMxN-0',
        },
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
        {
            name: 'SModal',
            typescript: true,
            jsdoc: true,
            darkMode: true,
            responsive: true,
            tests: 100,
            docs: 'complete',
            figmaLink:
                'https://www.figma.com/design/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?node-id=4841-26717&t=YejrDL8k9HOQiEjj-4',
        },
        {
            name: 'SModalCard',
            typescript: true,
            jsdoc: true,
            darkMode: true,
            responsive: true,
            tests: 92,
            docs: 'complete',
            figmaLink:
                'https://www.figma.com/design/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?node-id=4841-26717&t=YejrDL8k9HOQiEjj-4',
        },
        {
            name: 'SModalConfirm',
            typescript: true,
            jsdoc: true,
            darkMode: true,
            responsive: true,
            tests: 95,
            docs: 'complete',
            figmaLink:
                'https://www.figma.com/design/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?node-id=4841-26717&t=YejrDL8k9HOQiEjj-4',
        },
        {
            name: 'SModalLeft',
            typescript: true,
            jsdoc: true,
            darkMode: true,
            responsive: true,
            tests: 100,
            docs: 'complete',
            figmaLink:
                'https://www.figma.com/design/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?node-id=15540-8734&t=UYu9Xx4J3JNVcS7z-4',
        },
        {
            name: 'SModalSide',
            typescript: true,
            jsdoc: true,
            darkMode: true,
            responsive: true,
            tests: 100,
            docs: 'complete',
            figmaLink:
                'https://www.figma.com/design/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?node-id=15540-8734&t=UYu9Xx4J3JNVcS7z-4',
        },
        {
            name: 'SPopover',
            typescript: true,
            jsdoc: true,
            darkMode: true,
            responsive: true,
            tests: 62,
            docs: 'complete',
            figmaLink:
                'https://www.figma.com/design/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?node-id=15879-56747&t=DcObZzVEgYYZURV0-4',
        },
        {
            name: 'STooltip',
            typescript: true,
            jsdoc: true,
            darkMode: true,
            responsive: true,
            tests: 71,
            docs: 'complete',
            figmaLink:
                'https://www.figma.com/design/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?node-id=13419-9788&t=UYu9Xx4J3JNVcS7z-4',
        },
        {
            name: 'SDropdown',
            typescript: true,
            jsdoc: true,
            darkMode: true,
            responsive: true,
            tests: 88,
            docs: 'complete',
            figmaLink:
                'https://www.figma.com/design/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?node-id=12980-30183&t=LIDn51KPH0u6PwtA-4',
        },
    ],
    structure: [
        {
            name: 'SAccordion',
            typescript: true,
            jsdoc: true,
            darkMode: true,
            responsive: true,
            tests: 100,
            docs: 'complete',
            figmaLink:
                'https://www.figma.com/design/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?node-id=15836-54240&t=DcObZzVEgYYZURV0-4',
        },
        {
            name: 'SSidebar',
            typescript: true,
            jsdoc: true,
            darkMode: true,
            responsive: true,
            tests: 66,
            docs: 'complete',
            figmaLink:
                'https://www.figma.com/design/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?node-id=9510-67143&t=nQ0CaPW3JnnNONVn-4',
        },
        {
            name: 'STab',
            typescript: true,
            jsdoc: true,
            darkMode: true,
            responsive: true,
            tests: 88,
            figmaLink: 'https://www.figma.com/design/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?node-id=15389-2514',
            docs: 'complete',
        },
        {
            name: 'STable',
            typescript: true,
            jsdoc: true,
            darkMode: true,
            responsive: true,
            tests: 94,
            docs: 'complete',
            figmaLink:
                'https://www.figma.com/design/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?node-id=4809-17871',
        },
        {
            name: 'SDTable',
            typescript: true,
            jsdoc: true,
            darkMode: true,
            responsive: true,
            tests: 81,
            docs: 'complete',
            figmaLink:
                'https://www.figma.com/design/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?node-id=4809-17871',
        },
        {
            name: 'STemplateHeaderTable',
            typescript: true,
            jsdoc: true,
            darkMode: true,
            responsive: true,
            tests: 100,
            docs: 'complete',
            figmaLink:
                'https://www.figma.com/design/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?node-id=4809-17871',
        },
        {
            name: 'SSteps',
            typescript: true,
            jsdoc: true,
            darkMode: true,
            responsive: true,
            tests: 100,
            docs: 'complete',
            figmaLink:
                'https://www.figma.com/design/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?node-id=15566-18679&t=LIDn51KPH0u6PwtA-4',
        },
        {
            name: 'SPaginator',
            typescript: true,
            jsdoc: true,
            darkMode: true,
            responsive: true,
            tests: 59,
            docs: 'complete',
            figmaLink:
                'https://www.figma.com/design/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?node-id=15571-12061&t=LIDn51KPH0u6PwtA-4',
        },
        {
            name: 'SStackedList',
            typescript: true,
            jsdoc: true,
            darkMode: true,
            responsive: true,
            tests: 100,
            docs: 'complete',
            figmaLink:
                'https://www.figma.com/design/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?node-id=15417-12539&t=LIDn51KPH0u6PwtA-4',
        },
        {
            name: 'SButtonGroup',
            typescript: true,
            jsdoc: true,
            darkMode: true,
            responsive: true,
            tests: 100,
            docs: 'complete',
            figmaLink:
                'https://www.figma.com/design/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?node-id=12897-58267&t=nUZ8Fb2zwkjutAl3-0',
        },
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
            jsdoc: true,
            darkMode: true,
            responsive: true,
            tests: 67,
            docs: 'complete',
            figmaLink:
                'https://www.figma.com/design/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?node-id=12902-79715&t=YejrDL8k9HOQiEjj-4',
            improvements: {
                en: '- Optimize source code\n- Decouple reserved operators from custom ones\n- Improve multiple popovers handling',
                es: '- Optimizar el código fuente\n- Desacomplar los operadores reservados de los personalizados\n- Mejorar el manejo de múltiples popovers',
            },
        },
        {
            name: 'SCopy',
            tests: 100,
            typescript: true,
            jsdoc: true,
            darkMode: true,
            responsive: true,
            docs: 'complete',
            figmaLink:
                'https://www.figma.com/design/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?node-id=15446-11314',
        },
        {
            name: 'SColorSwitch',
            tests: 100,
            typescript: true,
            jsdoc: true,
            darkMode: true,
            responsive: true,
            docs: 'complete',
            figmaLink: 'https://www.figma.com/design/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?node-id=14508-22107',
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
