# Spartan Vue Testing Guide

## Table of Contents

1. [Test Setup](#1-test-setup)
2. [Basic Render Patterns](#2-basic-render-patterns)
3. [Slots & Named Slots](#3-slots--named-slots)
4. [User Interactions](#4-user-interactions)
5. [Emitted Events & Rerender](#5-emitted-events--rerender)
6. [CSS Class Assertions (CVA)](#6-css-class-assertions-cva)
7. [DOM Queries Reference](#7-dom-queries-reference)
8. [Common Assertions](#8-common-assertions)
9. [Conditional Rendering](#9-conditional-rendering)
10. [Polymorphic Rendering](#10-polymorphic-rendering)
11. [Mocking & Spying](#11-mocking--spying)
12. [Complete Test File Template](#12-complete-test-file-template)

---

## 1. Test Setup

- **Vitest** with `jsdom` environment, globals enabled (no imports for `describe`, `test`, `expect`, `vi`)
- **@testing-library/vue** for `render()`
- **@testing-library/dom** for `screen` queries
- **@testing-library/user-event** for interactions
- **vue-i18n** globally mocked — `useI18n().t(key)` returns the key string
- **window.matchMedia** mocked for PrimeVue responsive behavior

```typescript
// Global setup in src/vitest-setup.ts
vi.mock('vue-i18n', async () => {
    const { ref } = await import('vue');
    return {
        useI18n: () => ({
            t: (key: string) => key,
            locale: ref('en'),
        }),
    };
});
```

## 2. Basic Render Patterns

```typescript
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import SButton from './SButton.vue';

// No props/slots
test('Can be rendered', () => {
    render(SButton);
    expect(screen.getByRole('button')).toBeInTheDocument();
});

// With props
test('Renders with variant', () => {
    render(SButton, { props: { variant: 'danger' } });
});

// With default slot
test('Renders slot content', () => {
    render(SButton, { slots: { default: 'Click me' } });
    screen.getByRole('button', { name: 'Click me' });
});

// With attrs
test('Passes HTML attributes', () => {
    render(SButton, { attrs: { 'data-testid': 'my-btn' } });
});
```

## 3. Slots & Named Slots

```typescript
// Default slot (text string)
render(SButton, { slots: { default: 'Click me' } });

// Named slots (HTML string)
render(SInput, {
    slots: { left: '<span data-testid="left-content">Left</span>' },
});
expect(screen.getByTestId('left-content')).toBeInTheDocument();

// Vue h() function (for icons/complex content)
const icon = (props: any, { attrs }: any) => h('svg', { 'data-testid': 'test-icon', ...attrs });
render(SInput, { props: { leftIcon: icon } });
expect(screen.getByTestId('test-icon')).toBeInTheDocument();
```

## 4. User Interactions

```typescript
import userEvent from '@testing-library/user-event';

test('Handles typing', async () => {
    let modelValue = 'test';
    const user = userEvent.setup();

    const { rerender } = render(SInput, {
        props: {
            modelValue,
            'onUpdate:modelValue': (e: string) => {
                modelValue = e;
                rerender({ modelValue });
            },
        },
    });

    const input = screen.getByRole('textbox');
    await user.type(input, ' value');
    expect(modelValue).toEqual('test value');
});

// Select option
test('Selects option', async () => {
    const user = userEvent.setup();
    const { emitted } = render(SInput, {
        props: { rightOptions: options, rightOption: '1' },
    });

    await user.selectOptions(screen.getByRole('combobox'), '2');
    expect(emitted()['update:rightOption'][0]).toEqual(['2']);
});
```

## 5. Emitted Events & Rerender

```typescript
// Capture emitted events
test('Emits update:modelValue', async () => {
    const user = userEvent.setup();
    const { emitted } = render(SInput, { props: { modelValue: '1' } });

    await user.type(screen.getByRole('textbox'), ' more');
    expect(emitted()['update:modelValue']).toBeTruthy();
});

// Rerender with new props
const { rerender } = render(SModal, { props: { open: false } });
await rerender({ open: true });
expect(screen.queryByText('Test content')).toBeInTheDocument();
```

## 6. CSS Class Assertions (CVA)

Always test both light and dark mode classes:

```typescript
test('Primary variant classes', () => {
    render(SButton, { slots: { default: 'Primary' } });
    const button = screen.getByRole('button');
    expect(button.className).toContain('bg-spartan-primary-600');
    expect(button.className).toContain('text-white');
});

test('Dark mode classes', () => {
    render(SSelect);
    const select = screen.getByRole('combobox');
    expect(select.className).toContain('dark:bg-white/5');
});

test('Error state classes', () => {
    const { container } = render(SInput, { props: { error: true } });
    const wrapper = container.firstElementChild!;
    expect(wrapper.className).toContain('s-ring-error');
});
```

## 7. DOM Queries Reference

| Query | Usage |
|-------|-------|
| `getByRole('button')` | Button elements |
| `getByRole('textbox')` | Input text fields |
| `getByRole('combobox')` | Select elements |
| `getByRole('option')` | Select options |
| `getByRole('dialog')` | Dialog/modal |
| `getByText('text')` | By text content |
| `getByPlaceholderText('...')` | By placeholder |
| `getByTestId('id')` | By data-testid |
| `queryByText()` | Returns null if not found |
| `container.querySelector()` | Direct DOM query |
| `container.firstElementChild` | Get wrapper element |

## 8. Common Assertions

```typescript
expect(element).toBeInTheDocument();
expect(element).toBeDisabled();
expect(element).toHaveValue('test');
expect(element).toHaveAttribute('type', 'email');
expect(element).toHaveClass('text-lg');
expect(element.className).toContain('bg-white');
expect(element.textContent).not.toContain('Hidden');
```

## 9. Conditional Rendering

```typescript
test('Does not render spinner when not loading', () => {
    const { container } = render(SButton, { slots: { default: 'Not loading' } });
    expect(container.querySelector('svg.animate-spin')).not.toBeInTheDocument();
});

test('Renders hidden input', () => {
    const { container } = render(SInput, { props: { type: 'hidden' } });
    expect(container.firstElementChild!.className).toContain('hidden');
});
```

## 10. Polymorphic Rendering

```typescript
test('Can be polymorphic', () => {
    render(SButton, { props: { as: 'a', href: 'test.com' }, slots: { default: 'Link' } });
    render(SButton, { slots: { default: 'Button' } });

    expect(screen.getByRole('link', { name: 'Link' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Button' })).toBeInTheDocument();
});
```

## 11. Mocking & Spying

```typescript
// Console spy
test('Warns on invalid type', () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    render(SInput, { props: { type: 'checkbox' } });
    expect(error).toHaveBeenCalledTimes(1);
    error.mockRestore();
});

// ResizeObserver mock (for modals/popovers)
window.ResizeObserver = vi.fn(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
}));
```

## 12. Complete Test File Template

```typescript
import { describe, test, expect } from 'vitest';
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import SComponentName from './SComponentName.vue';

describe('SComponentName', () => {
    // Basic rendering
    test('Can be rendered', () => {
        render(SComponentName);
        expect(screen.getByRole('...')).toBeInTheDocument();
    });

    // Slot content
    test('Renders slot content', () => {
        render(SComponentName, { slots: { default: 'Content' } });
        screen.getByText('Content');
    });

    // Variants (light + dark)
    describe('Variants', () => {
        test('Applies default variant', () => {
            render(SComponentName);
            const el = screen.getByRole('...');
            expect(el.className).toContain('expected-light-class');
            expect(el.className).toContain('dark:expected-dark-class');
        });
    });

    // User interactions
    describe('Interactions', () => {
        test('Handles user input', async () => {
            const user = userEvent.setup();
            const { emitted } = render(SComponentName, { props: { modelValue: '' } });
            // ... interaction tests
        });
    });

    // Props
    describe('Props', () => {
        test('Disabled state', () => {
            render(SComponentName, { props: { disabled: true } });
            expect(screen.getByRole('...')).toBeDisabled();
        });
    });
});
```

## Test File Conventions

- File name: `SComponentName.test.ts` (same directory as component)
- No imports needed for `describe`, `test`, `expect`, `vi` (globals enabled)
- Import `render` from `@testing-library/vue`, `screen` from `@testing-library/dom`
- Test structure: Basic render → Slots → Variants → Interactions → Props → Edge cases
- Always test both light and dark mode CSS classes
- Use `data-s-*` attributes that components add for element identification
