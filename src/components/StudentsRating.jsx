import { Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import Box from '@mui/material/Box';
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';

const chartSetting = {
    xAxis: [
        {
            label: 'rating',
        },
    ],
    maxWidth: 500,
    height: 500,
};

export const StudentsRating = ({ data }) => {
    const theme = useTheme();
    const rating = data[0]?.rating;

    return (
        <Box
            borderRadius={1}
            sx={{
                height: 'inherit',
                bgcolor: theme.palette.background.default,
                p: 2,
                flexGrow: 2,
                boxShadow: theme.shadows[20],
                transition: 'box-shadow 1s ease-in-outs',
                '&:hover': {
                    boxShadow: '0px 10px 15px -3px rgba(28,118,210,0.8)',
                },
            }}
        >
            <Typography variant="h4" sx={{ textAlign: 'center' }}>
                Students rating
            </Typography>

            {rating && (
                <BarChart
                    dataset={rating}
                    yAxis={[{ scaleType: 'band', dataKey: 'name' }]}
                    series={[{ dataKey: 'value', barWidth: 4 }]}
                    layout="horizontal"
                    {...chartSetting}
                    sx={{ width: '100%', padding: '30px' }}
                />
            )}
        </Box>
    );
};

StudentsRating.propTypes = {
    data: PropTypes.array.isRequired,
};
