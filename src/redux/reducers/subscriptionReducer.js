import { createReducer } from "@reduxjs/toolkit";

export const subscriptionReducer = createReducer({}, (builder) => {
    builder
      .addCase('buySubscriptionRequest', (state) => {
        state.loading = true;
      })
      .addCase('buySubscriptionSuccess', (state, action) => {
        state.loading = false;
        state.subscriptionId = action.payload;
      })
      .addCase('buySubscriptionFail', (state, action) => {
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