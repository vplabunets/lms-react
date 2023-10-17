import React, { useState } from 'react';
import {
    Button,
    Container,
    Grid,
    Paper,
    TextField,
    Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useLoginUserMutation } from '../store/lmsBackApi/lmsBack';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../redux/auth/authSlice';
import Loader from '../components/Loader';

export const LoginPage = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginUser, { isLoading: isLoggining }] = useLoginUserMutation();
    const handleChange = ({ target: { name, value } }) => {
        switch (name) {
            case 'email':
                return setEmail(value);
            case 'password':
                return setPassword(value);
            default:
                return;
        }
    };
    const handleSubmit = async e => {
        e.preventDefault();
        const form = e.currentTarget;
        const requestData = await loginUser({
            email: form.elements.email.value,
            password: form.elements.password.value,
        }).unwrap();
        dispatch(setCredentials(requestData));
        setEmail('');
        setPassword('');
    };

    return (
        <Container maxWidth="sm" style={{ marginTop: '100px' }}>
            {!isLoggining ? (
                <Paper elevation={3} style={{ padding: '20px' }}>
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
                                    value={email}
                                    onChange={handleChange}
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
                                    value={password}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                >
                                    Войти
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            ) : (
                <Loader />
            )}{' '}
            <Link to="/register">To Register Page</Link>
        </Container>
    );
};
