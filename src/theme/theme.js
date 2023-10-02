// eslint-disable-next-line no-unused-vars
import * as React from 'react';
import {createTheme} from '@mui/system';

export const testTheme = createTheme({
    palette: {
        background: {
            paper: '#fff',
        },
        text: {
            primary: '#173A5E',
            secondary: '#46505A',
        },
        action: {
            active: '#001E3C',
        },
        success: {
            dark: '#009688',
        },
    },
});
