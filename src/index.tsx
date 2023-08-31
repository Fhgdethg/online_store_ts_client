import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import App from './components/App/App';
import { BrowserRouter } from 'react-router-dom';
import Global from './ui/SCGlobal';

import { store } from './redux/store';
import { theme } from './theme/theme';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <DndProvider backend={HTML5Backend}>
          <Global />
          <App />
        </DndProvider>
      </ThemeProvider>
    </Provider>
  </BrowserRouter>,
);
