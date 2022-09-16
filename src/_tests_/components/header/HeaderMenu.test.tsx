import React from 'react';

import { render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router-dom';

import { defaultLocale, locale, messages } from '_tests_/test-utils';
import HeaderMenu from 'components/header/HeaderMenu';

describe('Unit tests for the HeaderMenu component.', () => {
  const DASHBOARD_TEST_ID = 'dashboard-link';
  const REPORTS_TEST_ID = 'reports-link';
  const MANUAL_UPLOAD_TEST_ID = 'manual-upload-link';
  const EXCEL_UPLOAD_TEST_ID = 'excel-upload-link';

  test('Dashboard link should to have specific href attribute.', () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: '/', search: '/' }]}>
        <IntlProvider locale={locale} defaultLocale={defaultLocale} messages={messages[locale]}>
          <HeaderMenu />
        </IntlProvider>
      </MemoryRouter>,
    );
    const dashboard = screen.getByTestId(DASHBOARD_TEST_ID);
    expect(dashboard).toBeInTheDocument();
    expect(dashboard).toHaveAttribute('href', '/dashboard');
  });

  test('Reports link should to have specific href attribute.', () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: '/', search: '/' }]}>
        <IntlProvider locale={locale} defaultLocale={defaultLocale} messages={messages[locale]}>
          <HeaderMenu />
        </IntlProvider>
      </MemoryRouter>,
    );
    const dashboard = screen.getByTestId(REPORTS_TEST_ID);
    expect(dashboard).toBeInTheDocument();
    expect(dashboard).toHaveAttribute('href', '/reports');
  });

  test('Manual Upload link should to have specific href attribute.', () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: '/', search: '/' }]}>
        <IntlProvider locale={locale} defaultLocale={defaultLocale} messages={messages[locale]}>
          <HeaderMenu />
        </IntlProvider>
      </MemoryRouter>,
    );
    const dashboard = screen.getByTestId(MANUAL_UPLOAD_TEST_ID);
    expect(dashboard).toBeInTheDocument();
    expect(dashboard).toHaveAttribute('href', '/manual_upload');
  });

  test('Excel Upload link should to have specific href attribute.', () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: '/', search: '/' }]}>
        <IntlProvider locale={locale} defaultLocale={defaultLocale} messages={messages[locale]}>
          <HeaderMenu />
        </IntlProvider>
      </MemoryRouter>,
    );
    const dashboard = screen.getByTestId(EXCEL_UPLOAD_TEST_ID);
    expect(dashboard).toBeInTheDocument();
    expect(dashboard).toHaveAttribute('href', '/excel_upload');
  });
});
