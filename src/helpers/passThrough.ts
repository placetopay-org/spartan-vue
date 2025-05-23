import { computed, useAttrs } from 'vue';

const add = (obj: object, name: string, value: object) => {
    const current = (obj[name as keyof typeof obj] || {}) as object;
    return Object.assign(obj, { [name]: { ...current, ...value } });
};

export function usePassthrough() {
    const attrs = useAttrs();

    const extractor = (bind: any) => {
        const className = bind?.class;
        const props = { ...bind };
        delete props.class;

        return [className, props];
    };

    const pt = computed<any>(() => {
        const ptData = {};

        for (const [key, value] of Object.entries<any>(attrs)) {
            const baseRegex = new RegExp(`^pt:([^:]+)$`);
            const detailedRegex = new RegExp(`^pt:([^:]+):([^:]+)$`);

            if (baseRegex.test(key)) {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const [_, name] = key.match(baseRegex)!;
                add(ptData, name, { class: value });
            }

            if (detailedRegex.test(key)) {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const [_, name, content] = key.match(detailedRegex)!;
                add(ptData, name, { [content]: value });
            }

            if (key === 'pt') {
                for (const [name, content] of Object.entries(value)) {
                    if (typeof content === 'string') {
                        Object.assign(ptData, { [name]: { class: content } });
                    } else {
                        Object.assign(ptData, { [name]: content });
                    }
                }
            }
        }

        return ptData;
    });

    return { pt, extractor, attrs };
}
