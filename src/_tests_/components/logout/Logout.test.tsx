import React from 'react';

import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Logout from 'components/logout/Logout';

describe('Unit test for the Logout component.', () => {
  const LOGOUT_TEST_ID = 'logout';

  test('Should match snapshot.', () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: '/', search: '/' }]}>
        <Logout />
      </MemoryRouter>,
    );
    expect(screen.queryByTestId(LOGOUT_TEST_ID)).toMatchSnapshot();
  });
});
