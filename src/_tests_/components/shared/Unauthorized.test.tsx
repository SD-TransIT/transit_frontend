import { render, screen } from '@testing-library/react';
import React from 'react';
import Unauthorized from '../../../components/shared/Unauthorized';

describe('Unit tests for the Unauthorized component.', () => {
  const UNAUTHORIZED_TEST_ID = 'unauthorized';

  test('Should match snapshot.', () => {
    render(
      <Unauthorized />,
    );
    expect(screen.getByTestId(UNAUTHORIZED_TEST_ID)).toMatchSnapshot();
  });
});
