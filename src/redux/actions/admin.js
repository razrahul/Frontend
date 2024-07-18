import { server} from '../store'
import axios from 'axios'

// {title, description, category, createdBy }

export const createCourse = (formData) =>  async (dispatch) =>{
    try {
        dispatch({ type: 'createCourseRequest' });
    
        const { data } = await axios.post(
           `${server}/createcourse`,
           formData,
           {
            headers: { 
                'Content-Type': 'multipart/form-data',
             },
            withCredentials: true
           }
          
        );
    
        dispatch({ type: 'createCourseSuccess', payload: data.message });
      } catch (error) {
        dispatch({
          type: 'createCourseFail',
          payload: error.response?.data?.message || 'Something went wrong',
        });
      }

}

export const deleteCourse = (id) =>  async (dispatch) =>{
    try {
        dispatch({ type: 'deleteCourseRequest' });
    
        const { data } = await axios.delete(
           `${server}/course/${id}`,
           {
            withCredentials: true
           }
          
        );
    
        dispatch({ type: 'deleteCourseSuccess', payload: data.message });
      } catch (error) {
        dispatch({
          type: 'deleteCourseFail',
          payload: error.response?.data?.message || 'Something went wrong',
        });
      }

}

export const addLecture = (id, formData) =>  async (dispatch) =>{
    try {
        dispatch({ type: 'addLectureRequest' });
    
        const { data } = await axios.post(
           `${server}/course/${id}`,
           formData,
           {
            headers: { 
                'Content-Type': 'multipart/form-data',
             },
            withCredentials: true
           }
          
        );
    
        dispatch({ type: 'addLectureSuccess', payload: data.message });
      } catch (error) {
        dispatch({
          type: 'addLectureFail',
          payload: error.response?.data?.message || 'Something went wrong',
        });
      }

}


export const deleteLecture = (courseId, lectureId) =>  async (dispatch) =>{
    try {
        dispatch({ type: 'deleteLectureRequest' });
    
        const { data } = await axios.delete(
           `${server}/lecture?courseId=${courseId}&lectureId=${lectureId}`,
           {
            withCredentials: true
           }
          
        );
    
        dispatch({ type: 'deleteLectureSuccess', payload: data.message });
      } catch (error) {
        dispatch({
          type: 'deleteLectureFail',
          payload: error.response?.data?.message || 'Something went wrong',
        });
      }

}