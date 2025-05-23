import { inject, provide, reactive, type InjectionKey, type Reactive } from 'vue';

export const buildContext = <S extends Record<string, any>, P, E>(config: {
    name: string;
    state: (props: P, emit: E) => S;
}) => {
    const contextKey = Symbol(`${config.name}Context`) as InjectionKey<Reactive<S>>;

    return {
        createContext: (props: P, emit: E) => {
            const context = reactive<S>(config.state(props, emit));

            provide(contextKey, context);
            return context;
        },
        useContext: (child: string) => {
            const context = inject(contextKey, null);
            if (context === null) {
                const err = new Error(`<${child} /> is missing parent <${config.name} /> component`);
                throw err;
            }
            return context;
        },
    };
};
