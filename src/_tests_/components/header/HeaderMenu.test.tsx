import { render, screen } from '@testing-library/react';
import { HeaderMenu } from '../../../components/header/HeaderMenu';
import { MemoryRouter } from 'react-router-dom';

describe('Unit tests for the HeaderMenu component.', () => {
  const DASHBOARD_TEST_ID = 'dashboard-link';
  const REPORTS_TEST_ID = 'reports-link';
  const MANUAL_UPLOAD_TEST_ID = 'manual-upload-link';
  const EXCEL_UPLOAD_TEST_ID = 'excel-upload-link';

  test('Dashboard link should to have specific href attribute.', () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: '/', search: '/' }]}>
        <HeaderMenu />
      </MemoryRouter>,
    );
    const dashboard = screen.getByTestId(DASHBOARD_TEST_ID);
    expect(dashboard).toBeInTheDocument();
    expect(dashboard).toHaveAttribute('href', '/dashboard');
  });

  test('Reports link should to have specific href attribute.', () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: '/', search: '/' }]}>
        <HeaderMenu />
      </MemoryRouter>,
    );
    const dashboard = screen.getByTestId(REPORTS_TEST_ID);
    expect(dashboard).toBeInTheDocument();
    expect(dashboard).toHaveAttribute('href', '/reports');
  });

  test('Manual Upload link should to have specific href attribute.', () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: '/', search: '/' }]}>
        <HeaderMenu />
      </MemoryRouter>,
    );
    const dashboard = screen.getByTestId(MANUAL_UPLOAD_TEST_ID);
    expect(dashboard).toBeInTheDocument();
    expect(dashboard).toHaveAttribute('href', '/manual_upload');
  });

  test('Excel Upload link should to have specific href attribute.', () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: '/', search: '/' }]}>
        <HeaderMenu />
      </MemoryRouter>,
    );
    const dashboard = screen.getByTestId(EXCEL_UPLOAD_TEST_ID);
    expect(dashboard).toBeInTheDocument();
    expect(dashboard).toHaveAttribute('href', '/excel_upload');
  });
});