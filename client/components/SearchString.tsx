import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import {alpha, styled} from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    flexGrow: 1,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
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

const StyledInputBase = styled(InputBase)(({ theme, widthCursor }) => ({
    color: 'inherit',

    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('lg')]: {
            width: widthCursor,
        },

    },
}));

const SearchString = ({widthBar, placeholder, widthCursor}) => {

    return (
        <div style={{width:widthBar}}>
            <Search >
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    widthCursor={widthCursor}
                    placeholder={placeholder}
                    inputProps={{ 'aria-label': 'search' }}
                />
            </Search>
        </div>
    )
}

export default SearchString;