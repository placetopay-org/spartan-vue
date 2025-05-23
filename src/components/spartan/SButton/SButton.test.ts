import { test, describe } from 'vitest';
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import { HomeIcon } from '@placetopay/iconsax-vue/linear';
import SButton from './SButton.vue';

describe('SButton', () => {
    test('Can be rendered', async () => {
        // Act
        render(SButton, { props: { modelValue: '' } });
        const button = screen.getByRole('button');

        // Assert
        expect(button).toBeInTheDocument();
    });

    test('Can be render with slot content', async () => {
        // Act
        render(SButton, { slots: { default: 'Click me' } });

        // Assert
        screen.getByRole('button', { name: 'Click me' });
    });

    test('Can be polimorphic', async () => {
        // Act
        render(SButton, { props: { as: 'a', href: 'test.com' }, slots: { default: 'As link' } });
        render(SButton, { slots: { default: 'Without as' } });
        const buttonAsLink = screen.getByRole('link', { name: 'As link' });
        const buttonWithoutAs = screen.getByRole('button', { name: 'Without as' });

        // Assert
        expect(buttonAsLink).toBeInTheDocument();
        expect(buttonWithoutAs).toBeInTheDocument();
        screen.getByRole('link', { name: 'As link' });
        screen.getByRole('button', { name: 'Without as' });
    });

    test('Can understand the deprecated "icon" property', async () => {
        // Act
        render(SButton, { props: { icon: HomeIcon }, slots: { default: 'With left icon' } });
        render(SButton, { props: { leftIcon: HomeIcon }, slots: { default: 'With icon' } });

        const buttonUseLeftIcon = screen.getByRole('button', { name: 'With left icon' });
        const buttonUseIcon = screen.getByRole('button', { name: 'With icon' });

        // Assert
        expect(buttonUseLeftIcon.firstElementChild).toHaveClass('h-5 w-5 -ml-0.5');
        expect(buttonUseIcon.firstElementChild).toHaveClass('h-5 w-5 -ml-0.5');
    });
});
