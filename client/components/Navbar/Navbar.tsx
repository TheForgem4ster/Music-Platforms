import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useRouter } from 'next/router';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import HomeIcon from '@mui/icons-material/Home';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAddCircle';
import AlbumIcon from '@mui/icons-material/Album';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import style from "../../styles/Navbar.module.css";
import Header from 'components/Header/Header';
import { DialogActions, Button, Dialog, DialogContent, DialogTitle, Typography, ListItemButton } from '@mui/material';
import Link from 'next/link';

const drawerWidth = 240;
const playerHeight = 60;

const menuItem = [
  { text: 'Music', href: '/' },
  { text: 'Head Page', href: '/' },
  { text: 'My track', href: '/tracks' },
  { text: 'My album', href: '/album' },
];

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
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

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  justifyContent: 'flex-end',
}));

export default function Navbar() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const router = useRouter();

  const [openModal, setOpenModal] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const onAuthor = () => {
    setOpenModal(true);
  };

  const onCloseModal = () => {
    setOpenModal(false);
  };

  const paintIcon = (numbers: number) => {
    switch (numbers.toString()) {
      case '0':
        return <MusicNoteIcon onClick={onAuthor} className={style.icon} />;
      case '1':
        return <HomeIcon className={style.icon} />;
      case '2':
        return <LibraryMusicIcon className={style.icon} />;
      case '3':
        return <AlbumIcon className={style.icon} />;
      case '4':
        return <PlaylistAddIcon className={style.icon} />;
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Header />
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
        <DrawerHeader />
        <List>
          {menuItem.map(({ text, href }, index) => (
            <ListItem key={href} disablePadding >
              <Link href={href} passHref style={{ textDecoration: 'none', color: 'white', width:'100%' }}>
                
              <ListItemButton >
                                <ListItemIcon>
                                    {paintIcon(index)}
                                </ListItemIcon>
                                <ListItemText primary={text}/>
                            </ListItemButton>
               
              </Link>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Dialog open={openModal} onClose={onCloseModal}>
        <DialogTitle style={{ textAlign: 'center' }}>Authors</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Authors of the project: Max Zhuk and Ilya Sergorodtsev</Typography>
        </DialogContent>
        <DialogActions style={{ justifyContent: 'center' }}>
          <Button onClick={onCloseModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}





