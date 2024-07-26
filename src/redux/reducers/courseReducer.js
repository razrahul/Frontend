import { createReducer } from "@reduxjs/toolkit";

export const courseReducer =createReducer({
    courses: [], lectures: [] 
}, (builder) => {
    builder
      .addCase('allCoursesRequest', (state) => {
        state.loading = true;
      })
      .addCase('allCoursesSuccess', (state, action) => {
        state.loading = false;
        state.courses = action.payload;
      })
      .addCase('allCoursesFail', (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase('getCourseByIdRequest', (state) => {
        state.loading = true;
      })
      .addCase('getCourseByIdSuccess', (state, action) => {
        state.loading = false;
        state.courses = action.payload;
      })
      .addCase('getCourseByIdFail', (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase('getCourseLecturesRequest', (state) => {
        state.loading = true;
      })
      .addCase('getCourseLecturesSuccess', (state, action) => {
        state.loading = false;
        state.lectures = action.payload;
      })
      .addCase('getCourseLecturesFail', (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase('addToPlaylistRequest', (state) => {
        state.loading = true;
      })
      .addCase('addToPlaylistSuccess', (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase('addToPlaylistFail', (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase('clearError', (state) => {
        state.error = null;
      })
      .addCase('clearMessage', (state) => {
        state.message = null;
      });
      
})