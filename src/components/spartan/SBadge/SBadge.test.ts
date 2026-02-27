import { test, describe } from 'vitest';
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import { userEvent } from '@testing-library/user-event';
import SBadge from './SBadge.vue';

describe('SBadge', () => {
    test('Can be rendered', () => {
        render(SBadge, { slots: { default: 'Badge' } });

        expect(screen.getByText('Badge')).toBeInTheDocument();
    });

    test('Can be rendered with slot content', () => {
        render(SBadge, { slots: { default: 'My label' } });

        expect(screen.getByText('My label')).toBeInTheDocument();
    });

    test('Renders as a span element', () => {
        const { container } = render(SBadge, { slots: { default: 'Badge' } });

        expect(container.firstElementChild?.tagName).toBe('SPAN');
    });

    describe('Colors', () => {
        test('Applies gray color classes by default', () => {
            const { container } = render(SBadge, { slots: { default: 'Gray' } });
            const badge = container.firstElementChild!;

            expect(badge.className).toContain('bg-gray-100');
            expect(badge.className).toContain('text-gray-700');
        });

        test('Applies primary color classes', () => {
            const { container } = render(SBadge, { props: { color: 'primary' }, slots: { default: 'Primary' } });
            const badge = container.firstElementChild!;

            expect(badge.className).toContain('bg-spartan-primary-100');
            expect(badge.className).toContain('text-spartan-primary-600');
        });

        test('Applies red color classes', () => {
            const { container } = render(SBadge, { props: { color: 'red' }, slots: { default: 'Red' } });
            const badge = container.firstElementChild!;

            expect(badge.className).toContain('bg-red-100');
            expect(badge.className).toContain('text-red-700');
        });

        test('Applies blue color classes', () => {
            const { container } = render(SBadge, { props: { color: 'blue' }, slots: { default: 'Blue' } });
            const badge = container.firstElementChild!;

            expect(badge.className).toContain('bg-blue-100');
            expect(badge.className).toContain('text-blue-700');
        });

        test('Applies green color classes', () => {
            const { container } = render(SBadge, { props: { color: 'green' }, slots: { default: 'Green' } });
            const badge = container.firstElementChild!;

            expect(badge.className).toContain('bg-green-100');
            expect(badge.className).toContain('text-green-700');
        });

        test('Applies yellow color classes', () => {
            const { container } = render(SBadge, { props: { color: 'yellow' }, slots: { default: 'Yellow' } });
            const badge = container.firstElementChild!;

            expect(badge.className).toContain('bg-yellow-100');
            expect(badge.className).toContain('text-yellow-700');
        });

        test('Applies indigo color classes', () => {
            const { container } = render(SBadge, { props: { color: 'indigo' }, slots: { default: 'Indigo' } });
            const badge = container.firstElementChild!;

            expect(badge.className).toContain('bg-indigo-100');
            expect(badge.className).toContain('text-indigo-700');
        });

        test('Applies white color classes', () => {
            const { container } = render(SBadge, { props: { color: 'white' }, slots: { default: 'White' } });
            const badge = container.firstElementChild!;

            expect(badge.className).toContain('bg-white');
            expect(badge.className).toContain('text-gray-700');
        });

        test('Applies purple color classes', () => {
            const { container } = render(SBadge, { props: { color: 'purple' }, slots: { default: 'Purple' } });
            const badge = container.firstElementChild!;

            expect(badge.className).toContain('bg-purple-100');
            expect(badge.className).toContain('text-purple-700');
        });

        test('Applies neutral color classes', () => {
            const { container } = render(SBadge, { props: { color: 'neutral' }, slots: { default: 'Neutral' } });
            const badge = container.firstElementChild!;

            expect(badge.className).toContain('bg-neutral-950');
            expect(badge.className).toContain('text-white');
        });
    });

    describe('Sizes', () => {
        test('Applies md size classes by default', () => {
            const { container } = render(SBadge, { slots: { default: 'Medium' } });
            const badge = container.firstElementChild!;

            expect(badge.className).toContain('px-3');
            expect(badge.className).toContain('text-sm');
        });

        test('Applies sm size classes', () => {
            const { container } = render(SBadge, { props: { size: 'sm' }, slots: { default: 'Small' } });
            const badge = container.firstElementChild!;

            expect(badge.className).toContain('px-2.5');
            expect(badge.className).toContain('text-xs');
        });

        test('Applies lg size classes', () => {
            const { container } = render(SBadge, { props: { size: 'lg' }, slots: { default: 'Large' } });
            const badge = container.firstElementChild!;

            expect(badge.className).toContain('py-1.5');
            expect(badge.className).toContain('text-sm');
        });
    });

    describe('Outline', () => {
        test('Applies transparent background with outline border for gray', () => {
            const { container } = render(SBadge, { props: { outline: true }, slots: { default: 'Outline' } });
            const badge = container.firstElementChild!;

            expect(badge.className).toContain('bg-transparent');
            expect(badge.className).toContain('outline-gray-300');
            expect(badge.className).toContain('outline');
            expect(badge.className).toContain('-outline-offset-1');
        });

        test('Applies transparent background with outline for primary', () => {
            const { container } = render(SBadge, {
                props: { color: 'primary', outline: true },
                slots: { default: 'Primary Outline' },
            });
            const badge = container.firstElementChild!;

            expect(badge.className).toContain('bg-transparent');
            expect(badge.className).toContain('outline-spartan-primary-300');
        });

        test('Applies transparent background with outline for red', () => {
            const { container } = render(SBadge, {
                props: { color: 'red', outline: true },
                slots: { default: 'Red Outline' },
            });
            const badge = container.firstElementChild!;

            expect(badge.className).toContain('bg-transparent');
            expect(badge.className).toContain('outline-red-300');
        });

        test('Applies transparent background with outline for neutral', () => {
            const { container } = render(SBadge, {
                props: { color: 'neutral', outline: true },
                slots: { default: 'Neutral Outline' },
            });
            const badge = container.firstElementChild!;

            expect(badge.className).toContain('bg-transparent');
            expect(badge.className).toContain('outline-neutral-400');
            expect(badge.className).toContain('text-neutral-900');
        });
    });

    describe('Pill', () => {
        test('Applies rounded-full when pill', () => {
            const { container } = render(SBadge, { props: { pill: true }, slots: { default: 'Pill' } });
            const badge = container.firstElementChild!;

            expect(badge.className).toContain('rounded-full');
        });

        test('Does not apply rounded-full by default', () => {
            const { container } = render(SBadge, { slots: { default: 'No pill' } });
            const badge = container.firstElementChild!;

            expect(badge.className).not.toContain('rounded-full');
        });
    });

    describe('Dot', () => {
        test('Renders dot indicator when dot is true', () => {
            const { container } = render(SBadge, { props: { dot: true }, slots: { default: 'Dot' } });
            const dot = container.querySelector('[data-s-dot]');

            expect(dot).toBeInTheDocument();
            expect(dot?.tagName).toBe('svg');
        });

        test('Does not render dot by default', () => {
            const { container } = render(SBadge, { slots: { default: 'No dot' } });
            const dot = container.querySelector('[data-s-dot]');

            expect(dot).not.toBeInTheDocument();
        });

        test('Applies correct dot color for primary', () => {
            const { container } = render(SBadge, {
                props: { dot: true, color: 'primary' },
                slots: { default: 'Primary dot' },
            });
            const dot = container.querySelector('[data-s-dot]')!;

            expect(dot.getAttribute('class')).toContain('fill-spartan-primary-400');
        });

        test('Applies correct dot color for red', () => {
            const { container } = render(SBadge, {
                props: { dot: true, color: 'red' },
                slots: { default: 'Red dot' },
            });
            const dot = container.querySelector('[data-s-dot]')!;

            expect(dot.getAttribute('class')).toContain('fill-red-400');
        });

        test('Applies correct dot color for neutral', () => {
            const { container } = render(SBadge, {
                props: { dot: true, color: 'neutral' },
                slots: { default: 'Neutral dot' },
            });
            const dot = container.querySelector('[data-s-dot]')!;

            expect(dot.getAttribute('class')).toContain('fill-white');
        });
    });

    describe('Removable', () => {
        test('Renders remove button when removable is true', () => {
            const { container } = render(SBadge, { props: { removable: true }, slots: { default: 'Remove me' } });
            const button = container.querySelector('[data-s-cross]');

            expect(button).toBeInTheDocument();
            expect(button?.tagName).toBe('BUTTON');
        });

        test('Does not render remove button by default', () => {
            const { container } = render(SBadge, { slots: { default: 'No remove' } });
            const button = container.querySelector('[data-s-cross]');

            expect(button).not.toBeInTheDocument();
        });

        test('Remove button has cursor-pointer class', () => {
            const { container } = render(SBadge, { props: { removable: true }, slots: { default: 'Badge' } });
            const button = container.querySelector('[data-s-cross]')!;

            expect(button.className).toContain('cursor-pointer');
        });

        test('Remove button has accessible label', () => {
            const { container } = render(SBadge, { props: { removable: true }, slots: { default: 'Badge' } });
            const srOnly = container.querySelector('.sr-only');

            expect(srOnly).toBeInTheDocument();
            expect(srOnly?.textContent).toBe('Remove');
        });

        test('Emits removed event on click', async () => {
            const { container, emitted } = render(SBadge, {
                props: { removable: true },
                slots: { default: 'Remove me' },
            });
            const button = container.querySelector('[data-s-cross]')!;

            await userEvent.click(button);

            expect(emitted()).toHaveProperty('removed');
        });

        test('Emits removed event with stopPropagation mode', async () => {
            const { container, emitted } = render(SBadge, {
                props: { removable: 'stopPropagation' },
                slots: { default: 'Remove me' },
            });
            const button = container.querySelector('[data-s-cross]')!;

            await userEvent.click(button);

            expect(emitted()).toHaveProperty('removed');
        });
    });

    describe('Reverse', () => {
        test('Applies flex-row-reverse to body when reverse is true', () => {
            const { container } = render(SBadge, { props: { reverse: true }, slots: { default: 'Reversed' } });
            const body = container.querySelector('[data-s-body]')!;

            expect(body.className).toContain('flex-row-reverse');
        });

        test('Does not apply flex-row-reverse by default', () => {
            const { container } = render(SBadge, { slots: { default: 'Not reversed' } });
            const body = container.querySelector('[data-s-body]')!;

            expect(body.className).not.toContain('flex-row-reverse');
        });
    });

    describe('Tag slot', () => {
        test('Renders tag slot content', () => {
            render(SBadge, { slots: { default: 'Content', tag: 'Tag text' } });

            expect(screen.getByText('Tag text')).toBeInTheDocument();
            expect(screen.getByText('Content')).toBeInTheDocument();
        });

        test('Applies tag styling element', () => {
            const { container } = render(SBadge, { slots: { default: 'Content', tag: 'V1' } });
            const tag = container.querySelector('[data-s-tag]');

            expect(tag).toBeInTheDocument();
        });

        test('Does not render tag element when slot is empty', () => {
            const { container } = render(SBadge, { slots: { default: 'Content' } });
            const tag = container.querySelector('[data-s-tag]');

            expect(tag).not.toBeInTheDocument();
        });

        test('Applies font-normal when tag is present', () => {
            const { container } = render(SBadge, { slots: { default: 'Content', tag: 'V1' } });
            const badge = container.firstElementChild!;

            expect(badge.className).toContain('font-normal');
        });
    });

    describe('Combinations', () => {
        test('Pill + outline applies both classes', () => {
            const { container } = render(SBadge, {
                props: { pill: true, outline: true },
                slots: { default: 'Pill Outline' },
            });
            const badge = container.firstElementChild!;

            expect(badge.className).toContain('rounded-full');
            expect(badge.className).toContain('bg-transparent');
            expect(badge.className).toContain('outline-gray-300');
        });

        test('Dot + removable renders both elements', () => {
            const { container } = render(SBadge, {
                props: { dot: true, removable: true },
                slots: { default: 'Both' },
            });
            const dot = container.querySelector('[data-s-dot]');
            const cross = container.querySelector('[data-s-cross]');

            expect(dot).toBeInTheDocument();
            expect(cross).toBeInTheDocument();
        });

        test('Color + outline applies correct outline color', () => {
            const { container } = render(SBadge, {
                props: { color: 'blue', outline: true },
                slots: { default: 'Blue Outline' },
            });
            const badge = container.firstElementChild!;

            expect(badge.className).toContain('bg-transparent');
            expect(badge.className).toContain('outline-blue-300');
            expect(badge.className).toContain('text-blue-700');
        });

        test('Tag + pill applies pill to tag element', () => {
            const { container } = render(SBadge, {
                props: { pill: true },
                slots: { default: 'Content', tag: 'V1' },
            });
            const tag = container.querySelector('[data-s-tag]')!;

            expect(tag.className).toContain('rounded-full');
        });

        test('Tag + outline adjusts tag background', () => {
            const { container } = render(SBadge, {
                props: { outline: true },
                slots: { default: 'Content', tag: 'V1' },
            });
            const tag = container.querySelector('[data-s-tag]')!;

            expect(tag.className).toContain('bg-white');
        });

        test('Dot + reverse still renders dot', () => {
            const { container } = render(SBadge, {
                props: { dot: true, reverse: true },
                slots: { default: 'Dot reversed' },
            });
            const dot = container.querySelector('[data-s-dot]');

            expect(dot).toBeInTheDocument();
        });
    });
});
