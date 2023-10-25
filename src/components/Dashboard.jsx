import React from 'react';
import SocialMenu from './SocialMenu';
import Box from '@mui/material/Box';
import { Charts } from './Charts';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import UsefulVideos from './UsefulVideos';
import { Container } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { LessonsList } from './LessonsList';
// import {
//     useGetHomeworksQuery,
//     useUpdateHomeworkMutation,
// } from '../store/lmsBackApi/lmsBack';
// import { useSelector } from 'react-redux';
// import { selectUser } from '../redux/auth/authSelectors';

export const Dashboard = () => {
    const theme = useTheme();

    // const [updateHomeworkMutation, { isLoading: isUpdating }] =
    //     useUpdateHomeworkMutation();
    // console.log(isUpdating);
    // useEffect(() => {
    //     if (data) {
    //         data.map(homework => {
    //             console.log(homework);
    //             updateHomeworkMutation({
    //                 _id: homework._id,
    //                 body: {
    //                     user: user.email,
    //                     status: 'Not completed',
    //                     grade: 0,
    //                 },
    //             });
    //         });
    //     }
    // }, []);
    return (
        <Container
            maxWidth={'xl'}
            height="100vh"
            sx={{ backgroundColor: 'inherit', width: '100%', p: 4 }}
        >
            <Box
                mb={4}
                borderRadius={1}
                p={2}
                sx={{
                    bgcolor: theme.palette.background.default,

                    boxShadow: theme.shadows[20],
                    transition: 'box-shadow 10s ease-in-outs',
                    '&:hover': {
                        boxShadow: '0px 10px 15px -3px rgba(28,118,210,0.8)',
                    },
                }}
            >
                <SocialMenu />
            </Box>
            <Box
                mb={6}
                borderRadius={1}
                pl={2}
                sx={{
                    display: 'flex',
                    color: theme.palette.primary.contrastText,
                    backgroundColor: theme.palette.primary.main,
                    boxShadow: '0px 10px 15px -3px rgba(28,118,210,0.8)',
                    transition: 'box-shadow 1s ease-in-outs',
                    '&:hover': {
                        boxShadow: theme.shadows[20],
                    },
                }}
            >
                <IconButton>
                    <HomeOutlinedIcon
                        sx={{ fill: theme.palette.primary.contrastText }}
                        fontSize="large"
                    />
                </IconButton>
                <Typography
                    variant="h3"
                    sx={{
                        p: 4,
                    }}
                >
                    Dashboard
                </Typography>
            </Box>
            <Charts />
            <LessonsList course={'js'} />
            <LessonsList course={'react'} />

            <UsefulVideos />
        </Container>
    );
};
