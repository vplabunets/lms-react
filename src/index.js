import React from 'react';
import { Provider } from 'react-redux';
import { persistor } from './store/index';
import { store } from './store/index';
import { PersistGate } from 'redux-persist/integration/react';

import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
// import { ThemeProvider } from '@mui/material';
// import { testTheme } from './theme/theme';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {/*<ThemeProvider theme={testTheme}>*/}
                <BrowserRouter>
                    <App />
                </BrowserRouter>
                {/*</ThemeProvider>*/}
            </PersistGate>
        </Provider>
    </React.StrictMode>
);
