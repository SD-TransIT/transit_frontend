import { render, screen } from '@testing-library/react';
import React from 'react';
import Forbidden from '../../../components/shared/Forbidden';

describe('Unit tests for the Forbidden component.', () => {
  const FORBIDDEN_TEST_ID = 'forbidden';

  test('Should match snapshot.', () => {
    render(
      <Forbidden />,
    );
    expect(screen.getByTestId(FORBIDDEN_TEST_ID)).toMatchSnapshot();
  });
});
