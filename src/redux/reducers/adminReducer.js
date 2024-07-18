import { createReducer } from "@reduxjs/toolkit";

export const adminReducer = createReducer({}, (builder) => {
    builder
      .addCase('createCourseRequest', (state) => {
        state.loading = true;
      })
      .addCase('createCourseSuccess', (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase('createCourseFail', (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase('deleteCourseRequest', (state) => {
        state.loading = true;
      })
      .addCase('deleteCourseSuccess', (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase('deleteCourseFail', (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase('addLectureRequest', (state) => {
        state.loading = true;
      })
      .addCase('addLectureSuccess', (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase('addLectureFail', (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase('deleteLectureRequest', (state) => {
        state.loading = true;
      })
      .addCase('deleteLectureSuccess', (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase('deleteLectureFail', (state, action) => {
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