import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {useRouter} from "next/router";
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import style from "./Navbar.module.css";
import { LeftIcon } from './LeftIcon/LeftIcon';
import MusicNoteIcon from "@mui/icons-material/MusicNote";

const drawerWidth = 240;

interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window?: () => Window;
}
const menuItem = [
    {text: 'Head Page', href: '/'},
    {text: 'List track', href: '/tracks'},
    {text: 'List album', href: '/albums'},
];
export default function NewNavbar(props: Props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const router = useRouter();

    const paint = (numbers: number) => {
        switch (numbers.toString()){
            case '0':
                return <HomeIcon className={style.icon}/>
            case '1':
                return <SearchIcon className={style.icon}/>
            case '2':
                return <PlaylistPlayIcon className={style.icon}/>
        }
    }

    const drawer = (
        <div className={style.leftBar}>

            {/*временнно <Toolbar />*/}
            <Toolbar />
            <List >
                {menuItem.map(({text, href}, index) => (
                    <ListItem key={href} disablePadding onClick={() => router.push(href)}>
                        <ListItemButton>
                            <ListItemIcon>
                                {paint(index)}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            {/*<Divider />*/}
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }} >
            {/*<CssBaseline />*/}
            <AppBar
                className={style.appBar}
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar >
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                    >
                        <MusicNoteIcon/>
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Music Platform
                    </Typography>
                    <Box sx={{ flexGrow: 1 }}>
                        <LeftIcon />
                    </Box>

                </Toolbar>

            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >

                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    className={style.appBar}
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, borderRight: 1 },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 5, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
            </Box>

        </Box>
    );
}