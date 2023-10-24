import * as React from 'react';
import Box from '@mui/material/Box';
import { StudentsRating } from './StudentsRating';
import { HomeWorkCompletionQuality } from './HomeWorkCompletionQuality';
import { useGetStatisticsQuery } from '../store/lmsBackApi/lmsBack';
import Loader from './Loader';

export const Charts = () => {
    const { data, isLoading } = useGetStatisticsQuery();
    return isLoading ? (
        <Loader />
    ) : (
        data && (
            <Box
                // maxWidth={'xl'}
                sx={{
                    height: '500px',
                    display: 'flex',
                    flex: 1,
                    alignItems: 'center',
                }}
            >
                <HomeWorkCompletionQuality data={data} />
                <StudentsRating data={data} />
            </Box>
        )
    );
};
