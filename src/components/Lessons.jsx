import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Button, Container, Grid, Paper } from '@mui/material';
import { useGetLessonsQuery } from '../store/lmsBackApi/lmsBack';
import Loader from './Loader';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { getDate } from '../utils/getDate';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useTheme } from '@mui/material/styles';
import { RiReactjsLine } from 'react-icons/ri';
import { BiLogoJavascript } from 'react-icons/bi';

export const Lessons = () => {
    const { state } = useLocation();
    const theme = useTheme();
    const { data, isLoading } = useGetLessonsQuery();
    const [lessons, setLessons] = useState(null);

    useEffect(() => {
        if (data) {
            setLessons(data.filter(lessons => lessons.course === state.course));
        }
    }, [data, state.course]);

    return isLoading ? (
        <Loader />
    ) : (
        <Container
            maxWidth={'xl'}
            height="100vh"
            sx={{ backgroundColor: 'inherit', width: '100%', p: 4 }}
        >
            <Box pl={4}>
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
                    {state.course.toUpperCase()} Course / Lessons
                </Typography>
            </Box>
            <Box sx={{ display: 'flex' }}>
                <Grid container spacing={4}>
                    {isLoading ? (
                        <Loader />
                    ) : (
                        lessons &&
                        lessons.map(lesson => (
                            <Grid key={lesson._id} item xs={6} md={4}>
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
                                            Lesson # {lesson.serialNumber}-
                                            {lesson.title}
                                        </Typography>

                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Typography
                                                p={1}
                                                sx={{
                                                    verticalAlign: 'middle',
                                                    color: theme.palette.primary
                                                        .contrastText,

                                                    backgroundColor:
                                                        theme.palette.grey[500],
                                                }}
                                            >
                                                No homework
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Divider />
                                    <Typography variant="body2" component="div">
                                        Lesson date:
                                        <Typography
                                            variant="caption"
                                            ml={2}
                                            sx={{
                                                color: theme.palette.primary
                                                    .main,
                                            }}
                                        >
                                            {getDate(lesson)}
                                        </Typography>
                                    </Typography>
                                    <Divider />

                                    <Typography
                                        variant="body1"
                                        sx={{
                                            flex: '1 1 auto',
                                        }}
                                    >
                                        Description: {lesson.title}...
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
                                            to={`/${lesson.course}/lessons/${lesson.serialNumber}`}
                                        >
                                            <Button variant="contained">
                                                To lesson <ArrowForwardIcon />
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
