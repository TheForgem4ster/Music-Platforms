import { Container } from "@mui/system";
import Navbar from "components/Navbar/Navbar";
import Player from "components/Player";
import Head from "next/head";
import React from "react";
import NewNavbar from "../components/Navbar/NewNavbar";


interface MainLayoutProps {
    children?: React.ReactNode
    title?: string;
    description?: string;
    keywords?: string;
}
const MainLayouts : React.FC<MainLayoutProps> = ({children, title, description,  keywords}) => (
    <div>
        <Head>
            <title>{title || "Music platform"}</title>
            <meta name="description" content={"music platform for all. Now all maybe track and become famous" + description}/>
            <meta name="robots" content="index, follow"/>
            <meta name="keywords" content={keywords || "Музыка, треки, артисты"}/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
        </Head>
        <NewNavbar />
        <Container  style={{margin: '90px 0',minWidth: "100%", }}>
            {children}
        </Container>
        <Player/>
    </div>
)

export default MainLayouts;