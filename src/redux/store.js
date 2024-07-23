import { configureStore } from "@reduxjs/toolkit";
import {userReducer, profileReducer} from "./reducers/userReducer";
import { courseReducer } from "./reducers/courseReducer";
import { adminReducer } from "./reducers/adminReducer";
import {otheReducer} from "./reducers/otherReducer"


const store = configureStore({
    reducer: {
        user: userReducer,
        profile:profileReducer,
        course: courseReducer,
        admin: adminReducer,
        other: otheReducer,
    },
});

export default store;

export const server = "http://localhost:8000/api/v1";