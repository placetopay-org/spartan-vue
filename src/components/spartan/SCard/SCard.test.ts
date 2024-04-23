import { test, describe } from 'vitest';
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import SCard from './SCard.vue';

describe('SCard', () => {
    test('Can be rendered', () => {
        // Act
        render(SCard, { slots: { default: 'test content' }});
        
        // Assert
        screen.getByText('test content');
        const card = screen.getByRole('article');
        expect(card).toBeInTheDocument();
    });

    test('Can be render with small size', () => {
        // Act
        render(SCard, { props: { size: 'sm' }, slots: { default: 'test content' }});

        // Assert
        screen.getByText('test content');
        const card = screen.getByRole('article');
        expect(card).toHaveClass('rounded-md');
    });

    test('Can be render with icon variant', () => {
        // Act
        render(SCard, { props: { iconVariant: 'success' }, slots: { default: 'test content' }});

        // Assert
        screen.getByText('test content');
        const card = screen.getByRole('article');
        expect(card.firstElementChild?.firstElementChild?.firstElementChild).toHaveClass('h-6 w-6 text-green-600');
    });

    test('Can be render with accent parts', () => {
        // Act
        render(SCard, { props: { 'header-accent': true }, slots: { default: 'body 0', header: 'accent header', footer: 'footer 0' }});
        render(SCard, { props: { 'body-accent': true }, slots: { default: 'accent body', header: 'header 0', footer: 'footer 1' }});
        render(SCard, { props: { 'footer-accent': true }, slots: { default: 'body 1', header: 'header 1', footer: 'accent footer' }});

        const cards = screen.getAllByRole('article');

        const accentHeader = screen.getByText('accent header');
        const accentBody = screen.getByText('accent body').parentElement;
        const accentFooter = screen.getByText('accent footer');

        const firstHeader = screen.getByText('header 0');
        const secondHeader = screen.getByText('header 1');
        const firstBody = screen.getByText('body 0').parentElement;
        const secondBody = screen.getByText('body 1').parentElement;
        const firstFooter = screen.getByText('footer 0');
        const secondFooter = screen.getByText('footer 1');

        // Assert
        expect(accentHeader).toHaveClass('bg-gray-50');
        expect(accentBody).toHaveClass('bg-gray-50');
        expect(accentFooter).toHaveClass('bg-gray-50');

        expect(firstHeader).not.toHaveClass('bg-gray-50');
        expect(secondHeader).not.toHaveClass('bg-gray-50');
        expect(firstBody).not.toHaveClass('bg-gray-50');
        expect(secondBody).not.toHaveClass('bg-gray-50');
        expect(firstFooter).not.toHaveClass('bg-gray-50');
        expect(secondFooter).not.toHaveClass('bg-gray-50');

        expect(accentHeader.parentElement).toEqual(cards[0]);
        expect(firstBody?.parentElement).toEqual(cards[0]);
        expect(firstFooter.parentElement).toEqual(cards[0]);

        expect(firstHeader.parentElement).toEqual(cards[1]);
        expect(accentBody?.parentElement).toEqual(cards[1]);
        expect(secondFooter.parentElement).toEqual(cards[1]);

        expect(secondHeader.parentElement).toEqual(cards[2]);
        expect(secondBody?.parentElement).toEqual(cards[2]);
        expect(accentFooter.parentElement).toEqual(cards[2]);
    });
});
