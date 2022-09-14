import en from 'translations/en.json';

// Mocked intersection observer for Headless UI Dialog component.
export default class MockObserverImplementation {
  readonly root: Element | null;

  readonly rootMargin: string;

  readonly thresholds: ReadonlyArray<number>;

  constructor() {
    this.root = null;
    this.rootMargin = '';
    this.thresholds = [];
  }
/* eslint-disable */
  disconnect() {}

  observe() {}

  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }

  unobserve() {}
}

// Const values for Intl provider.
export const locale = 'en';
export const messages = { en };
export const defaultLocale = "en"