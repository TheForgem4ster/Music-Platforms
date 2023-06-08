import PopularAlbum from "components/Main/HeaderPage/PopularAlbum";
import MainLayouts from "layouts/MainLayouts";
import React from "react";
import Track from "@/pages/tracks";
import { IAlbum } from "types/album";
import { GetServerSideProps } from "next";
import { fetchAlbum } from "store/action-creators/album";
import { NextThunkDispatch, wrapper } from "store";
import AlbumList from "components/Main/Album/AlbumList";


const Index = ({initialAlbum}) => {

    return (
        <div className="main">
            <MainLayouts>
                <h1>Popular albums</h1>
                <div className="center">
                    
                    <PopularAlbum initialAlbum={initialAlbum}/>
                    {/* <AlbumList albums={initialAlbum}/> */}
                </div>
            </MainLayouts>
        </div>
    )
}

export default Index;
export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
    (store) => async ({params}) => {
      const dispatch = store.dispatch as NextThunkDispatch;
      await dispatch(fetchAlbum());
      const { album } = store.getState();
      
      return {
        props: {
          initialAlbum: album.albums, 
          
        },
      };
    }
  );