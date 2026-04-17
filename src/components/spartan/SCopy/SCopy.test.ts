import { expect, test, describe, vi } from 'vitest';
import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import SCopy from './SCopy.vue';
import { h, defineComponent } from 'vue';

describe('SCopy', () => {
    test('Can be rendered', () => {
        // Act
        render(SCopy, {
            slots: {
                default: 'Test Content',
            },
        });

        // Assert
        screen.getByText('Test Content');
    });

    test('Can copy a value from slot', async () => {
        // Arrange
        const user = userEvent.setup();

        // Act
        const { emitted } = render(SCopy, {
            slots: {
                default: 'Test Content',
            },
        });

        const element = screen.getByText('Test Content');
        await user.click(element);

        // Assert
        expect(emitted().copied[0]).toEqual(['Test Content']);
    });

    test('Can copy a value from prop', async () => {
        // Arrange
        const user = userEvent.setup();

        // Act
        const { emitted } = render(SCopy, {
            slots: {
                default: 'Test Content',
            },
            props: {
                value: 'Test from prop',
            },
        });

        const element = screen.getByText('Test Content');
        await user.click(element);

        // Assert
        expect(emitted().copied[0]).toEqual(['Test from prop']);
    });

    test('Can copy a value from slot scrapping', async () => {
        // Arrange
        const user = userEvent.setup();

        // Act
        const { emitted } = render(SCopy, {
            slots: {
                default: () => [h('div', [h('main', [h('span', 'Test Content')])])],
            },
            props: {
                value: 'Test from prop',
            },
        });

        const element = screen.getByText('Test Content');
        await user.click(element);

        // Assert
        expect(emitted().copied[0]).toEqual(['Test from prop']);
    });

    test('Resets copying state after timeout', async () => {
        vi.useFakeTimers();
        const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

        const { emitted } = render(SCopy, {
            slots: { default: 'Copy me' },
        });

        await user.click(screen.getByText('Copy me'));
        expect(emitted().copied[0]).toEqual(['Copy me']);

        vi.advanceTimersByTime(3100);
        vi.useRealTimers();
    });

    test('Copies empty string when no value and no slot content', async () => {
        const user = userEvent.setup();

        const { emitted } = render(SCopy);

        const container = document.querySelector('[class*="cursor-pointer"]')!;
        await user.click(container);

        expect(emitted().copied[0]).toEqual(['']);
    });

    test('Falls back to slot.el.innerText for non-string slot children', async () => {
        const user = userEvent.setup();

        const NestedComponent = defineComponent({
            render() {
                return h('div', 'Nested Text');
            },
        });

        const { emitted } = render(SCopy, {
            slots: {
                default: () => [h(NestedComponent)],
            },
        });

        const container = document.querySelector('[class*="cursor-pointer"]')!;
        await user.click(container);

        const copied = emitted().copied[0][0];
        expect(typeof copied).toBe('string');
    });
});
