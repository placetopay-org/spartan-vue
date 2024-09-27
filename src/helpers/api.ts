import { inject, provide, reactive, type InjectionKey, type Reactive } from 'vue';

export const buildApi = <T extends Record<string, any>, P, E>(config: {
    name: string;
    state: (props: P, emit: E) => T;
}) => {
    const contextKey = Symbol(`${config.name}Context`) as InjectionKey<Reactive<T>>;

    const useApi = () => {
        return {
            create: (props: P, emit: E) => {
                const context = reactive<T>(config.state(props, emit));

                provide(contextKey, context);
                return context;
            },
            use: (child: string) => {
                const context = inject(contextKey, null);
                if (context === null) {
                    const err = new Error(`<${child} /> is missing parent <${config.name} /> component`);
                    throw err;
                }
                return context;
            },
        };
    };

    return { useApi };
};
