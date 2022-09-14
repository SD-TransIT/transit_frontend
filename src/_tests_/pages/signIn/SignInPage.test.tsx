import React from 'react';

import { render, screen } from '@testing-library/react';
import { CookiesProvider } from 'react-cookie';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { defaultLocale, locale, messages } from '_tests_/test-utils';
import SignInPage from 'pages/signIn/SignInPage';
import { Paths } from 'routes/paths';
import store from 'stores/store';

describe('Unit tests for the SignInPage component.', () => {
  const SIGN_IN_PAGE_TEST_ID = 'sign-in-page';

  test('Should match snapshot.', () => {
    render(
      <Provider store={store}>
        <CookiesProvider>
          <MemoryRouter initialEntries={[{ pathname: Paths.sign_in, search: '/' }]}>
            <IntlProvider locale={locale} defaultLocale={defaultLocale} messages={messages[locale]}>
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
