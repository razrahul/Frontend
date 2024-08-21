import axios from "axios";
import { server } from "../store";

export const buySubscription = (courseId, amount, currency = "INR") => async (dispatch) => {
    try {
        dispatch({ type: "buySubscriptionRequest" });

        const { data } = await axios.post(
            `${server}/subscription`, 
            { id: courseId, amount, currency }, 
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true, 
            }
        );

        dispatch({ type: "buySubscriptionSuccess", payload: data.orderId });
    } catch (error) {
        dispatch({
            type: "buySubscriptionFail",
            payload: error.response?.data?.message || error.message,
        });
    }
};

export const cancelSubscription = (id, amount , currency="INR") => async (dispatch) => {
    try {
        dispatch({ type: "cancelSubscriptionRequest" });

        const { data } = await axios.post(
            `${server}/subscription/cancel?id=${id}`,
            { amount, currency },
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            }
        );

        dispatch({ type: "cancelSubscriptionSuccess", payload: data.message });
    } catch (error) {
        dispatch({
            type: "cancelSubscriptionFail",
            payload: error.response?.data?.message || error.message,
        });
    }
};
