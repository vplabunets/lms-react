import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { useGetHomeworksQuery } from '../store/lmsBackApi/lmsBack';
import Loader from './Loader';
import {
    Button,
    Checkbox,
    Container,
    FormControl,
    FormControlLabel,
    FormGroup,
    Grid,
    LinearProgress,
    Paper,
} from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { RiReactjsLine } from 'react-icons/ri';
import { BiLogoJavascript } from 'react-icons/bi';
import Divider from '@mui/material/Divider';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/auth/authSelectors';

export const Homeworks = () => {
    const user = useSelector(selectUser);
    const { state } = useLocation();
    const theme = useTheme();
    const { data, isLoading } = useGetHomeworksQuery();
    const [homeworks, setHomeworks] = useState(null);
    const [status, setStatus] = useState({
        completed: true,
        isChecking: true,
        notCompleted: true,
    });

    useEffect(() => {
        if (data) {
            const homeworks = data.filter(
                homework => homework.course === state.course
            );
            const userHomeworks = homeworks.filter(homework =>
                homework.completed.find(
                    homework => homework.user === user.email
                )
            );
            setHomeworks(userHomeworks);
            if (homeworks) {
                let filteredHomeworks = filterArray(
                    homeworks,
                    status.completed,
                    status.isChecking,
                    status.notCompleted
                );
                setHomeworks(filteredHomeworks);
            }
        }
    }, [data, state.course, status]);

    function filterArray(array, filter1, filter2, filter3) {
        const completedHomeworks = filter1
            ? array.filter(homework =>
                  homework.completed.find(
                      completedData => completedData.status === 'Completed'
                  )
              )
            : [];
        const isCheckingHomeworks = filter2
            ? array.filter(homework =>
                  homework.completed.find(
                      completedData => completedData.status === 'Is checking'
                  )
              )
            : [];
        const notCompletedHomeworks = filter3
            ? array.filter(homework =>
                  homework.completed.find(
                      completedData => completedData.status === 'Not completed'
                  )
              )
            : [];

        return [
            ...completedHomeworks,
            ...isCheckingHomeworks,
            ...notCompletedHomeworks,
        ];
    }
    const handleFilterHomeworks = event => {
        setStatus({
            ...status,
            [event.target.name]: event.target.checked,
        });
    };

    const getComplexityColor = value => {
        if (value < 30) {
            return 'success';
        }
        if (value >= 30 && value < 70) {
            return 'primary';
        }
        return 'error';
    };

    return isLoading ? (
        <Loader />
    ) : (
        <Container
            maxWidth={'xl'}
            height="100vh"
            sx={{ backgroundColor: 'inherit', width: '100%', p: 4 }}
        >
            <Box
                pl={4}
                sx={{ display: 'flex', justifyContent: 'space-between' }}
            >
                <Box>
                    <Typography
                        variant="h3"
                        sx={{
                            p: 4,
                            display: 'flex',
                            alignItems: 'center',
                            color: theme.palette.primary.dark,
                            transition: 'color 10s ease-in-outs',
                            '&:hover': { color: theme.palette.grey[500] },
                        }}
                    >
                        {state.course === 'react' && (
                            <RiReactjsLine
                                sx={{
                                    alignSelf: 'center',
                                }}
                            />
                        )}
                        {state.course === 'js' && (
                            <BiLogoJavascript
                                sx={{
                                    alignSelf: 'center',
                                }}
                            />
                        )}
                        {state.course.toUpperCase()} Course / Homeworks
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <FormControl
                        sx={{ m: 3, flexDirection: 'row' }}
                        component="fieldset"
                        // variant="standard"
                    >
                        <FormGroup sx={{ m: 3, flexDirection: 'row' }}>
                            <FormControlLabel
                                checked={status.completed}
                                onClick={handleFilterHomeworks}
                                name={'completed'}
                                control={<Checkbox color="success" />}
                                label="Completed"
                                sx={{ color: theme.palette.success.main }}
                            />
                            <FormControlLabel
                                checked={status.isChecking}
                                onClick={handleFilterHomeworks}
                                name={'isChecking'}
                                control={<Checkbox color="primary" />}
                                label="Is checking"
                                sx={{ color: theme.palette.primary.main }}
                            />
                            <FormControlLabel
                                checked={status.notCompleted}
                                onClick={handleFilterHomeworks}
                                name={'notCompleted'}
                                control={<Checkbox color="error" />}
                                label="Not completed"
                                sx={{ color: theme.palette.error.main }}
                            />
                        </FormGroup>
                    </FormControl>
                </Box>
            </Box>
            <Box sx={{ display: 'flex' }}>
                <Grid container spacing={4}>
                    {isLoading ? (
                        <Loader />
                    ) : (
                        homeworks &&
                        homeworks.map(homework => (
                            <Grid key={homework._id} item xs={6} md={4}>
                                <Paper
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: '450px',
                                        padding: '12px',
                                        boxShadow: theme.shadows[20],
                                        transition:
                                            'box-shadow 10s ease-in-outs',
                                        '&:hover': {
                                            boxShadow:
                                                '0px 10px 15px -3px rgba(28,118,210,0.8)',
                                        },
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            height: '20%',
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                height: '25%',
                                            }}
                                            variant="h6"
                                            component="div"
                                        >
                                            HW # {homework.serialNumber}-
                                            {homework.title}
                                        </Typography>

                                        <Box
                                            sx={{
                                                display: 'flex',

                                                alignItems: 'center',
                                                color:
                                                    `${
                                                        homework.completed.find(
                                                            el =>
                                                                el.user ===
                                                                user.email
                                                        ).status
                                                    }` === 'Completed'
                                                        ? theme.palette.success
                                                              .main
                                                        : homework.completed.find(
                                                              el =>
                                                                  el.user ===
                                                                  user.email
                                                          ).status ===
                                                          'Is checking'
                                                        ? theme.palette.primary
                                                              .main
                                                        : theme.palette.error
                                                              .main,
                                            }}
                                        >
                                            <Typography>
                                                {
                                                    homework.completed.find(
                                                        el =>
                                                            el.user ===
                                                            user.email
                                                    ).status
                                                }
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Divider />
                                    <Box
                                        sx={{
                                            display: 'flex',
                                        }}
                                    >
                                        <Box sx={{ flex: 1 }}>
                                            <Typography
                                                variant="body2"
                                                component="div"
                                            >
                                                Deadline date:
                                                <Typography
                                                    variant="caption"
                                                    ml={2}
                                                    sx={{
                                                        color: theme.palette
                                                            .primary.main,
                                                    }}
                                                >
                                                    {homework.deadline}
                                                </Typography>
                                            </Typography>
                                        </Box>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Typography variant="body2" mr={2}>
                                                Complexity:
                                            </Typography>
                                            <LinearProgress
                                                variant="determinate"
                                                value={homework.complexity}
                                                color={getComplexityColor(
                                                    homework.complexity
                                                )}
                                                sx={{
                                                    width: '100px',
                                                }}
                                            />
                                        </Box>
                                    </Box>
                                    <Divider />

                                    <Typography
                                        variant="body1"
                                        sx={{
                                            flex: '1 1 auto',
                                        }}
                                    >
                                        Description: {homework.title}...
                                    </Typography>
                                    <Divider />
                                    <Box
                                        sx={{
                                            marginTop: '10px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            padding: '0 10px',
                                        }}
                                    >
                                        <NavLink
                                            style={{
                                                display: 'inline-block',
                                                alignSelf: 'center',
                                            }}
                                            to={`/${homework.course}/homeworks/${homework.serialNumber}`}
                                        >
                                            <Button variant="contained">
                                                To work <ArrowForwardIcon />
                                            </Button>
                                        </NavLink>
                                    </Box>
                                </Paper>
                            </Grid>
                        ))
                    )}
                </Grid>
            </Box>
        </Container>
    );
};
