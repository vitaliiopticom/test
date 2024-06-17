import { useEffect } from 'react';

import { isStr } from '@/utils/common';

export type DocumentTitle = string | string[];

const APP_TITLE = 'CarOpticom';
const APP_SEPARATOR = ' | ';
const SEPARATOR = ' · ';

const getTitleValue = (title: DocumentTitle, separator: string) => {
  if (Array.isArray(title) && title.length) {
    return title.filter((v) => v).join(separator);
  }

  return title;
};

export const useDocumentTitle = (title?: DocumentTitle) => {
  useEffect(() => {
    document.title =
      isStr(title) || (Array.isArray(title) && !!title.length)
        ? `${getTitleValue(title, SEPARATOR)}${APP_SEPARATOR}${APP_TITLE}`
        : APP_TITLE;
  }, [title]);

  useEffect(() => {
    return () => {
      document.title = APP_TITLE;
    };
  }, []);
};
