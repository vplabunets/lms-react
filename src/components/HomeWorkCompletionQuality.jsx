import { Typography } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import Box from '@mui/material/Box';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';

export const HomeWorkCompletionQuality = ({ data }) => {
    const theme = useTheme();
    const { completionQuality } = data[0];
    const [windowWidth, setWindowWidth] = useState(window.innerWidth / 3);

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    const handleResize = () => {
        setWindowWidth(window.innerWidth / 3);
    };

    return (
        <Box
            borderRadius={1}
            sx={{
                height: 'inherit',
                bgcolor: theme.palette.background.default,
                p: 2,
                mr: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                boxShadow: theme.shadows[20],
                transition: 'box-shadow 10s ease-in-outs',
                '&:hover': {
                    boxShadow: '0px 10px 15px -3px rgba(28,118,210,0.8)',
                },
            }}
        >
            <Typography
                variant="h4"
                sx={{ textAlign: 'center', display: 'block' }}
            >
                Homework completion quality
            </Typography>
            <PieChart
                sx={{ alignItems: 'center', justifyContent: 'center' }}
                series={[
                    {
                        data: completionQuality.map(element => {
                            return { ...element, label: element.level };
                        }),
                        innerRadius: windowWidth * 0.1,
                        outerRadius: windowWidth * 0.3,
                        paddingAngle: 5,
                        cornerRadius: 5,
                        cy: 250,
                    },
                ]}
                width={windowWidth}
            />
        </Box>
    );
};

HomeWorkCompletionQuality.propTypes = {
    data: PropTypes.array.isRequired,
};
