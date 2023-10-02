import React from "react"
import Container from '@mui/material/Container';
import SocialMenu from './SocialMenu'
import Box from "@mui/material/Box";
import {Charts} from "./Charts";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

export const Dashboard = () => {
    return (
        <Container maxWidth="none" sx={{backgroundColor: 'transparent', width: "100%"}}>
            <Box maxWidth="100%" sx={{m: 2, bgcolor: '#fff'}}> <SocialMenu/></Box>
            <Box sx={{display: "flex", m: 2, bgcolor: '#fff'}}>
                <IconButton>
                    <HomeOutlinedIcon fontSize="large"/>
                </IconButton>
                <Typography variant="h3" sx={{p: 2}}>
                    Dashboard
                </Typography>
            </Box>
            <Box sx={{m: 2, bgcolor: '#fff'}}> <Charts/></Box>
        </Container>
    )
}
