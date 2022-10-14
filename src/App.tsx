import React from 'react';

import { useCookies } from 'react-cookie';
import { IntlProvider } from 'react-intl';
import { ToastContainer } from 'react-toastify';

import RoutesConfig from 'routes/RoutesConfig';
import en from 'translations/en.json';
import fr from 'translations/fr.json';
import pt from 'translations/pt.json';

import 'react-toastify/dist/ReactToastify.css';
import 'styles/global.css';
import 'styles/toast.css';

export const messages = { en, fr, pt };

function App() {
  const [cookies] = useCookies();

  const EN = 'en';

  return (
    <IntlProvider
      locale={cookies.language === undefined ? EN : cookies.language.value}
      defaultLocale="en"
      messages={messages[cookies.language === undefined
        ? EN : cookies.language.value as keyof typeof messages
      ]}
    >
      <ToastContainer icon={false} />
      <div className="bg-transit-grey w-screen h-full">
        <RoutesConfig />
      </div>
    </IntlProvider>
  );
}

export default App;
