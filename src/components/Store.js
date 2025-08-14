import { configureStore } from "@reduxjs/toolkit";
import EventSlice from "./EventSlice";


export default configureStore({
    reducer:{
        Event:EventSlice
    }
})
