import React from 'react';

import { useCookies } from 'react-cookie';
import Select from 'react-select';

import SignInForm from 'components/forms/signInForm';

export default function SignInPage() {
  const [langCookies, setLangCookie] = useCookies(['language']);

  const options = [
    { value: 'en', label: 'English' },
    { value: 'fr', label: 'French' },
    { value: 'pt', label: 'Portugese' },
  ];

  const onLocaleChange = (event: any) => {
    setLangCookie('language', { value: event.value, label: event.label }, { path: '/', sameSite: true });
  };

  return (
    <div className="flex h-screen w-screen bg-transit-grey" data-testid="sign-in-page">
      <div className="sm:w-1/2 bg-hero-image bg-no-repeat bg-cover" />
      <div className="w-full sm:w-1/2">
        <div className="flex flex-col h-screen">
          <div className="flex justify-end w-full pr-10 pt-10">
            <Select<Object>
              defaultValue={langCookies.language?.label}
              onChange={onLocaleChange}
              options={options}
              className="shadow-dateInput rounded w-1/5"
              placeholder={langCookies.language?.label}
            />
          </div>
          <SignInForm />
        </div>
      </div>
    </div>
  );
}
