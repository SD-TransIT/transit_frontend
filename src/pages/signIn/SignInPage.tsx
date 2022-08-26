import React from 'react';
import SignInForm from '../../components/forms/signInForm';

export default function SignInPage() {
  return (
    <div className="flex h-screen w-screen bg-transit-grey" data-testid="sign-in-page">
      <div className="sm:w-1/2 bg-hero-image bg-no-repeat bg-cover bg-center" />
      <div className="w-full sm:w-1/2">
        <div className="flex h-screen">
          <div className="bg-transit-white m-auto w-full max-w-lg h-full max-h-96">
            <SignInForm />
          </div>
        </div>
      </div>
    </div>
  );
}
