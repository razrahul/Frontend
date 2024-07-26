import axios from "axios";
import { server } from "../store";

export const buySubscription = (id) => async (dispatch) => {
    try {
        dispatch({ type: "buySubscriptionRequest" });

        const { data } = await axios.post(
            `${server}/subscription`,
            { id },
            {
              headers: { 'Content-Type': 'application/json' },
              withCredentials: true,
            }
          );
      

        dispatch({ type: "buySubscriptionSuccess", payload: data.subscriptionId });
    } catch (error) {
        dispatch({
            type: "buySubscriptionFail",
            payload: error.response.data.message,
        });
    }
};
export const cancelSubscription = (id) => async (dispatch) => {
    try {
        dispatch({ type: "cancelSubscriptionRequest" });

        const { data } = await axios.delete(
            `${server}/subscription/cancel?id=${id}`,
           
            {
              headers: { 'Content-Type': 'application/json' },
              withCredentials: true,
            }
          );
      

        dispatch({ type: "cancelSubscriptionSuccess", payload: data.message });
    } catch (error) {
        dispatch({
            type: "cancelSubscriptionFail",
            payload: error.response.data.message,
        });
    }
};