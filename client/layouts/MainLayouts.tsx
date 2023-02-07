import { Container } from "@mui/system";
import Havbar from "components/Navbar";
import Player from "components/Player";
import React from "react";

type Props = {
    children?: React.ReactNode
};

const MainLayouts : React.FC<Props> = ({children}) => (
    <>
        <Havbar />
        <Container  style={{margin: '90px 0',minWidth: "100%", }}>
            {children}
        </Container>
        <Player/>
    </>
)

export default MainLayouts;