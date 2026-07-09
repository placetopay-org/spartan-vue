import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import SColorSwitch from './SColorSwitch.vue';

describe('SColorSwitch', () => {
    test('renders three radio buttons', () => {
        render(SColorSwitch);

        const radios = screen.getAllByRole('radio');
        expect(radios).toHaveLength(3);
    });

    test('renders with default system mode selected', () => {
        render(SColorSwitch);

        const systemButton = screen.getByRole('radio', { name: 'System' });
        expect(systemButton).toHaveAttribute('aria-checked', 'true');

        const lightButton = screen.getByRole('radio', { name: 'Light' });
        expect(lightButton).toHaveAttribute('aria-checked', 'false');

        const darkButton = screen.getByRole('radio', { name: 'Dark' });
        expect(darkButton).toHaveAttribute('aria-checked', 'false');
    });

    test('renders with light mode selected', () => {
        render(SColorSwitch, { props: { modelValue: 'light' } });

        expect(screen.getByRole('radio', { name: 'System' })).toHaveAttribute('aria-checked', 'false');
        expect(screen.getByRole('radio', { name: 'Light' })).toHaveAttribute('aria-checked', 'true');
        expect(screen.getByRole('radio', { name: 'Dark' })).toHaveAttribute('aria-checked', 'false');
    });

    test('renders with dark mode selected', () => {
        render(SColorSwitch, { props: { modelValue: 'dark' } });

        expect(screen.getByRole('radio', { name: 'System' })).toHaveAttribute('aria-checked', 'false');
        expect(screen.getByRole('radio', { name: 'Light' })).toHaveAttribute('aria-checked', 'false');
        expect(screen.getByRole('radio', { name: 'Dark' })).toHaveAttribute('aria-checked', 'true');
    });

    test('emits update:modelValue when clicking a mode button', async () => {
        const user = userEvent.setup();
        const { emitted } = render(SColorSwitch, { props: { modelValue: 'system' } });

        await user.click(screen.getByRole('radio', { name: 'Dark' }));

        expect(emitted()['update:modelValue']).toEqual([['dark']]);
    });

    test('emits correct value for each mode', async () => {
        const user = userEvent.setup();
        const { emitted } = render(SColorSwitch, { props: { modelValue: 'system' } });

        await user.click(screen.getByRole('radio', { name: 'Light' }));
        await user.click(screen.getByRole('radio', { name: 'Dark' }));
        await user.click(screen.getByRole('radio', { name: 'System' }));

        expect(emitted()['update:modelValue']).toEqual([['light'], ['dark'], ['system']]);
    });

    test('has radiogroup role on container', () => {
        render(SColorSwitch);

        expect(screen.getByRole('radiogroup')).toBeInTheDocument();
    });

    test('container has aria-label', () => {
        render(SColorSwitch);

        expect(screen.getByRole('radiogroup')).toHaveAttribute('aria-label', 'Color mode');
    });

    test('active button has highlighted styles', () => {
        render(SColorSwitch, { props: { modelValue: 'light' } });

        const lightButton = screen.getByRole('radio', { name: 'Light' });
        expect(lightButton.className).toContain('bg-white');
        expect(lightButton.className).toContain('shadow-sm');
    });

    test('inactive buttons do not have highlighted styles', () => {
        render(SColorSwitch, { props: { modelValue: 'light' } });

        const systemButton = screen.getByRole('radio', { name: 'System' });
        expect(systemButton.className).not.toContain('bg-white');
        expect(systemButton.className).not.toContain('shadow-sm');
    });

    // WAI-ARIA APG radio group keyboard contract.
    describe('keyboard', () => {
        test('only the checked option is in the tab order (roving tabindex)', () => {
            render(SColorSwitch, { props: { modelValue: 'light' } });

            expect(screen.getByRole('radio', { name: 'Light' })).toHaveAttribute('tabindex', '0');
            expect(screen.getByRole('radio', { name: 'System' })).toHaveAttribute('tabindex', '-1');
            expect(screen.getByRole('radio', { name: 'Dark' })).toHaveAttribute('tabindex', '-1');
        });

        test('Tab lands on the checked option', async () => {
            const user = userEvent.setup();
            render(SColorSwitch, { props: { modelValue: 'dark' } });

            await user.tab();

            expect(screen.getByRole('radio', { name: 'Dark' })).toHaveFocus();
        });

        test.each([
            ['{ArrowRight}', 'system', 'System', 'light', 'Light'],
            ['{ArrowDown}', 'system', 'System', 'light', 'Light'],
            ['{ArrowLeft}', 'light', 'Light', 'system', 'System'],
            ['{ArrowUp}', 'light', 'Light', 'system', 'System'],
        ])(
            '%s from %s selects and focuses the adjacent mode',
            async (key, from, fromLabel, expected, expectedLabel) => {
                const user = userEvent.setup();
                const { emitted } = render(SColorSwitch, { props: { modelValue: from } });

                screen.getByRole('radio', { name: fromLabel }).focus();
                await user.keyboard(key);

                expect(emitted()['update:modelValue']).toEqual([[expected]]);
                expect(screen.getByRole('radio', { name: expectedLabel })).toHaveFocus();
            },
        );

        test.each([
            ['{ArrowRight}', 'dark', 'Dark', 'system'],
            ['{ArrowLeft}', 'system', 'System', 'dark'],
        ])('%s wraps around from %s', async (key, from, fromLabel, expected) => {
            const user = userEvent.setup();
            const { emitted } = render(SColorSwitch, { props: { modelValue: from } });

            screen.getByRole('radio', { name: fromLabel }).focus();
            await user.keyboard(key);

            expect(emitted()['update:modelValue']).toEqual([[expected]]);
        });

        test('the roving tabindex follows the selection when controlled', async () => {
            const user = userEvent.setup();
            let modelValue = 'system';
            const { rerender } = render(SColorSwitch, {
                props: {
                    modelValue,
                    'onUpdate:modelValue': (value: string) => {
                        modelValue = value;
                        rerender({ modelValue });
                    },
                },
            });

            screen.getByRole('radio', { name: 'System' }).focus();
            await user.keyboard('{ArrowRight}');

            expect(screen.getByRole('radio', { name: 'Light' })).toHaveAttribute('tabindex', '0');
            expect(screen.getByRole('radio', { name: 'System' })).toHaveAttribute('tabindex', '-1');
            expect(screen.getByRole('radio', { name: 'Light' })).toHaveFocus();
        });
    });
});
