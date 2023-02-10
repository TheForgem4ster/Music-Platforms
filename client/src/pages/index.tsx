import MainLayouts from "layouts/MainLayouts";
import React from "react";


const Index = () => {
    return (
        <div className="main">
            <MainLayouts>
                <div className="center">
                    <h1>Welcome to us</h1>
                    <h3>Now best track!</h3>
                </div>
            </MainLayouts>

            <style jsx>
                {`
                  .center {
                    margin-top: 150px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    color: wheat;
                  }
                  .main {
                      margin: 0 0;
                      background: #101012;
                      
                    }
                `}
            </style>
        </div>
    )
}

export default Index;