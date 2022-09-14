import React from 'react';

import { render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router-dom';

import Logout from 'components/logout/Logout';
import en from 'translations/en.json';

describe('Unit test for the Logout component.', () => {
  const LOGOUT_TEST_ID = 'logout';

  const locale = 'en';
  const messages = { en };

  test('Should match snapshot.', () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: '/', search: '/' }]}>
        <IntlProvider locale={locale} defaultLocale="en" messages={messages[locale]}>
          <Logout />
        </IntlProvider>
      </MemoryRouter>,
    );
    expect(screen.queryByTestId(LOGOUT_TEST_ID)).toMatchSnapshot();
  });
});
