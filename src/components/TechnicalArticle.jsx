import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import { Breadcrumbs, Paper, Tooltip } from '@mui/material';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
    useGetArticleByTitleQuery,
    // useUpdateArticleMutation,
} from '../store/lmsBackApi/lmsBack';
import Loader from './Loader';

export const TechnicalArticle = () => {
    const { title, category } = useParams();
    console.log(category);
    const { data, isLoading } = useGetArticleByTitleQuery(title);
    // const [updateArticle, { isLoading: isUpdating }] =
    //     useUpdateArticleMutation();
    // useEffect(() => {
    //     updateArticle({ _id: data.id, viewed: 999 });
    // }, [data.id]);
    // console.log(isUpdating);
    return isLoading ? (
        <Loader />
    ) : (
        <Box
            maxWidth={'xs'}
            sx={{ flexGrow: 1, bgcolor: 'text', height: '100vh' }}
        >
            <Breadcrumbs p={2} aria-label="breadcrumb">
                <Link
                    underline="hover"
                    color="inherit"
                    to="/technical-articles"
                >
                    Technical articles
                </Link>
                <Link
                    underline="hover"
                    color="inherit"
                    to="/technical-articles/html"
                >
                    {category}
                </Link>
                <Typography color="text.primary">{title}</Typography>
            </Breadcrumbs>
            <Paper
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '450px',
                    padding: '10px',
                }}
            >
                <Typography
                    mb={2}
                    sx={{ height: '25%' }}
                    variant="h5"
                    component="div"
                >
                    {data.title}
                </Typography>
                <Divider />
                <Typography variant="h6" component="div">
                    Publication Date: {data.createdAt}
                </Typography>
                <Divider />

                <Typography
                    variant="body2"
                    sx={{
                        flex: '1 1 auto',
                    }}
                >
                    {data.body}
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
                    <Tooltip title="Was watched">
                        <IconButton>
                            <VisibilityIcon
                                sx={{
                                    width: '20px',
                                    height: '20px',
                                }}
                            />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Paper>
        </Box>
    );
};
