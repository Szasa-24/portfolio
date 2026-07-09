import type { Locale } from './config';

const dictionaries = {
  hu: () => import('./dictionaries/hu.json').then((module) => module.default),
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  uk: () => import('./dictionaries/uk.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale]?.() ?? dictionaries.hu();
};
