import { Container } from "@mui/system";
import Havbar from "components/Navbar";
import React from "react";

type Props = {
    children?: React.ReactNode
};

const MainLayouts : React.FC<Props> = ({children}) => (
    <div>
        <Havbar />
        <Container style={{margin: '90px 0 '}}>
            {children}
        </Container>
        
    </div>
)

export default MainLayouts;