import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import {alpha, styled} from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";

const Search = styled('div')(({ theme , heightBar}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    height: heightBar,
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1.9),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme , spacingNumber}) => ({
    color: 'inherit',

    '& .MuiInputBase-input': {
        padding: theme.spacing(spacingNumber, spacingNumber, spacingNumber, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

const SearchString = ({heightBar,widthBar, spacingNumber, placeholder}) => {

    return (
        <div style={{width:widthBar}}>
            <Search heightBar={heightBar}>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    spacingNumber={spacingNumber}
                    placeholder={placeholder}
                    inputProps={{ 'aria-label': 'search' }}
                />
            </Search>
        </div>
    )
}

export default SearchString;