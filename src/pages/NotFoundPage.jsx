import React from "react";
import {Button, Container, Typography} from '@mui/material';
import {Link} from 'react-router-dom';

export const NotFoundPage = () => {
    return (
        <Container maxWidth="sm" style={{marginTop: '100px'}}>
            <Typography variant="h4" align="center" gutterBottom>
                Страница не найдена
            </Typography>
            <Typography variant="body1" align="center" paragraph>
                The requested page does not exist. </Typography>
            <Button variant="contained" color="primary" component={Link} to="/">
                Go back to main
            </Button>
        </Container>

    )
}
