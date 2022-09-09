import React from 'react';

import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import SignInPage from 'pages/signIn/SignInPage';
import store from 'stores/store';

describe('Unit tests for the SignInPage component.', () => {
  const SIGN_IN_PAGE_TEST_ID = 'sign-in-page';

  test('Should match snapshot.', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[{ pathname: '/sign_in', search: '/' }]}>
          <SignInPage />
        </MemoryRouter>
      </Provider>,
    );

    const signInPage = screen.getByTestId(SIGN_IN_PAGE_TEST_ID);
    expect(signInPage).toBeInTheDocument();
    expect(signInPage).toMatchSnapshot();
  });
});
