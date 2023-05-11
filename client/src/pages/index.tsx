import PopularTrack from "components/Main/HeaderPage/PopularTrack";
import MainLayouts from "layouts/MainLayouts";
import React from "react";
import Track from "@/pages/tracks";


const Index = () => {

    return (
        <div className="main">
            <MainLayouts>
                <h1>Popular track</h1>
                <div className="center">
                    <PopularTrack/>
                </div>
            </MainLayouts>
        </div>
    )
}

export default Index;