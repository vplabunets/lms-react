import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
// import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Backdrop from '@mui/material/Backdrop';


export default function Loader() {
    return (
        <Container>
            {/*<Box sx={{display: 'flex'}}>*/}
            {/*    <CircularProgress/>*/}
            {/*</Box>*/}
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={true}

            >
                <CircularProgress color="inherit"/>
            </Backdrop>

        </Container>
    );
}