import PopularAlbum from "components/Main/HeaderPage/PopularAlbum";
import MainLayouts from "layouts/MainLayouts";
import React from "react";
import Track from "@/pages/tracks";


const Index = () => {

    return (
        <div className="main">
            <MainLayouts>
                <h1>Popular albums</h1>
                <div className="center">
                    <PopularAlbum/>
                </div>
            </MainLayouts>
        </div>
    )
}

export default Index;