import * as React from 'react';
import {styled, useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, {AppBarProps as MuiAppBarProps} from '@mui/material/AppBar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {useRouter} from 'next/router';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import style from "./Navbar.module.css";
import Header from 'components/Header/Header';

const drawerWidth = 240;
const playerHeight = 60;

const menuItem = [
    {text: 'Music', href: ''},
    {text: 'Head Page', href: '/'},
    {text: 'List track', href: '/tracks'},
    {text: 'List album', href: '/albums'},
];

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({theme, open}) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    justifyContent: 'flex-end',
}));

export default function Navbar() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const router = useRouter();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const paintIcon = (numbers: number) => {
        switch (numbers.toString()) {
            case '0':
                return <MusicNoteIcon className={style.icon}/>
            case '1':
                return <HomeIcon className={style.icon}/>
            case '2':
                return <SearchIcon className={style.icon}/>
            case '3':
                return <PlaylistPlayIcon className={style.icon}/>
        }
    }

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar position="fixed" open={open}>
                <Header/>
            </AppBar>
            <Drawer

                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        height: `calc(100% - ${playerHeight}px)`,
                        boxSizing: 'border-box',
                    },
                }}
                variant="permanent"
                anchor="left"
                open={open}
            >
                <DrawerHeader/>
                <List>
                    {menuItem.map(({text, href}, index) => (
                        <ListItem key={href} disablePadding onClick={() => router.push(href)}>
                            <ListItemButton>
                                <ListItemIcon>
                                    {paintIcon(index)}
                                </ListItemIcon>
                                <ListItemText primary={text}/>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </Box>
    );
}