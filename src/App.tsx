import React, { useEffect } from 'react';

import { IntlProvider } from 'react-intl';

import RoutesConfig from 'routes/RoutesConfig';
import en from 'translations/en.json';
import fr from 'translations/fr.json';
import pt from 'translations/pt.json';

import 'styles/global.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'stores/reducers/rootReducer';
import { pageLanguage } from 'stores/sagas/localeSaga';
// import { getLocales } from 'stores/actions/locales/localesAction';

function App() {

  const {
    locale,
  } = useSelector(
    (state: RootState) => state.locale,
  );

  const localeY: string = JSON.parse(localStorage.getItem(pageLanguage) as string)
  console.log('locale from local starage: ', locale)


  const localeXX = `fr`;

  const messages = { en, fr, pt };
  return (
    <IntlProvider
      locale={navigator.language}
      defaultLocale="en"
      messages={messages[localeXX]}
    >
      <div className="bg-transit-grey w-screen h-screen">
        <RoutesConfig />
      </div>
    </IntlProvider>
  );
}

export default App;
