import { Container } from "@mui/system";
import Navbar from "components/Navbar/Navbar";
import Player from "components/Footer/Player";
import Head from "next/head";
import React from "react";
import Header from "../components/Header/Header";
import style from "./MainLayouts.module.css";

interface MainLayoutProps {
    children?: React.ReactNode
    title?: string;
    description?: string;
    keywords?: string;
}
const MainLayouts : React.FC<MainLayoutProps> = ({children, title, description,  keywords}) => (
    <div className={style.pageContainer}>
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
    </div>
)

export default MainLayouts;