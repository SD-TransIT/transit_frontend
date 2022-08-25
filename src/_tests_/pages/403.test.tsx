import { render, screen } from '@testing-library/react';
import React from 'react';
// import Unauthorized from '../../components/Unauthorized';
import Custom403 from '../../pages/403';

describe('Unit tests for the Unauthorized component.', () => {
  const CUSTOM_403_TEST_ID = '403-error';

  test('Should match snapshot.', () => {
    render(
      <Custom403 />,
    );
    expect(screen.getByTestId(CUSTOM_403_TEST_ID)).toMatchSnapshot();
  });
});
