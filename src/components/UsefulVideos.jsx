import React from 'react';
import Box from '@mui/material/Box';
import Slider from 'react-slick';
import ReactPlayer from 'react-player';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Typography from '@mui/material/Typography';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import { useTheme } from '@mui/material/styles';
const UsefulVideos = () => {
    const theme = useTheme();
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1536,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    const videoUrls = [
        'https://youtu.be/S108rIZA6xY',
        'https://youtu.be/Z-JzryWEBYQ',
        'https://youtu.be/HOYuayH27GM',
        'https://youtu.be/S108rIZA6xY',
        'https://youtu.be/Z-JzryWEBYQ',
        'https://youtu.be/HOYuayH27GM',
    ];

    return (
        <Box
            borderRadius={1}
            sx={{
                color: theme.palette.primary.contrastText,
                backgroundColor: theme.palette.primary.main,
                flexDirection: 'column',
                p: 4,
                boxShadow: '0px 10px 15px -3px rgba(28,118,210,0.8)',
                transition: 'box-shadow 10s ease-in-outs',
                '&:hover': {
                    boxShadow: theme.shadows[20],
                },
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <OndemandVideoIcon sx={{ width: '40px', height: '40px' }} />
                <Typography variant="h3" sx={{ p: 2 }}>
                    Useful links
                </Typography>
            </Box>

            <Slider
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                }}
                {...settings}
            >
                {videoUrls.map((videoUrl, index) => (
                    <ReactPlayer
                        key={index}
                        url={videoUrl}
                        controls
                        height="250px"
                        style={{
                            width: '100%',
                        }}
                    />
                ))}
            </Slider>
        </Box>
    );
};

export default UsefulVideos;
