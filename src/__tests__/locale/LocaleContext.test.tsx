import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockRouter from 'next-router-mock';

import { LocaleProvider, useLocale } from '@/locale/LocaleContext';

function TestConsumer() {
  const { locale, setLocale, t } = useLocale();
  return (
    <div>
      <span data-testid='locale'>{locale}</span>
      <span data-testid='nav-home'>{t.navHome}</span>
      <button onClick={() => setLocale('pl')}>Switch to PL</button>
      <button onClick={() => setLocale('en')}>Switch to EN</button>
    </div>
  );
}

function renderProvider() {
  return render(
    <LocaleProvider>
      <TestConsumer />
    </LocaleProvider>,
  );
}

describe('LocaleContext', () => {
  beforeEach(() => {
    mockRouter.reset();
    mockRouter.locale = undefined;
    mockRouter.setCurrentUrl('/');
    document.documentElement.lang = '';
    localStorage.clear();
  });

  it('falls back to Polish when the router reports no locale', () => {
    renderProvider();
    expect(screen.getByTestId('locale')).toHaveTextContent('pl');
    expect(screen.getByTestId('nav-home')).toHaveTextContent('Strona główna');
  });

  it('follows the locale supplied by the router', () => {
    mockRouter.locale = 'en';
    renderProvider();
    expect(screen.getByTestId('locale')).toHaveTextContent('en');
    expect(screen.getByTestId('nav-home')).toHaveTextContent('Home');
  });

  it('ignores an unsupported router locale', () => {
    mockRouter.locale = 'de';
    renderProvider();
    expect(screen.getByTestId('locale')).toHaveTextContent('pl');
  });

  it('switches locale by navigating, and swaps the dictionary', async () => {
    renderProvider();

    await userEvent.click(screen.getByText('Switch to EN'));

    expect(mockRouter.locale).toBe('en');
    expect(screen.getByTestId('locale')).toHaveTextContent('en');
    expect(screen.getByTestId('nav-home')).toHaveTextContent('Home');
  });

  it('does not navigate when the locale is unchanged', async () => {
    const push = jest.spyOn(mockRouter, 'push');
    renderProvider();

    await userEvent.click(screen.getByText('Switch to PL'));

    expect(push).not.toHaveBeenCalled();
    push.mockRestore();
  });

  it('keeps <html lang> in sync with the active locale', async () => {
    renderProvider();
    expect(document.documentElement.lang).toBe('pl');

    await userEvent.click(screen.getByText('Switch to EN'));
    expect(document.documentElement.lang).toBe('en');
  });

  it('persists nothing to browser storage', async () => {
    // The cookie policy no longer declares a language cookie or localStorage
    // entry. Re-introducing persistence here would make that document false.
    renderProvider();

    await userEvent.click(screen.getByText('Switch to EN'));

    expect(localStorage.getItem('locale')).toBeNull();
    expect(document.cookie).not.toContain('locale=');
  });
});
