import React from 'react';
import Container from '@mui/material/Container';
import SocialMenu from './SocialMenu';
import Box from '@mui/material/Box';
import { Charts } from './Charts';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import UsefulVideos from './UsefulVideos';

export const Dashboard = () => {
    return (
        <Container maxWidth="xl" sx={{ backgroundColor: 'transparent', p: 2 }}>
            <Box
                borderRadius={2}
                maxWidth="100%"
                sx={{
                    bgcolor: '#fff',
                    mb: 3,
                    boxShadow:
                        'inset 10px 10px 10px 3px rgba(0,0,0,0.1),inset 0px 10px 15px -3px rgba(0,0,0,0.1),0px 10px 15px -3px rgba(0,0,0,0.1),0px 10px 15px -3px rgba(0,0,0,0.1),0px 10px 15px -3px rgba(0,0,0,0.1)',
                }}
            >
                <SocialMenu />
            </Box>
            <Box
                borderRadius={2}
                sx={{
                    display: 'flex',
                    backgroundColor: 'primary.light',
                    mb: 3,
                    boxShadow:
                        'inset 10px 10px 10px 3px rgba(0,0,0,0.1),inset 0px 10px 15px -3px rgba(0,0,0,0.1),0px 10px 15px -3px rgba(0,0,0,0.1),0px 10px 15px -3px rgba(0,0,0,0.1),0px 10px 15px -3px rgba(0,0,0,0.1)',
                }}
            >
                <IconButton>
                    <HomeOutlinedIcon fontSize="large" />
                </IconButton>
                <Typography variant="h3" sx={{ p: 2 }}>
                    Dashboard
                </Typography>
            </Box>
            <Charts />
            <UsefulVideos />
        </Container>
    );
};
