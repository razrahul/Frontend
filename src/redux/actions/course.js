import { server} from '../store'
import axios from 'axios'


export const getAllCourses = (category="", keyword="") => async (dispatch) => {
    try {
      dispatch({ type: 'allCoursesRequest' });
  
      const { data } = await axios.get(
         `${server}/courses?keyword=${keyword}&category=${category}`
        
      );
  
      dispatch({ type: 'allCoursesSuccess', payload: data.courses });
    } catch (error) {
      dispatch({
        type: 'allCoursesFail',
        payload: error.response?.data?.message || 'Something went wrong',
      });
    }
  };

  

  export const getCourseById = (id) => async (dispatch) => {
    try {
      dispatch({ type: 'getCourseByIdRequest' });
  
      const { data } = await axios.get(`http://localhost:8000/api/v1/mycourses/${id}`, {
        withCredentials: true,
      });
  
      dispatch({ type: 'getCourseByIdSuccess', payload: data.courses });
  
      // Return the full response so it can be used by the calling function
      return data;
    } catch (error) {
      dispatch({
        type: 'getCourseByIdFail',
        payload: error.response?.data?.message || 'Something went wrong',
      });
  
      // Return a rejected promise so the calling function can handle the error
      throw error;
    }
  };
  
  
export const getCourseLectures = (id) => async (dispatch) => {
    try {
      dispatch({ type: 'getCourseLecturesRequest' });
  
      const { data } = await axios.get(
         `${server}/course/${id}`,
         {
             withCredentials: true,
         }
        
      );
  
      dispatch({ type: 'getCourseLecturesSuccess', payload: data.lectures });
    } catch (error) {
      dispatch({
        type: 'getCourseLecturesFail',
        payload: error.response?.data?.message || 'Something went wrong',
      });
    }
  };

  


