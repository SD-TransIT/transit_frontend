import React from 'react';

import { render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router-dom';

import { defaultLocale, locale, messages } from '_tests_/test-utils';
import Logout from 'components/logout/Logout';

describe('Unit test for the Logout component.', () => {
  const LOGOUT_TEST_ID = 'logout';

  test('Should match snapshot.', () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: '/', search: '/' }]}>
        <IntlProvider locale={locale} defaultLocale={defaultLocale} messages={messages[locale]}>
          <Logout />
        </IntlProvider>
      </MemoryRouter>,
    );
    expect(screen.queryByTestId(LOGOUT_TEST_ID)).toMatchSnapshot();
  });
});
