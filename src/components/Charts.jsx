import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import {StudentsRating} from "./StudentsRating";
import {HomeWorkCompletionQuality} from "./HomeWorkCompletionQuality";


export const Charts = () => {
    return (
        <Container maxWidth="none" sx={{backgroundColor: 'transparent', width: '100%',}}>
            <Box sx={{
                width: '100%',
                height: '100%',
                display: "flex",
                bgcolor: 'text.disabled',
                flex: 1,

                alignItems: "center",
            }}>
                <HomeWorkCompletionQuality/>
                <StudentsRating/>
            </Box>
        </Container>
    )
}
