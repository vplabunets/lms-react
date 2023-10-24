import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import { Breadcrumbs, Button, Tooltip } from '@mui/material';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import AddBoxIcon from '@mui/icons-material/AddBox';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
    useGetArticleByTitleQuery,
    useUpdateArticleMutation,
} from '../../store/lmsBackApi/lmsBack';
import Loader from '../Loader';
import { useTheme } from '@mui/material/styles';
import HtmlIcon from '@mui/icons-material/Html';
import { RiReactjsLine } from 'react-icons/ri';
import JavascriptIcon from '@mui/icons-material/Javascript';
import { FaNodeJs } from 'react-icons/fa';
import { StyledLink } from './TechnicalArticle.styled';

export const TechnicalArticle = () => {
    const theme = useTheme();
    const { title, category } = useParams();
    // console.log(category);
    const { data, isLoading } = useGetArticleByTitleQuery(title);
    console.log(theme);
    const [updateArticle, { isLoading: isUpdating }] =
        useUpdateArticleMutation();
    useEffect(() => {
        if (data) {
            const updatedData = {
                _id: data._id,
                viewed: data.viewed + 1, // Увеличиваем значение viewed на 1
            };
            updateArticle(updatedData);
            // Используем unwrap() для получения обновленных данных
        }
    }, [data]);
    console.log('isUpdating', isUpdating);
    const addIcon = category => {
        switch (category) {
            case 'html':
                return <HtmlIcon sx={{ width: '40px', height: '40px' }} />;
            case 'react':
                return (
                    <RiReactjsLine style={{ width: '30px', height: '30px' }} />
                );
            case 'javascript':
                return (
                    <JavascriptIcon sx={{ width: '60px', height: '50px' }} />
                );
            case 'nodejs':
                return <FaNodeJs style={{ width: '30px', height: '30px' }} />;
            default:
                return '';
        }
    };

    return isLoading ? (
        <Loader />
    ) : (
        data && (
            <Box m={4} maxWidth={'2000px'} height={'100vh'}>
                <Box
                    sx={{
                        display: 'flex',
                        textDecoration: 'none',
                    }}
                >
                    <Breadcrumbs
                        sx={{
                            flex: 1,
                            justifyContent: 'center',
                            fontSize: '1.2rem',
                        }}
                        aria-label="breadcrumb"
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            {addIcon(category)}
                        </Box>
                        <StyledLink to="/technical-articles">
                            Technical articles
                        </StyledLink>
                        <StyledLink
                            state={{ category }}
                            to="/technical-articles/"
                        >
                            {category}
                        </StyledLink>
                        <Typography
                            color="text.primary"
                            sx={{ fontSize: '1.2rem' }}
                        >
                            {title}
                        </Typography>
                    </Breadcrumbs>
                    <Button variant="contained">
                        <AddBoxIcon />
                        <Typography ml={1} sx={{ verticalAlign: 'middle' }}>
                            Add to favourites
                        </Typography>
                    </Button>
                    <Tooltip ml={2} title="Was watched">
                        <Box
                            borderRadius={1}
                            px={2}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                cursor: 'pointer',
                                color: theme.palette.primary.contrastText,
                                backgroundColor: theme.palette.primary.main,
                                transition: theme =>
                                    theme.transitions.create(
                                        ['background-color', 'color'],
                                        {
                                            duration:
                                                theme.transitions.standard,
                                            easing: 'ease-in-out',
                                        }
                                    ),
                                '&:hover': {
                                    backgroundColor: theme =>
                                        theme.palette.primary.contrastText,
                                    color: theme => theme.palette.primary.main,
                                },
                            }}
                        >
                            <VisibilityIcon
                                sx={{
                                    width: '20px',
                                    height: '20px',
                                }}
                            />

                            <Typography ml={1} sx={{ verticalAlign: 'middle' }}>
                                {data.viewed}
                            </Typography>
                        </Box>
                    </Tooltip>
                </Box>

                <Box
                    borderRadius={1}
                    p={4}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: '80vh',
                        bgcolor: theme.palette.background.default,
                        mb: 4,
                        mt: 3,
                        boxShadow: theme.shadows[20],
                        transition: theme =>
                            theme.transitions.create(['box-shadow'], {
                                duration: theme.transitions.standard,
                                easing: 'ease-in-out',
                            }),
                        '&:hover': {
                            boxShadow:
                                '0px 10px 15px -3px rgba(28,118,210,0.8)',
                        },
                    }}
                >
                    <Typography variant="h3" sx={{ flex: 0 }}>
                        {data.title}
                    </Typography>
                    <Divider />
                    <Typography
                        variant="body1"
                        sx={{
                            flex: 2,
                        }}
                    >
                        {data.body}
                    </Typography>
                    <Typography mb={2} variant="body2" component="div">
                        some article footer
                    </Typography>
                </Box>
            </Box>
        )
    );
};
