/**
 * @en Deep structural equality for option values: primitives (NaN equals NaN), dates, arrays and plain
 *     objects compared by own enumerable keys. Replaces `lodash.isequal` (deprecated upstream) with the
 *     subset of its semantics the selectors actually rely on.
 * @es Igualdad estructural profunda para valores de opciones: primitivos (NaN es igual a NaN), fechas,
 *     arreglos y objetos planos comparados por sus claves enumerables propias. Reemplaza a `lodash.isequal`
 *     (deprecado) con el subconjunto de su semántica del que realmente dependen los selectores.
 */
export const isEqual = (a: unknown, b: unknown): boolean => {
    if (a === b) return true;
    if (Number.isNaN(a as number) && Number.isNaN(b as number)) return true;
    if (typeof a !== 'object' || typeof b !== 'object' || a === null || b === null) return false;

    if (a instanceof Date || b instanceof Date)
        return a instanceof Date && b instanceof Date && a.getTime() === b.getTime();

    if (Array.isArray(a) || Array.isArray(b)) {
        if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length) return false;
        return a.every((item, index) => isEqual(item, b[index]));
    }

    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);
    if (aKeys.length !== bKeys.length) return false;

    const bRecord = b as Record<string, unknown>;
    return aKeys.every((key) => Object.hasOwn(b, key) && isEqual((a as Record<string, unknown>)[key], bRecord[key]));
};
