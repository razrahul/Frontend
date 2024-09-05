import { configureStore } from "@reduxjs/toolkit";
import {userReducer, profileReducer} from "./reducers/userReducer";
import { courseReducer } from "./reducers/courseReducer";
import { adminReducer } from "./reducers/adminReducer";
import {otheReducer} from "./reducers/otherReducer"
import { subscriptionReducer } from "./reducers/subscriptionReducer";


const store = configureStore({
    reducer: {
        user: userReducer,
        profile:profileReducer,
        course: courseReducer,
        admin: adminReducer,
        other: otheReducer,
        subscription: subscriptionReducer,
    },
});

export default store;

export const server = "/api/v1";

//https://backend-p5pz.onrender.com
//cors error