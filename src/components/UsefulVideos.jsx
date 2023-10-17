import React from 'react';
import Box from '@mui/material/Box';
import Slider from 'react-slick';
import ReactPlayer from 'react-player';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Typography from '@mui/material/Typography';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
const UsefulVideos = () => {
    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
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
            borderRadius={2}
            sx={{
                // width: '100%',
                backgroundColor: 'primary.main',
                flexDirection: 'column',
                p: 4,
                boxShadow:
                    'inset 10px 10px 10px 3px rgba(0,0,0,0.1),inset 0px 10px 15px -3px rgba(0,0,0,0.1),0px 10px 15px -3px rgba(0,0,0,0.1),0px 10px 15px -3px rgba(0,0,0,0.1),0px 10px 15px -3px rgba(0,0,0,0.1)',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    // width: '100%',
                }}
            >
                <OndemandVideoIcon sx={{ width: '40px', height: '40px' }} />
                <Typography variant="h3" sx={{ p: 2 }}>
                    Useful links
                </Typography>
            </Box>

            <Slider {...settings}>
                {videoUrls.map((videoUrl, index) => (
                    <Box
                        sx={{
                            // display: 'flex',
                            // alignItems: 'center',
                            maxWidth: '100px',
                        }}
                        key={index}
                    >
                        <ReactPlayer
                            url={videoUrl}
                            controls
                            height="250px"
                            // width=""
                            // height="auto"
                        />
                    </Box>
                ))}
            </Slider>
        </Box>
    );
};

export default UsefulVideos;
