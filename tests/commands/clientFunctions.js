import { ClientFunction } from 'testcafe';

export const scrollBy = ClientFunction((x, y) => {
  window.scrollBy(x, y);
});

export const getUrl = ClientFunction(() => window.location.href);
