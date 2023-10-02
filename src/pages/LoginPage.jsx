import React from 'react';
import {Button, Container, Grid, Paper, TextField, Typography} from '@mui/material';
import authOperations from '../redux/auth/authOperations';
import {useDispatch} from 'react-redux';


export const LoginPage = () => {
    const dispatch = useDispatch();

    const handleSubmit = e => {
        e.preventDefault();
        const form = e.currentTarget;

        dispatch(
            authOperations.logIn({
                email: form.elements.email.value,
                password: form.elements.password.value,
            })
        );
    };

    return (<Container maxWidth="sm" style={{marginTop: '100px'}}>
        <Paper elevation={3} style={{padding: '20px'}}>
            <Typography variant="h4" align="center" gutterBottom>
                Войти
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="Email"
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            name="email"

                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Пароль"
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            type="password"
                            name="password"

                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Войти
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    </Container>);

}