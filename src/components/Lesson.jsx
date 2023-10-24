import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import {
    useGetHomeworksQuery,
    useGetLessonBySerialNumberQuery,
} from '../store/lmsBackApi/lmsBack';
import Loader from './Loader';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Link from '@mui/material/Link';
import { Button, TableHead } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import { getDate } from '../utils/getDate';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/auth/authSelectors';

export const Lesson = () => {
    const user = useSelector(selectUser);
    console.log(user);
    const theme = useTheme();
    const { course, number } = useParams();
    const { data, isLoading } = useGetLessonBySerialNumberQuery(number);
    const { data: homeworksData } = useGetHomeworksQuery();
    console.log(homeworksData);
    return isLoading ? (
        <Loader />
    ) : (
        <Box m={4} maxWidth={'2000px'} height={'100%'}>
            <Box
                borderRadius={1}
                sx={{
                    display: 'flex',
                    bgcolor: theme.palette.background.default,
                    mb: 4,
                    mt: 3,
                    boxShadow: theme.shadows[20],
                    transition: 'box-shadow 10s ease-in-outs',
                    '&:hover': {
                        boxShadow: '0px 10px 15px -3px rgba(28,118,210,0.8)',
                    },
                }}
            >
                <Typography variant="h3" sx={{ p: 2 }}>
                    Lesson # {data.serialNumber} - {data.title}
                </Typography>
            </Box>
            <Box
                borderRadius={1}
                p={4}
                sx={{
                    display: 'flex',
                    // height: '500px',
                    bgcolor: theme.palette.background.default,
                    mb: 4,
                    mt: 3,
                    boxShadow: theme.shadows[20],
                    transition: 'box-shadow 10s ease-in-outs',
                    '&:hover': {
                        boxShadow: '0px 10px 15px -3px rgba(28,118,210,0.8)',
                    },
                }}
            >
                <iframe
                    src={data.url}
                    width="100%" // Ширина iframe
                    height="500" // Высота iframe
                    title="Embedded Video" // Заголовок iframe (опционально)
                ></iframe>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    bgcolor: 'inherit',
                }}
            >
                {data && (
                    <Box
                        borderRadius={1}
                        p={4}
                        mr={4}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            flexGrow: '1',
                            bgcolor: theme.palette.background.default,
                            boxShadow: theme.shadows[20],
                            transition: 'box-shadow 10s ease-in-outs',
                            '&:hover': {
                                boxShadow:
                                    '0px 10px 15px -3px rgba(28,118,210,0.8)',
                            },
                        }}
                    >
                        <Typography variant="h6" pb={2}>
                            Addtional materials
                        </Typography>
                        <List>
                            {data.addMaterials.map((material, index) => (
                                <ListItem key={index}>
                                    <Link href={material}>
                                        <ListItemButton>
                                            {material}
                                        </ListItemButton>
                                    </Link>
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                )}
                {true && (
                    <Box
                        borderRadius={1}
                        p={4}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            flexGrow: '1',
                            bgcolor: theme.palette.background.default,
                            boxShadow: theme.shadows[20],
                            transition: 'box-shadow 10s ease-in-outs',
                            '&:hover': {
                                boxShadow:
                                    '0px 10px 15px -3px rgba(28,118,210,0.8)',
                            },
                        }}
                    >
                        <Typography variant="h6" pb={2}>
                            Home Works
                        </Typography>
                        <Box>
                            <TableContainer component={Paper}>
                                <Table aria-label="custom pagination table">
                                    <TableHead
                                        sx={{
                                            backgroundColor:
                                                theme.palette.primary.dark,
                                            color: '#fff',
                                        }}
                                    >
                                        <TableRow>
                                            <TableCell
                                                sx={{ color: 'inherit' }}
                                            >
                                                Title
                                            </TableCell>
                                            <TableCell
                                                sx={{ color: 'inherit' }}
                                            >
                                                Deadline
                                            </TableCell>
                                            <TableCell
                                                sx={{ color: 'inherit' }}
                                            >
                                                Status
                                            </TableCell>
                                            <TableCell
                                                sx={{ color: 'inherit' }}
                                            ></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {homeworksData &&
                                            homeworksData
                                                .filter(
                                                    homework =>
                                                        homework.course ===
                                                            course &&
                                                        homework.serialNumber ===
                                                            number
                                                )
                                                .map(homework => (
                                                    <TableRow
                                                        key={homework.name}
                                                    >
                                                        <TableCell>
                                                            {homework.title}
                                                        </TableCell>
                                                        <TableCell
                                                            style={{
                                                                width: 160,
                                                            }}
                                                        >
                                                            {getDate(homework)}
                                                        </TableCell>
                                                        <TableCell
                                                            style={{
                                                                width: 160,
                                                            }}
                                                        >
                                                            <Box
                                                                sx={{
                                                                    display:
                                                                        'flex',

                                                                    alignItems:
                                                                        'center',
                                                                    color:
                                                                        `${
                                                                            homework.completed.find(
                                                                                el =>
                                                                                    el.user ===
                                                                                    user.email
                                                                            )
                                                                                .status
                                                                        }` ===
                                                                        'Completed'
                                                                            ? theme
                                                                                  .palette
                                                                                  .success
                                                                                  .main
                                                                            : homework.completed.find(
                                                                                  el =>
                                                                                      el.user ===
                                                                                      user.email
                                                                              )
                                                                                  .status ===
                                                                              'Is checking'
                                                                            ? theme
                                                                                  .palette
                                                                                  .primary
                                                                                  .main
                                                                            : theme
                                                                                  .palette
                                                                                  .error
                                                                                  .main,
                                                                }}
                                                            >
                                                                {
                                                                    homework.completed.find(
                                                                        el =>
                                                                            el.user ===
                                                                            user.email
                                                                    ).status
                                                                }
                                                            </Box>
                                                        </TableCell>
                                                        <TableCell
                                                            style={{
                                                                width: 160,
                                                            }}
                                                        >
                                                            <NavLink
                                                                style={{
                                                                    display:
                                                                        'inline-block',
                                                                    alignSelf:
                                                                        'center',
                                                                }}
                                                                to={`/${course}/homeworks/${number}`}
                                                            >
                                                                <Button variant="contained">
                                                                    TO WORK
                                                                    <ArrowForwardIcon />
                                                                </Button>
                                                            </NavLink>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Box>
                )}
            </Box>
        </Box>
    );
};
