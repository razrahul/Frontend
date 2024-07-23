
import { createReducer } from "@reduxjs/toolkit";


export const otheReducer = createReducer({}, (builder) => {
    builder
      .addCase('ContactRequest', (state) => {
        state.loading = true;
      })
      .addCase('ContactSuccess', (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase('ContactFail', (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase('courseRequestRequest', (state) => {
        state.loading = true;
      })
      .addCase('courseRequestSuccess', (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase('courseRequestFail', (state, action) => {
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