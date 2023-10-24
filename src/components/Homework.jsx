import React, { useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';

import { useGetHomeworkBySerialNumberQuery } from '../store/lmsBackApi/lmsBack';
import Loader from './Loader';
import { useTheme } from '@mui/material/styles';
import { Button } from '@mui/material';
import { FormControl } from '@mui/base/FormControl';
import Divider from '@mui/material/Divider';

export const Homework = () => {
    const theme = useTheme();
    const { course, number } = useParams();
    const [value, setValue] = useState('');
    const { data, isLoading } = useGetHomeworkBySerialNumberQuery(number);

    return isLoading ? (
        <Loader />
    ) : (
        data && (
            <Box m={4} maxWidth={'2000px'} height={'100vh'}>
                <Box
                    borderRadius={1}
                    sx={{
                        display: 'flex',
                        bgcolor: theme.palette.background.default,
                        mb: 4,
                        mt: 3,
                        boxShadow: theme.shadows[20],
                        transition: 'box-shadow 10s ease-in-outs',
                        '&:hover': {
                            boxShadow:
                                '0px 10px 15px -3px rgba(28,118,210,0.8)',
                        },
                    }}
                >
                    <Typography variant="h3" sx={{ p: 2 }}>
                        Homework # {data.serialNumber} - {data.title}
                    </Typography>
                </Box>
                <Box
                    borderRadius={1}
                    p={4}
                    sx={{
                        display: 'flex',
                        bgcolor: theme.palette.background.default,
                        mb: 4,
                        mt: 3,
                        boxShadow: theme.shadows[20],
                        transition: 'box-shadow 10s ease-in-outs',
                        '&:hover': {
                            boxShadow:
                                '0px 10px 15px -3px rgba(28,118,210,0.8)',
                        },
                    }}
                >
                    <NavLink
                        style={{
                            display: 'inline-block',
                            alignSelf: 'center',
                        }}
                        to={`/${course}/lessons/${number}`}
                    >
                        <Button variant="contained">Go back to lesson </Button>
                    </NavLink>
                </Box>
                <Box
                    borderRadius={1}
                    p={4}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        bgcolor: theme.palette.background.default,
                        mb: 4,
                        mt: 3,
                        boxShadow: theme.shadows[20],
                        transition: 'box-shadow 10s ease-in-outs',
                        '&:hover': {
                            boxShadow:
                                '0px 10px 15px -3px rgba(28,118,210,0.8)',
                        },
                    }}
                >
                    <Typography variant="h5" sx={{ p: 2 }}>
                        Turn in Homework
                    </Typography>
                    <FormControl style={{ width: '100%' }}>
                        <ReactQuill
                            theme="snow"
                            value={value}
                            onChange={setValue}
                        />
                        <Button variant="contained" sx={{ marginTop: 2 }}>
                            SUBMIT
                        </Button>
                    </FormControl>
                </Box>
                <Box
                    borderRadius={1}
                    p={4}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        bgcolor: theme.palette.background.default,
                        mb: 4,
                        mt: 3,
                        boxShadow: theme.shadows[20],
                        transition: 'box-shadow 1s ease-in-outs',
                        '&:hover': {
                            boxShadow:
                                '0px 10px 15px -3px rgba(28,118,210,0.8)',
                        },
                    }}
                >
                    <Typography variant="h5" sx={{ p: 2 }}>
                        Completed Homework
                    </Typography>
                    <Divider />
                    <Typography variant="h5" sx={{ p: 2 }}>
                        Not Completed Homework
                    </Typography>
                </Box>
            </Box>
        )
    );
};
