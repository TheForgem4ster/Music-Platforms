import MainLayouts from "layouts/MainLayouts";
import React from "react";
import {width} from "@mui/system";

const AlbumId = () => {

    return (
        <MainLayouts title={"list album - music platform"}>
        <div style={{display: "flex"}}>
            <img src={"https://24tv.ua/resources/photos/news/202204/1961563.jpg?v=1661254059000"} style={{marginLeft: "-7%", width:220, height: 170}}/>
            <div style={{ justifyItems: "center", alignItems: "center",flex: 1}} >
                <h1 style={{ textAlign: "center"}}>Text</h1>
            </div>

        </div>

        <div>

        </div>
        </MainLayouts>
    )
}

export default AlbumId;