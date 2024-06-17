import '../src/index.css';
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';
import i18n from './i18n';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  options: {
    storySort: {
      method: 'alphabetical',
    },
  },
};

export const decorators = [
  (Story) => (
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    </I18nextProvider>
  ),
];
