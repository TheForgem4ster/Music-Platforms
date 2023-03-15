import React from "react";
import Typography from '@mui/material/Typography';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import AuthForm from "@/pages/auth-page/auth-form";


const AuthPage : React.FC = () => {

    return(
        <div>
            <AuthForm/>
        </div>
    )
}

export default AuthPage;