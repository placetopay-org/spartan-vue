import { test, describe, vi } from 'vitest';
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import SAvatar from './SAvatar.vue';

describe('SAvatar', () => {
    describe('Rendering', () => {
        test('renders without warnings when no props are provided', () => {
            const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

            render(SAvatar);

            expect(warn).not.toHaveBeenCalled();
            warn.mockRestore();
        });

        test('renders default "?" when no name is provided', () => {
            render(SAvatar);

            expect(screen.getByText('?')).toBeInTheDocument();
        });

        test('renders "?" when name is empty string', () => {
            render(SAvatar, { props: { name: '' } });

            expect(screen.getByText('?')).toBeInTheDocument();
        });
    });

    describe('Initials', () => {
        test.each([
            ['Jhon Doe', 'JD'],
            ['Mary-Smith', 'MS'],
            ['sarah.adams', 'SA'],
            ['bob', 'B'],
            ['AB', 'AB'],
            ['a', 'A'],
        ])('generates "%s" as "%s"', (name, expected) => {
            render(SAvatar, { props: { name } });

            expect(screen.getByText(expected)).toBeInTheDocument();
        });
    });

    describe('Image', () => {
        test('renders an img element when src is provided', () => {
            render(SAvatar, {
                props: { name: 'Jane', src: 'https://example.com/avatar.jpg' },
            });

            const img = screen.getByRole('img');
            expect(img).toBeInTheDocument();
            expect(img).toHaveAttribute('src', 'https://example.com/avatar.jpg');
            expect(img).toHaveAttribute('alt', 'J');
        });

        test('does not render img when src is not provided', () => {
            render(SAvatar, { props: { name: 'Jane' } });

            expect(screen.queryByRole('img')).not.toBeInTheDocument();
        });
    });

    describe('Sizes', () => {
        test('applies md size classes by default', () => {
            const { container } = render(SAvatar, { props: { name: 'AB' } });

            const avatar = container.querySelector('[data-s-avatar] > div');
            expect(avatar).toHaveClass('h-10');
            expect(avatar).toHaveClass('w-10');
        });

        test('applies xs size classes', () => {
            const { container } = render(SAvatar, { props: { name: 'AB', size: 'xs' } });

            const avatar = container.querySelector('[data-s-avatar] > div');
            expect(avatar).toHaveClass('h-6');
            expect(avatar).toHaveClass('w-6');
        });

        test('applies 2xl size classes', () => {
            const { container } = render(SAvatar, { props: { name: 'AB', size: '2xl' } });

            const avatar = container.querySelector('[data-s-avatar] > div');
            expect(avatar).toHaveClass('h-16');
            expect(avatar).toHaveClass('w-16');
        });
    });

    describe('Borderless', () => {
        test('has outline border by default', () => {
            const { container } = render(SAvatar, { props: { name: 'AB' } });

            const avatar = container.querySelector('[data-s-avatar] > div');
            expect(avatar).toHaveClass('outline-1');
            expect(avatar).toHaveClass('outline-gray-800/20');
        });

        test('removes outline border when borderless is true', () => {
            const { container } = render(SAvatar, { props: { name: 'AB', borderless: true } });

            const avatar = container.querySelector('[data-s-avatar] > div');
            expect(avatar).not.toHaveClass('outline-1');
            expect(avatar).not.toHaveClass('outline-gray-800/20');
        });
    });

    describe('Indicator', () => {
        test('does not show indicator by default', () => {
            const { container } = render(SAvatar, { props: { name: 'AB' } });

            const indicator = container.querySelector('.bg-spartan-primary-500');
            expect(indicator).not.toBeInTheDocument();
        });

        test('shows indicator when indicator is true', () => {
            const { container } = render(SAvatar, { props: { name: 'AB', indicator: true } });

            const indicator = container.querySelector('.bg-spartan-primary-500');
            expect(indicator).toBeInTheDocument();
        });

        test('positions indicator at right-top by default', () => {
            const { container } = render(SAvatar, { props: { name: 'AB', indicator: true } });

            const indicator = container.querySelector('.bg-spartan-primary-500');
            expect(indicator).toHaveClass('right-0');
            expect(indicator).toHaveClass('top-0');
        });

        test('positions indicator at left-bottom', () => {
            const { container } = render(SAvatar, {
                props: { name: 'AB', indicator: true, indicatorPosition: 'left-bottom' },
            });

            const indicator = container.querySelector('.bg-spartan-primary-500');
            expect(indicator).toHaveClass('left-0');
            expect(indicator).toHaveClass('bottom-0');
        });
    });

    describe('Dark mode', () => {
        test('applies dark mode classes to initials avatar', () => {
            const { container } = render(SAvatar, { props: { name: 'AB' } });

            const avatar = container.querySelector('[data-s-avatar] > div');
            expect(avatar).toHaveClass('dark:bg-gray-700');
            expect(avatar).toHaveClass('dark:text-gray-300');
        });

        test('applies dark mode outline class', () => {
            const { container } = render(SAvatar, { props: { name: 'AB' } });

            const avatar = container.querySelector('[data-s-avatar] > div');
            expect(avatar).toHaveClass('dark:outline-white/20');
        });

        test('applies dark mode ring class to indicator', () => {
            const { container } = render(SAvatar, { props: { name: 'AB', indicator: true } });

            const indicator = container.querySelector('.bg-spartan-primary-500');
            expect(indicator).toHaveClass('dark:ring-gray-800');
        });
    });

    describe('Data attributes', () => {
        test('has data-s-avatar attribute', () => {
            const { container } = render(SAvatar);

            expect(container.querySelector('[data-s-avatar]')).toBeInTheDocument();
        });
    });
});
