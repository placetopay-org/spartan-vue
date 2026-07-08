/// <reference types="vite/client" />
/// <reference types="vitest/globals" />

/* eslint-disable @typescript-eslint/no-empty-object-type */

declare module '*.vue' {
    import type { DefineComponent } from 'vue';
    const component: DefineComponent<{}, {}, any>;
    export default component;
}
