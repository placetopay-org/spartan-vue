import { isEqual } from './isEqual';

describe('isEqual', () => {
    test('primitives', () => {
        expect(isEqual(1, 1)).toBe(true);
        expect(isEqual('a', 'a')).toBe(true);
        expect(isEqual(true, true)).toBe(true);
        expect(isEqual(null, null)).toBe(true);
        expect(isEqual(undefined, undefined)).toBe(true);
        expect(isEqual(1, 2)).toBe(false);
        expect(isEqual('a', 'b')).toBe(false);
        expect(isEqual(1, '1')).toBe(false);
        expect(isEqual(null, undefined)).toBe(false);
        expect(isEqual(0, false)).toBe(false);
    });

    test('NaN equals NaN, like lodash.isequal', () => {
        expect(isEqual(NaN, NaN)).toBe(true);
        expect(isEqual(NaN, 1)).toBe(false);
        expect(isEqual(1, NaN)).toBe(false);
    });

    test('null against objects', () => {
        expect(isEqual(null, {})).toBe(false);
        expect(isEqual({}, null)).toBe(false);
    });

    test('primitive against object', () => {
        expect(isEqual(1, { value: 1 })).toBe(false);
        expect(isEqual({ value: 1 }, 1)).toBe(false);
    });

    test('dates by timestamp', () => {
        expect(isEqual(new Date(1000), new Date(1000))).toBe(true);
        expect(isEqual(new Date(1000), new Date(2000))).toBe(false);
        expect(isEqual(new Date(1000), {})).toBe(false);
        expect(isEqual({}, new Date(1000))).toBe(false);
    });

    test('arrays deeply', () => {
        expect(isEqual([], [])).toBe(true);
        expect(isEqual([1, 2, 3], [1, 2, 3])).toBe(true);
        expect(isEqual([{ id: 1 }], [{ id: 1 }])).toBe(true);
        expect(isEqual([1, 2], [1, 2, 3])).toBe(false);
        expect(isEqual([1, 2, 3], [1, 2, 4])).toBe(false);
        expect(isEqual([1], { 0: 1, length: 1 })).toBe(false);
        expect(isEqual({ 0: 1, length: 1 }, [1])).toBe(false);
    });

    test('plain objects by own enumerable keys', () => {
        expect(isEqual({}, {})).toBe(true);
        expect(isEqual({ id: 1, label: 'a' }, { id: 1, label: 'a' })).toBe(true);
        expect(isEqual({ id: 1 }, { id: 2 })).toBe(false);
        expect(isEqual({ id: 1 }, { id: 1, label: 'a' })).toBe(false);
        expect(isEqual({ id: 1, label: 'a' }, { id: 1 })).toBe(false);
        expect(isEqual({ id: 1 }, { key: 1 })).toBe(false);
    });

    test('nested structures', () => {
        const a = { id: 1, meta: { tags: ['x', 'y'], deep: { ok: true } } };
        const b = { id: 1, meta: { tags: ['x', 'y'], deep: { ok: true } } };
        expect(isEqual(a, b)).toBe(true);
        expect(isEqual(a, { ...b, meta: { ...b.meta, tags: ['x', 'z'] } })).toBe(false);
    });

    test('same reference short-circuits', () => {
        const option = { id: 1 };
        expect(isEqual(option, option)).toBe(true);
    });
});
