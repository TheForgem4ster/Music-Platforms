import { genres } from "assets/constants";
import MainLayouts from "layouts/MainLayouts"
import React from "react"

import AlbumList from "components/Main/Album/AlbumList";
import {useTypedSelector} from "../../../hooks/useTypedSelector";


const AlbumPage : React.FC = () => {
    const {albums, error} = useTypedSelector(state => state.)

    return (
        <MainLayouts>
            <AlbumList />
        </MainLayouts>
    )
}

export default AlbumPage;