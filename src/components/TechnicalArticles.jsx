import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Button, Grid, Paper, Tooltip } from '@mui/material';
import { NavLink } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import VisibilityIcon from '@mui/icons-material/Visibility';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { useGetArticlesQuery } from '../store/lmsBackApi/lmsBack';
import { getDate } from '../utils/getDate';
import Loader from './Loader';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import HtmlIcon from '@mui/icons-material/Html';
import JavascriptIcon from '@mui/icons-material/Javascript';
import { RiReactjsLine } from 'react-icons/ri';
import { FaNodeJs } from 'react-icons/fa';

export const TechnicalArticles = () => {
    const { data, isLoading } = useGetArticlesQuery();
    const [articles, setArticles] = useState(null);
    const [categories, setCategories] = useState(null);
    const [activeCategory, setActiveCategory] = useState('all');
    useEffect(() => {
        if (data) {
            setArticles(data);
            setCategories(['all', ...getCategories(data)]);
        }
    }, [data]);
    const addIcon = category => {
        switch (category) {
            case 'html':
                return <HtmlIcon />;
            case 'react':
                return <RiReactjsLine />;
            case 'javascript':
                return <JavascriptIcon />;
            case 'nodejs':
                return <FaNodeJs />;
            default:
                return '';
        }
    };
    const handleCategoryFilter = async category => {
        if (category === 'all') {
            setActiveCategory(category);
            return setArticles(data);
        }
        const filteredArticles = await data.filter(
            article => article.category === category
        );
        setActiveCategory(category);
        setArticles(filteredArticles);
    };

    const getCategories = data => {
        const categories = [];
        const categoriesObj = new Set(data.map(element => element.category));
        for (let category of categoriesObj.entries()) {
            categories.push(category[0]);
        }
        return categories;
    };

    return isLoading ? (
        <Loader />
    ) : (
        <Container
            maxWidth="xl"
            height="xl"
            sx={{ backgroundColor: 'transparent', width: '100%', p: 2 }}
        >
            <Box
                borderRadius={2}
                sx={{
                    display: 'flex',
                    backgroundColor: 'primary.light',
                    mb: 3,
                    boxShadow:
                        'inset 10px 10px 10px 3px rgba(0,0,0,0.1),inset 0px 10px 15px -3px rgba(0,0,0,0.1),0px 10px 15px -3px rgba(0,0,0,0.1),0px 10px 15px -3px rgba(0,0,0,0.1),0px 10px 15px -3px rgba(0,0,0,0.1)',
                }}
            >
                <Typography variant="h3" sx={{ p: 2 }}>
                    Technical Articles
                </Typography>
            </Box>
            <Box sx={{ display: 'flex' }}>
                <Grid container spacing={4}>
                    {articles &&
                        articles.map(element => (
                            <Grid key={element._id} item xs={6} md={4}>
                                <Paper
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: '450px',
                                        padding: '8px',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            // flexGrow: '1 1 ',
                                        }}
                                    >
                                        <Typography
                                            mb={2}
                                            sx={{ height: '25%' }}
                                            variant="h5"
                                            component="div"
                                        >
                                            {element.title}
                                        </Typography>
                                        <Typography
                                            mb={2}
                                            sx={{ height: '25%' }}
                                            component="div"
                                        >
                                            {element.category}
                                        </Typography>
                                    </Box>
                                    <Divider />
                                    <Typography variant="body2" component="div">
                                        Publication date: {getDate(element)}
                                    </Typography>
                                    <Divider />

                                    <Typography
                                        variant="body1"
                                        sx={{
                                            flex: '1 1 auto',
                                        }}
                                    >
                                        {element.body}
                                    </Typography>
                                    <Divider />
                                    <Box
                                        sx={{
                                            marginTop: '10px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',

                                            padding: '0 10px',
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Tooltip title="Was watched">
                                                <IconButton mr={2}>
                                                    <VisibilityIcon
                                                        sx={{
                                                            width: '20px',
                                                            height: '20px',
                                                        }}
                                                    />
                                                </IconButton>
                                            </Tooltip>

                                            <Typography
                                                sx={{ verticalAlign: 'middle' }}
                                            >
                                                {element.viewed}
                                            </Typography>
                                        </Box>

                                        <NavLink
                                            style={{
                                                display: 'inline-block',
                                                alignSelf: 'center',
                                            }}
                                            to={`${element.category}/${element.title}`}
                                        >
                                            <Button variant="contained">
                                                Read more <ArrowForwardIcon />
                                            </Button>
                                        </NavLink>
                                    </Box>
                                </Paper>
                            </Grid>
                        ))}
                </Grid>
                <Box
                    // ml={4}
                    sx={{
                        position: 'relative',
                        // backgroundColor: '#fff',
                        // display: 'flex',
                        height: '500px',
                        flexDirection: 'column',
                        width: '25%',
                    }}
                >
                    <Box
                        ml={4}
                        p={1}
                        sx={{
                            position: 'fixed',
                            backgroundColor: '#fff',
                            top: '190px',
                            display: 'flex',
                            height: '500px',
                            flexDirection: 'column',
                            width: '15%',
                            borderRadius: '4px',
                        }}
                    >
                        <Typography
                            mb={2}
                            sx={{
                                textAlign: 'center',
                            }}
                            variant="h5"
                            component="div"
                        >
                            Select category
                        </Typography>
                        <Divider />
                        <List>
                            {categories &&
                                categories.map((category, index) => (
                                    <ListItem p={0} key={index}>
                                        <ListItemButton
                                            p={0}
                                            selected={
                                                activeCategory === category
                                            } // Делаем активную категорию выделенной
                                            onClick={() =>
                                                handleCategoryFilter(category)
                                            }
                                        >
                                            <Box sx={{ width: '25%' }}>
                                                {addIcon(category)}
                                            </Box>
                                            {category.toUpperCase()}
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                        </List>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};
