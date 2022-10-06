import React from 'react';

import SignInForm from 'components/forms/signInForm';
import LanguageSelect from 'components/shared/LanguageSelect';

export default function SignInPage() {
  return (
    <div className="flex h-screen w-screen bg-transit-grey" data-testid="sign-in-page">
      <div className="sm:w-1/2 bg-hero-image bg-no-repeat bg-cover" />
      <div className="w-full sm:w-1/2">
        <div className="flex flex-col h-screen">
          <div className="flex justify-end w-full pr-10 pt-10">
            <LanguageSelect />
          </div>
          <SignInForm />
        </div>
      </div>
    </div>
  );
}
