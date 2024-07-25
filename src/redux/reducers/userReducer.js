import { createReducer } from '@reduxjs/toolkit';

// const initialState = {
//   loading: false,
//   isAuthenticated: false,
//   user: null,
//   error: null,
//   message: null,
// };

export const userReducer = createReducer({}, (builder) => {
  builder
    .addCase('loginRequest', (state) => {
      state.loading = true;
    })
    .addCase('loginSuccess', (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.message = action.payload.message;
    })
    .addCase('loginFail', (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    })

    .addCase('registerRequest', (state) => {
      state.loading = true;
    })
    .addCase('registerSuccess', (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.message = action.payload.message;
    })
    .addCase('registerFail', (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    })

    .addCase('logoutRequest', (state) => {
      state.loading = true;
    })
    .addCase('logoutSuccess', (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.message = action.payload;
    })
    .addCase('logoutFail', (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.error = action.payload;
    })

    .addCase('loadUserRequest', (state) => {
      state.loading = true;
    })
    .addCase('loadUserSuccess', (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    })
    .addCase('loadUserFail', (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    })

    .addCase('clearError', (state) => {
      state.error = null;
    })
    .addCase('clearMessage', (state) => {
      state.message = null;
    });
});


export const profileReducer = createReducer({}, (builder) => {
  builder
    .addCase('updateProfileRequest', (state) => {
      state.loading = true;
    })
    .addCase('updateProfileSuccess', (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase('updateProfileFail', (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase('changePasswordRequest', (state) => {
      state.loading = true;
    })
    .addCase('changePasswordSuccess', (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase('changePasswordFail', (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase('forgetPasswordRequest', (state) => {
      state.loading = true;
    })
    .addCase('forgetPasswordSuccess', (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase('forgetPasswordFail', (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase('resetPasswordRequest', (state) => {
      state.loading = true;
    })
    .addCase('resetPasswordSuccess', (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase('resetPasswordFail', (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase('updateProfilePictureRequest', (state) => {
      state.loading = true;
    })
    .addCase('updateProfilePictureSuccess', (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase('updateProfilePictureFail', (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase('updateProfilePictureReset', (state) => {
      state.message = false;
    })
    .addCase('removeFormPlaylistRequest', (state) => {
      state.loading = true;
    })
    .addCase('removeFormPlaylistSuccess', (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase('removeFormPlaylistFail', (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase('clearError', (state) => {
      state.error = null;
    })
    .addCase('clearMessage', (state) => {
      state.message = null;
    });
});


