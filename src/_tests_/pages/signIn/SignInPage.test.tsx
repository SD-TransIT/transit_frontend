import React from 'react';

import { render, screen } from '@testing-library/react';
import { CookiesProvider } from 'react-cookie';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import SignInPage from 'pages/signIn/SignInPage';
import store from 'stores/store';
import en from 'translations/en.json';

describe('Unit tests for the SignInPage component.', () => {
  const SIGN_IN_PAGE_TEST_ID = 'sign-in-page';

  const locale = 'en';
  const messages = { en };

  test('Should match snapshot.', () => {
    render(
      <Provider store={store}>
        <CookiesProvider>
          <MemoryRouter initialEntries={[{ pathname: '/sign_in', search: '/' }]}>
            <IntlProvider locale={locale} defaultLocale="en" messages={messages[locale]}>
              <SignInPage />
            </IntlProvider>
          </MemoryRouter>
        </CookiesProvider>
      </Provider>,
    );

    const signInPage = screen.getByTestId(SIGN_IN_PAGE_TEST_ID);
    expect(signInPage).toBeInTheDocument();
    expect(signInPage).toMatchSnapshot();
  });
});
