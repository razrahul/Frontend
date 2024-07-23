import axios from "axios";
import { server } from '../store'


export const contact = (name, email, message) => async (dispatch) => {
    try {
        dispatch({ type: "ContactRequest" });

        const { data } = await axios.post(
            `${server}/contact`,
            { name, email, message },
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            }
        );

        dispatch({ type: "ContactSuccess", payload: data.message });
        
    } catch (error) {
        dispatch({ type: "ContactFail", payload: error.response.data.message });
    }
};


export const courseRequest = (name, email, course) => async (dispatch) => {
    try {
        dispatch({ type: "courseRequestRequest" });

        const { data } = await axios.post(
            `${server}/requestcourse`,
            { name, email, course },
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            }
        );

        dispatch({ type: "courseRequestSuccess", payload: data.message });
        
    } catch (error) {
        dispatch({ type: "courseRequestFail", payload: error.response.data.message });
    }
};