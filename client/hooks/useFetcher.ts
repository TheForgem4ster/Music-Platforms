import {useDispatch} from "react-redux";
import {useEffect} from "react";

export const useFetcher = (callback) => {
    const dispatch = useDispatch();

    useEffect(() => {
        callback()(dispatch);
    }, []);
};