import { test, describe } from 'vitest';
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
        screen.getByRole('navigation', { name: 'Progress' });
        screen.getByRole('link', { name: 'First step' });
        screen.getByRole('link', { name: 'Second step test description' });
        screen.getByRole('link', { name: 'Third step' });
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
        screen.getByRole('navigation', { name: 'Progress' });
        screen.getByRole('link', { name: 'First step' });
        screen.getByRole('link', { name: 'Second step test description' });
        screen.getByRole('link', { name: '' });
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
        screen.getByRole('navigation', { name: 'Progress' });
        screen.getByRole('link', { name: 'First step' });
        screen.getByRole('link', { name: 'Second step test description' });
        screen.getByRole('link', { name: 'Third step' });
    });
});
