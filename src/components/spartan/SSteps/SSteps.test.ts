import { test, describe, expect } from 'vitest';
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import SSteps from './SSteps.vue';
import SStepsItem from './SStepsItem.vue';
import { h } from 'vue';

describe('SSteps', () => {
    test('Can be rendered', async () => {
        const Item1 = h(SStepsItem, { href: 'link-1', status: 'complete' }, { default: () => 'First step' });
        const Item2 = h(
            SStepsItem,
            { href: 'link-2', status: 'current' },
            { default: () => 'Second step', description: 'test description' },
        );
        const Item3 = h(
            SStepsItem,
            { href: 'link-3', status: 'upcoming', last: true },
            { default: () => 'Third step' },
        );

        // Act
        render(SSteps, {
            slots: {
                default: [Item1, Item2, Item3],
            },
        });

        // Assert
        expect(screen.getByRole('navigation', { name: 'Progress' })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'First step' })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'Second steptest description' })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'Third step' })).toBeInTheDocument();
    });

    test('Can be rendered with array', async () => {
        // Act
        render(SSteps, {
            props: {
                steps: [
                    {
                        name: 'First step',
                        href: 'link-1',
                        status: 'complete',
                    },
                    {
                        name: 'Second step',
                        href: 'link-2',
                        status: 'current',
                        description: 'test description',
                    },
                    {
                        href: 'link-3',
                        status: 'upcoming',
                        last: true,
                    },
                ],
            },
        });

        // Assert
        expect(screen.getByRole('navigation', { name: 'Progress' })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'First step' })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'Second steptest description' })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: '' })).toBeInTheDocument();
    });

    test('Can be rendered with simple variant', async () => {
        const Item1 = h(SStepsItem, { href: 'link-1', status: 'complete' }, { default: () => 'First step' });
        const Item2 = h(
            SStepsItem,
            { href: 'link-2', status: 'current' },
            { default: () => 'Second step', description: 'test description' },
        );
        const Item3 = h(
            SStepsItem,
            { href: 'link-3', status: 'upcoming', last: true },
            { default: () => 'Third step' },
        );

        // Act
        render(SSteps, {
            props: { variant: 'simple' },
            slots: {
                default: [Item1, Item2, Item3],
            },
        });

        // Assert
        expect(screen.getByRole('navigation', { name: 'Progress' })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'First step' })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'Second steptest description' })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'Third step' })).toBeInTheDocument();
    });

    test('Reacts to variant prop changes', async () => {
        const Item = h(SStepsItem, { href: 'link-1', status: 'current' }, { default: () => 'First step' });

        const { container, rerender } = render(SSteps, {
            props: { variant: 'circlesWithText' },
            slots: { default: [Item] },
        });

        expect(container.querySelector('ol')?.className).toContain('overflow-hidden');

        await rerender({ variant: 'simple' });

        expect(container.querySelector('ol')?.className).toContain('md:flex');
    });

    test('Throws when SStepsItem is used without a parent SSteps', () => {
        expect(() =>
            render(SStepsItem, {
                props: { href: 'link-1', status: 'current' },
            }),
        ).toThrow('<SStepsItem /> is missing parent <SSteps /> component');
    });

    test('Simple variant renders name and description from props', () => {
        // The other tests feed both through slots; these are the prop fallbacks.
        const item = h(SStepsItem, {
            href: 'link-1',
            status: 'current',
            name: 'Step name',
            description: 'Step description',
        });

        render(SSteps, { props: { variant: 'simple' }, slots: { default: [item] } });

        expect(screen.getByText('Step name')).toBeInTheDocument();
        expect(screen.getByText('Step description')).toBeInTheDocument();
    });

    test('Simple variant renders a step with no name at all', () => {
        // No default slot and no `name` prop: only the description span renders.
        const item = h(SStepsItem, {
            href: 'link-1',
            status: 'current',
            description: 'Only description',
        });

        render(SSteps, { props: { variant: 'simple' }, slots: { default: [item] } });

        expect(screen.getByRole('link', { name: 'Only description' })).toBeInTheDocument();
    });
});
