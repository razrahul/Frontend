import { server} from '../store'
import axios from 'axios'


export const updateProfile = (name , email) => async (dispatch) => {
  try {
    dispatch({ type: 'updateProfileRequest' });

    const { data } = await axios.put(
      `${server}/updateprofile`,
     {name, email},
      {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true,
      }
    );

    dispatch({ type: 'updateProfileSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'updateProfileFailure',
      payload: error.response.data.message,
    });
  }
};


export const changePassword = (oldPassword, newPassword) => async (dispatch) => {
  try {
    dispatch({ type: 'changePasswordRequest' });

    const { data } = await axios.put(
      `${server}/changepassword`,
     {oldPassword, newPassword},
      {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true,
      }
    );

    dispatch({ type: 'changePasswordSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'changePasswordFail',
      payload: error.response.data.message,
    });
  }
};

export const updateProfilePicture = (formdata) => async (dispatch) => {
    try {
      dispatch({ type: 'updateProfilePictureRequest' });
  
      const { data } = await axios.put(
        `${server}/updateprofilepicture`,
        formdata,
        {
          headers: {
            "Content-Type": "multipart/from-data"
          },
          withCredentials: true,
        }
      );
  
      dispatch({ type: 'updateProfilePictureSuccess', payload: data.message });
    } catch (error) {
      dispatch({
        type: 'updateProfilePictureFailure',
        payload: error.response.data.message,
      });
    }
  };

  export const forgetPassword = (email) => async (dispatch) => {
    try {
      dispatch({ type: 'forgetPasswordRequest' });
  
      const { data } = await axios.post(
        `${server}/forgetpassword`,
        { email},
        {
          headers: {
            "Content-Type": "application/json"
          },
          withCredentials: true,
        }
      );
  
      dispatch({ type: 'forgetPasswordSuccess', payload: data.message });
    } catch (error) {
      dispatch({
        type: 'forgetPasswordFail',
        payload: error.response.data.message,
      });
    }
  };


  export const resetPassword = (token, password) => async (dispatch) => {
    try {
      dispatch({ type: 'resetPasswordRequest' });

      const config ={
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true,
      }
  
      const { data } = await axios.put(
        `${server}/resetpassword/${token}`,
       { password},
       config
      );
  
      dispatch({ type: 'resetPasswordSuccess', payload: data.message });
    } catch (error) {
      dispatch({
        type: 'resetPasswordFail',
        payload: error.response.data.message,
      });
    }
  };


  export const addToPlaylist = ( id ) => async (dispatch) => {
    try {
      dispatch({ type: 'addToPlaylistRequest' });
  
      const { data } = await axios.post(
         `${server}/addtoplaylist`,
         {id},
         {
          Headers:{
            'Content-Type':'application/json'
           },
           withCredentials:true
         }
        
      );
  
      dispatch({ type: 'addToPlaylistSuccess', payload: data.message });
    } catch (error) {
      dispatch({
        type: 'addToPlaylistFail',
        payload: error.response?.data?.message || 'Something went wrong',
      });
    }
  };

   // is iska reducer profilereducer me h
  export const  removeFormPlaylist = ( id ) => async (dispatch) => {
    try {
      dispatch({ type: 'removeFormPlaylistRequest' });
  
      const { data } = await axios.delete(
         `${server}/removefromplaylist?id=${id}`,
     
         {
          
           withCredentials:true
         }
        
      );
  
      dispatch({ type: 'removeFormPlaylistSuccess', payload: data.message });
    } catch (error) {
      dispatch({
        type: 'removeFormPlaylistFail',
        payload: error.response?.data?.message || 'Something went wrong',
      });
    }
  };
  
  
  