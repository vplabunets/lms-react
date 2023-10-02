import * as React from 'react'
import {useState} from 'react'
import {useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {MdOutlineExitToApp, MdOutlineFullscreen} from "react-icons/md";
import {AppBar, Drawer, DrawerHeader} from "./DrawerEl.styled";
import {AsideList} from "../AsideList";
import PropTypes from 'prop-types';
import {toggleFullscreen} from "../../utils/toggleFullscreen";
import {useDispatch} from "react-redux";
import authOperations from "../../redux/auth/authOperations";
import {Dashboard} from "../Dashboard";

export function DrawerEl({user}) {
    const theme = useTheme();
    const [openDrawer, setOpenDrawer] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const dispatch = useDispatch();

    console.log(user)
    const handleDrawerOpen = () => {
        setOpenDrawer(true);
    };

    const handleDrawerClose = () => {
        setOpenDrawer(false);
    };


    const handleLogout = () => {
        dispatch(
            authOperations.logOut()
        );
    };
    console.log(user.name)
    return (
        <Box sx={{display: 'flex'}}>
            {/*<CssBaseline/>*/}
            <AppBar position="fixed" open={openDrawer}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(openDrawer && {display: 'none'}),
                        }}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" style={{flex: 10}}>
                        {user.name}
                    </Typography>
                    <IconButton style={{color: "white"}}
                                onClick={() => toggleFullscreen(isFullscreen, setIsFullscreen)}>
                        <MdOutlineFullscreen/>
                    </IconButton>
                    <IconButton style={{color: "white"}} onClick={handleLogout}>
                        <MdOutlineExitToApp/>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={openDrawer}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                    </IconButton>
                </DrawerHeader>
                <Divider/>
                <AsideList user={user}/>
            </Drawer>
            <Box component="main" sx={{flexGrow: 1, p: 1, bgcolor: 'text.disabled'}}>
                <DrawerHeader/>
                <Dashboard/>
                {/*<Box sx={{m: 2, bgcolor: '#fff'}}> <Dashboard/></Box>*/}

                {/*<Box sx={{m: 2, bgcolor: '#fff'}}> <Charts/></Box>*/}
            </Box>
        </Box>
    );
}

DrawerEl.propTypes = {
    user: PropTypes.shape({
        name: PropTypes.string.isRequired,
    }).isRequired,
};
