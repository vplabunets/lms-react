import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import { PiStudentLight } from 'react-icons/pi';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { DiJavascript1, DiReact } from 'react-icons/di';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import { TbBook } from 'react-icons/tb';
import { MdOutlineHomeWork } from 'react-icons/md';
import * as React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const courses = {
    js: {
        name: 'JavaScript',
        lessons: 'Lessons',
        homeworks: 'HomeWorks',
    },
    react: {
        name: 'React',
        lessons: 'Lessons',
        homeworks: 'HomeWorks',
    },
};

export const AsideList = ({ user }) => {
    const [openJS, setOpenJS] = React.useState(true);
    const [openReact, setOpenReact] = React.useState(false);
    const handleClick = () => {
        setOpenJS(!openJS);
        setOpenReact(!openReact);
    };

    return (
        <>
            <List
                sx={{
                    width: '100%',
                    maxWidth: 360,
                    bgcolor: 'background.paper',
                }}
                component="nav"
                aria-labelledby="nested-list-subheader"
            >
                <NavLink
                    to="dashboard"
                    style={{
                        display: 'flex',
                        justifyContent: 'start',
                        textDecoration: 'none',
                        color: 'inherit',
                    }}
                >
                    <ListItemButton>
                        <ListItemIcon>
                            <PiStudentLight />
                        </ListItemIcon>
                        <List>
                            <ListItemText primary={user.name} />
                            <ListItemText secondary={user.userType} />
                        </List>
                    </ListItemButton>
                </NavLink>
                <Divider />
                <ListItemButton onClick={handleClick}>
                    <ListItemIcon>
                        <DiJavascript1 />
                    </ListItemIcon>
                    <ListItemText primary={courses.js.name} />
                    {openJS ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openJS} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <NavLink
                            to="js/lessons"
                            state={{ course: 'js' }}
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <TbBook />
                                </ListItemIcon>
                                <ListItemText primary={courses.js.lessons} />
                            </ListItemButton>
                        </NavLink>
                        <NavLink
                            to="js/homeworks"
                            state={{ course: 'js' }}
                            style={{
                                textDecoration: 'none',
                                color: 'inherit',
                            }}
                        >
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <MdOutlineHomeWork />
                                </ListItemIcon>
                                <ListItemText primary={courses.js.homeworks} />
                            </ListItemButton>{' '}
                        </NavLink>
                    </List>
                </Collapse>
            </List>
            <Divider />
            <List
                sx={{
                    maxWidth: 360,
                }}
                component="nav"
                aria-labelledby="nested-list-subheader"
            >
                <ListItemButton onClick={handleClick}>
                    <ListItemIcon>
                        <DiReact />
                    </ListItemIcon>
                    <ListItemText primary={courses.react.name} />
                    {openReact ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openReact} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <NavLink
                            to="react/lessons"
                            state={{ course: 'react' }}
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <TbBook />
                                </ListItemIcon>
                                <ListItemText primary={courses.react.lessons} />
                            </ListItemButton>
                        </NavLink>
                        <NavLink
                            to="react/homeworks"
                            state={{ course: 'react' }}
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <MdOutlineHomeWork />
                                </ListItemIcon>
                                <ListItemText
                                    primary={courses.react.homeworks}
                                />
                            </ListItemButton>
                        </NavLink>
                    </List>
                </Collapse>
                <Divider />
                <NavLink
                    to="technical-articles"
                    style={{
                        display: 'flex',
                        justifyContent: 'start',
                        textDecoration: 'none',
                        color: 'inherit',
                    }}
                >
                    <ListItemButton sx={{ pl: 2 }}>
                        <ListItemIcon>
                            <TbBook />
                        </ListItemIcon>
                        <ListItemText primary="Technical articles" />{' '}
                    </ListItemButton>
                </NavLink>
            </List>
        </>
    );
};

AsideList.propTypes = {
    user: PropTypes.object.isRequired,
};
