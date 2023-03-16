import { Container } from "@mui/system";
import Navbar from "components/Navbar/Navbar";
import Player from "components/Footer/Player";
import Head from "next/head";
import React from "react";
import style from "../styles/MainLayouts.module.css";
import {createTheme, ThemeProvider } from "@mui/material";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#1976d2',
        },
        background: {
            paper: '#080a10',
            default: '#0a0d11'
        },
        text: {
            primary: '#fff',
            secondary: '#fff'
        }
    },
});

interface MainLayoutProps {
    children?: React.ReactNode
    title?: string;
    description?: string;
    keywords?: string;
}

const MainLayouts : React.FC<MainLayoutProps> = ({children, title, description,  keywords}) => (
    <div className={style.pageContainer}>
        <ThemeProvider theme={darkTheme}>
        <Head>
            <title>{title || "Music platform"}</title>
            <meta name="description" content={"music platform for all. Now all maybe track and become famous" + description}/>
            <meta name="robots" content="index, follow"/>
            <meta name="keywords" content={keywords || "Музыка, треки, артисты"}/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
        </Head>
        <Navbar/>
        <Container className={style.main}>
            {children}
        </Container>
        
        <Player/>
        </ThemeProvider>
    </div>
)

export default MainLayouts;