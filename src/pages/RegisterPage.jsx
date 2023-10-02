import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {selectIsLoggedIn, selectIsRefreshing, selectUser} from '../redux/auth/authSelectors';
import {Button, Container, Grid, Paper, TextField, Typography} from '@mui/material';
import authOperations from "../redux/auth/authOperations";
import Loader from "../components/Loader";

export const RegisterPage = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const handleChange = ({target: {name, value}}) => {
        switch (name) {
            case 'name':
                return setName(value);
            case 'email':
                return setEmail(value);
            case 'password':
                return setPassword(value);
            default:
                return;
        }
    };
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const isRefreshing = useSelector(selectIsRefreshing);
    const user = useSelector(selectUser);
    const handleSubmit = e => {
        e.preventDefault();
        const form = e.currentTarget;

        dispatch(
            authOperations.register({
                user: {
                    name: form.elements.name.value,
                    email: form.elements.email.value,
                    password: form.elements.password.value,
                }

            })
        );

        setEmail('');
        setPassword('');
    };

    return <>
        {!isRefreshing ? (<Container maxWidth="sm" style={{marginTop: '100px'}}>
                <Paper elevation={3} style={{padding: '20px'}}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Registration
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    label="Name"
                                    fullWidth
                                    variant="outlined"
                                    margin="normal"
                                    name="name"
                                    value={name}
                                    onChange={handleChange}
                                />
                            </Grid>
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
                                    label="Password"
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
                                <Button type="submit" variant="contained" color="primary" fullWidth>
                                    SignUp
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
                {isLoggedIn && user.email}
                {/*{isRefreshing && user.email}*/}
            </Container>
        ) : <Loader/>
        }</>

}

