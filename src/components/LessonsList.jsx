import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { RiReactjsLine } from 'react-icons/ri';
import { BiLogoJavascript } from 'react-icons/bi';
import PropTypes from 'prop-types';
import LessonsTable from './LessonsTable';

export const LessonsList = ({ course }) => {
    const theme = useTheme();

    return (
        <Box
            borderRadius={1}
            my={4}
            sx={{
                bgcolor: theme.palette.background.default,
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                boxShadow: theme.shadows[20],
                transition: 'box-shadow 10s ease-in-outs',
                '&:hover': {
                    boxShadow: '0px 10px 15px -3px rgba(28,118,210,0.8)',
                },
            }}
        >
            <Typography
                variant="h3"
                sx={{
                    p: 4,
                    display: 'flex',
                    alignItems: 'center',
                    color: theme.palette.primary.dark,
                    transition: 'color 1s ease-in-outs',
                    '&:hover': { color: theme.palette.grey[500] },
                }}
            >
                {course === 'react' && (
                    <RiReactjsLine
                        sx={{
                            alignSelf: 'center',
                        }}
                    />
                )}
                {course === 'js' && (
                    <BiLogoJavascript
                        sx={{
                            alignSelf: 'center',
                        }}
                    />
                )}
                {course.toUpperCase()} Course
            </Typography>
            <LessonsTable course={course} />
        </Box>
    );
};

LessonsList.propTypes = {
    course: PropTypes.string.isRequired,
};
