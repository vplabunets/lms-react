import * as React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { MdOutlineExitToApp, MdOutlineFullscreen } from 'react-icons/md';
import { AppBar, Drawer, DrawerHeader } from './Layout.styled';
import { AsideList } from './AsideList';
import { toggleFullscreen } from '../../utils/toggleFullscreen';
import { useDispatch } from 'react-redux';
import { logOut } from '../../redux/auth/authSlice';
import { selectUser } from '../../redux/auth/authSelectors';

export function Layout() {
    const theme = useTheme();
    console.log(theme);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    console.log('user in Layout', user);
    const handleDrawerOpen = () => {
        setOpenDrawer(true);
    };

    const handleDrawerClose = () => {
        setOpenDrawer(false);
    };

    const handleLogout = () => {
        dispatch(logOut());
    };
    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="fixed" open={openDrawer}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(openDrawer && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        style={{ flex: 10 }}
                    >
                        {user.name}
                    </Typography>
                    <IconButton
                        style={{ color: 'white' }}
                        onClick={() =>
                            toggleFullscreen(isFullscreen, setIsFullscreen)
                        }
                    >
                        <MdOutlineFullscreen />
                    </IconButton>
                    <IconButton
                        style={{ color: 'white' }}
                        onClick={handleLogout}
                    >
                        <MdOutlineExitToApp />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={openDrawer}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? (
                            <ChevronRightIcon />
                        ) : (
                            <ChevronLeftIcon />
                        )}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <AsideList user={user} />
            </Drawer>
            <Box
                component="main"
                maxWidth={'xl'}
                sx={{
                    flexGrow: 1,
                    bgcolor: 'text.disabled',
                    height: '100%',
                }}
            >
                <DrawerHeader />
                <Outlet />
            </Box>
        </Box>
    );
}

// Layout.propTypes = {
//     user: PropTypes.shape({
//         name: PropTypes.string.isRequired,
//         email: PropTypes.string.isRequired,
//     }).isRequired,
// };
