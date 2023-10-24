import { styled, useTheme } from '@mui/material/styles';
import { NavLink } from 'react-router-dom';

export const StyledLink = styled(NavLink)(() => {
    const theme = useTheme();
    return {
        textDecoration: 'none',
        fontSize: '1.2rem',
        color: theme.palette.primary.main,
        transition:
            'color 0.3s ease-in-out textDecoration 0.3s ease-in-out fontSize 0.3s ease-in-ou',
        '&:hover': {
            color: theme.palette.primary.dark,
            textDecoration: 'underline',
            fontSize: '1.3rem',
        },
    };
});
