import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useGetLessonsQuery } from '../store/lmsBackApi/lmsBack';
import { getDate } from '../utils/getDate';
import { Button, TableHead } from '@mui/material';
import Loader from './Loader';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { NavLink } from 'react-router-dom';
import { TablePaginationActions } from './TablePaginationActions';

export default function LessonsTable({ course }) {
    const theme = useTheme();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(3);

    const { data, isLoading } = useGetLessonsQuery();

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return isLoading ? (
        <Loader />
    ) : (
        data && (
            <TableContainer component={Paper}>
                <Table aria-label="custom pagination table">
                    <TableHead
                        sx={{
                            backgroundColor: theme.palette.primary.dark,
                            color: '#fff',
                        }}
                    >
                        <TableRow>
                            <TableCell sx={{ color: 'inherit' }}>
                                Number
                            </TableCell>
                            <TableCell sx={{ color: 'inherit' }}>
                                Title
                            </TableCell>
                            <TableCell sx={{ color: 'inherit' }}>
                                Date
                            </TableCell>
                            <TableCell sx={{ color: 'inherit' }}>
                                Complexity
                            </TableCell>
                            <TableCell sx={{ color: 'inherit' }}> </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? data
                                  .filter(lesson => lesson.course === course)
                                  .slice(
                                      page * rowsPerPage,
                                      page * rowsPerPage + rowsPerPage
                                  )
                            : data.filter(lesson => lesson.course === course)
                        ).map(lesson => (
                            <TableRow key={lesson.serialNumber}>
                                <TableCell style={{ width: 40 }}>
                                    {lesson.serialNumber}
                                </TableCell>
                                <TableCell>{lesson.title}</TableCell>
                                <TableCell style={{ width: 160 }}>
                                    {getDate(lesson)}
                                </TableCell>
                                <TableCell style={{ width: 160 }}>
                                    {lesson.complexity && 'Not defined'}
                                </TableCell>
                                <TableCell style={{ width: 160 }}>
                                    <NavLink
                                        style={{
                                            display: 'inline-block',
                                            alignSelf: 'center',
                                        }}
                                        to={`/${course}/lessons/${lesson.serialNumber}`}
                                    >
                                        <Button variant="contained">
                                            TO LESSON <ArrowForwardIcon />
                                        </Button>
                                    </NavLink>
                                </TableCell>
                            </TableRow>
                        ))}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[
                                    3,
                                    6,
                                    9,
                                    { label: 'All', value: -1 },
                                ]}
                                colSpan={3}
                                count={
                                    data.filter(
                                        lesson => lesson.course === course
                                    ).length
                                }
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: {
                                        'aria-label': 'rows per page',
                                    },
                                    native: true,
                                }}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        )
    );
}

LessonsTable.propTypes = {
    course: PropTypes.string.isRequired,
};
