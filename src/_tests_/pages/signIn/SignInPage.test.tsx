import { render, screen } from '@testing-library/react';
import { SignInPage } from '../../../pages/signIn/SignInPage';

describe('Unit tests for the SignInPage component.', () => {
  const SIGN_IN_PAGE_TEST_ID = 'sign-in-page';

  test('Should match snapshot.', () => {
    render(<SignInPage />);

    const signInPage = screen.getByTestId(SIGN_IN_PAGE_TEST_ID);
    expect(signInPage).toBeInTheDocument();
    expect(signInPage).toMatchSnapshot();
  });
});
