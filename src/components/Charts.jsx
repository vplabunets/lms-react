import * as React from 'react';
import Box from '@mui/material/Box';
 import {StudentsRating} from "./StudentsRating";
import {HomeWorkCompletionQuality} from "./HomeWorkCompletionQuality";


export const Charts = () => {
    return (
             <Box sx={{
                width: '100%',
                maxHeight: '100%vh',
                display: "flex",
                bgcolor: 'transparent',
                flex: 1,
                mb:2,
                alignItems: "center",
            }}>
                <HomeWorkCompletionQuality/>
                <StudentsRating/>
            </Box>
     )
}
