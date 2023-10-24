import * as React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet } from 'react-router';
import { toggleFullscreen } from '../../utils/toggleFullscreen';
import { logOut } from '../../redux/auth/authSlice';
import { selectUser } from '../../redux/auth/authSelectors';
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

export function Layout() {
    const theme = useTheme();
    const [openDrawer, setOpenDrawer] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
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
        <Box
            sx={{
                display: 'flex',
            }}
        >
            <AppBar position="fixed" open={openDrawer}>
                <Toolbar
                    sx={{
                        backgroundColor: theme.palette.primary.dark,
                        color: '#fff',
                    }}
                >
                    <IconButton
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(openDrawer && { display: 'none' }),
                        }}
                    >
                        <MenuIcon
                            sx={{ fill: theme.palette.primary.contrastText }}
                        />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" flex={10}>
                        {user.name}
                    </Typography>
                    <IconButton
                        style={{ color: theme.palette.primary.contrastText }}
                        onClick={() =>
                            toggleFullscreen(isFullscreen, setIsFullscreen)
                        }
                    >
                        <MdOutlineFullscreen />
                    </IconButton>
                    <IconButton
                        style={{ color: theme.palette.primary.contrastText }}
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
                sx={{
                    flexGrow: 1,
                    backgroundColor: theme.palette.grey[50],
                    maxWidth: '1800px',
                    marginTop: '60px',
                }}
            >
                <Outlet />
            </Box>
        </Box>
    );
}
