import * as React from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import FileUpload from "../ListTrack/DownloadTrack/FileUpload";
import {useState} from "react";
import axios from 'axios';
import { useRouter } from 'next/router';

const Widget = styled('div')(({theme}) => ({
    margin: 15,
    padding: 16,
    borderRadius: 16,
    width: 200,
    maxWidth: '100%',
    position: 'relative',
    zIndex: 1,
    backgroundColor:
        theme.palette.mode === 'dark' ? 'rgb(18, 18, 26)' : 'rgba(10, 1, 23,0.4)',
    backdropFilter: 'blur(40px)',
    transition: 'background-color 0.3s ease',
    '&:hover': {
        backgroundColor:
            theme.palette.mode === 'dark' ? 'rgb(40, 40, 48)' : 'rgba(20, 11, 33, 0.6)',
        cursor: 'pointer',
    },
}));

const CoverImage = styled('div')({
    width: 170,
    height: 200,
    objectFit: 'cover',
    overflow: 'hidden',
    margin: "0 auto",
    flexShrink: 0,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: 'rgba(0,0,0,0.08)',
    '& > img': {
        width: '100%',
        height: '100%',
    },
});


const AddAlbum = () => {
    const [open, setOpen] = React.useState(false);
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [picture, setPicture] = useState(null);
    const router = useRouter()

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };


    const handleFileUpload = (file) => {
        setPicture(file);
    };

    const handleButtonClick = () => {
        const formData = new FormData()
        formData.append('name', title)
        formData.append('genres', description)
        formData.append('picture', picture)
        axios.post('http://localhost:5000/album', formData)
            .then(resp => router.push('/album'))
            .catch(e => console.log(e))
        alert(`The functionality is being improved. Sorry for the inconvenience.${title}`);
    };

    return (
        <Box sx={{overflow: 'hidden', display: 'flex'}}>
            <Widget onClick={handleOpen}>
                <Box>
                    <CoverImage style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                       <AddCircleIcon style={{ width: 100, height: 100}}/>
                    </CoverImage>
                    <Box sx={{
                        ml: 1.5,
                        minWidth: 0,
                        marginLeft: "auto",
                        alignItems: "center",
                        justifyContent: "space-between"
                    }}>
                    </Box>
                </Box>
            </Widget>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Box
                    sx={{
                        width: 700,
                        height: 400,
                        p: 4,
                        backgroundColor: '#3C3E42',
                        borderRadius: 8,
                        outline: 'none',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2, marginTop: -2 }}>
                        <Typography variant="h6" id="modal-title" >
                            Add Album
                        </Typography>
                        <IconButton onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
                        <TextField
                            label="Name album"
                            value={title}
                            onChange={handleTitleChange}
                            fullWidth
                            margin="normal"
                            size="small"
                        />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
                        <TextField
                            label="Genres"
                            value={description}
                            onChange={handleDescriptionChange}
                            fullWidth
                            margin="normal"
                            size="small"
                        />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
                        <FileUpload setFile={handleFileUpload} accept="image/*">
                            <Button>Upload an image</Button>
                        </FileUpload>
                        <Box sx={{ ml: 1.5, minWidth: 0, marginLeft: 'auto', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Typography variant="body2" style={{ textAlign: 'center' }}>
                                {picture ? 'File uploaded: ' + picture.name : 'File missing'}
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 2 }}>
                        <Button variant="contained" onClick={handleButtonClick}>
                            Click me!
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
}

export default AddAlbum;

