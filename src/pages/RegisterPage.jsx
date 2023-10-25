import React, { useState } from 'react';
import {
    Button,
    Container,
    Grid,
    Paper,
    TextField,
    Typography,
} from '@mui/material';
import {
    useCreateUserMutation,
    useGetHomeworksQuery,
    useUpdateHomeworkMutation,
} from '../store/lmsBackApi/lmsBack';
import { Link } from 'react-router-dom';
import { setCredentials } from '../redux/auth/authSlice';
import { useDispatch } from 'react-redux';
// import Loader from "../components/Loader";
export const RegisterPage = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [createUser, { isLoading: isCreating }] = useCreateUserMutation();

    // const[updateHomework, { isLoading: isUpdating }]=useUpdateHomeworkMutation()
    const { data } = useGetHomeworksQuery();

    const [updateHomeworkMutation] = useUpdateHomeworkMutation();

    const handleChange = ({ target: { name, value } }) => {
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

    const registerUserHandler = async e => {
        e.preventDefault();
        const form = e.currentTarget;
        const requestData = await createUser({
            name: form.elements.name.value,
            email: form.elements.email.value,
            type: 'student',
            password: form.elements.password.value,
        }).unwrap();
        console.log(isCreating);
        console.log('Register Page', requestData);
        dispatch(setCredentials(requestData));
        if (data) {
            data.map(homework => {
                // console.log('homework', homework);
                updateHomeworkMutation({
                    _id: homework._id,
                    body: {
                        user: email,
                        status: 'Not completed',
                        grade: 0,
                    },
                });
            });
        }
        setName('');
        setEmail('');
        setPassword('');
    };

    return (
        <>
            (
            <Container maxWidth="sm" style={{ marginTop: '100px' }}>
                <Paper elevation={3} style={{ padding: '20px' }}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Registration
                    </Typography>
                    <form onSubmit={registerUserHandler}>
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
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                >
                                    SignUp
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
                <Link to="/">To Login Page</Link>
                {/*{isLoggedIn && user.email}*/}
                {/*{isRefreshing && user.email}*/}
            </Container>
        </>
    );
};
