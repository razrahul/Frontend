import React, { useEffect, } from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import {
  Loader,
  Users,
  AdminCourses,
  CreateCourse,
  Dashboard,
  UpdateProfile,
  ChangePassword,
  Profile,
  CoursePage,
  NotFound,
  PaymentSuccess,
  PaymentFail,
  Subscribe,
  About,
  Request,
  Contact,
  Courses,
  Footer,
  ForgetPassword,
  Header,
  Home,
  Login,
  Register,
  ResetPassword,
} from "./components/index";
import viteLogo from "/vite.svg";
import { useSelector, useDispatch } from "react-redux";
// import './App.css'
// import toast, { Toaster} from 'react-hot-toast'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loadUser } from "./redux/actions/user";
import { ProtectedRoute } from "protected-route-react";

function App() {
  // window.addEventListener('contextmenu', (e) => {
  //   e.preventDefault()
  // })

  const dispatch = useDispatch();

  const { isAuthenticated, user, message, error, loading } = useSelector(
    (state) => state.user
  );
  // console.log(error,message)
  if (error) {
    toast.error(error);
    dispatch({
      type: "clearError",
    });
  } else if (message) {
    toast.success(message);
    dispatch({
      type: "clearMessage",
    });
  }

  // console.log(user, message, error);

  // useEffect(() => {
  //   // toast.error("wow Error")
  //   if (error) {
  //     toast.error(error);
  //     dispatch({
  //       type: "clearError",
  //     });
  //   }
  //   if (message) {
  //     toast.success(message);
  //     dispatch({
  //       type: "clearMessage",
  //     });
  //   }
  // }, []);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Router>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header isAuthenticated={isAuthenticated} user={user} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="courses" element={<Courses />} />
            <Route path="course/:id" element={<CoursePage />} />
            <Route path="contact" element={<Contact />} />
            <Route path="request" element={<Request />} />
            <Route path="about" element={<About />} />
            <Route
              path="subscribe"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Subscribe />
                </ProtectedRoute>
              }
            />
            <Route path="paymentsuccess" element={<PaymentSuccess />} />
            <Route path="paymentfail" element={<PaymentFail />} />
            <Route
              path="profile"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Profile user={user} />
                </ProtectedRoute>
              }
            />
            <Route
              path="changepassword"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <ChangePassword />
                </ProtectedRoute>
              }
            />
            <Route
              path="updateprofile"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <UpdateProfile user={user} />
                </ProtectedRoute>
              }
            />
            <Route
              path="login"
              element={
                <ProtectedRoute
                  isAuthenticated={!isAuthenticated}
                  redirect="/profile"
                >
                  <Login />
                </ProtectedRoute>
              }
            />
            <Route
              path="register"
              element={
                <ProtectedRoute
                  isAuthenticated={!isAuthenticated}
                  redirect="/profile"
                >
                  <Register />
                </ProtectedRoute>
              }
            />
            <Route
              path="forgetpassword"
              element={
                <ProtectedRoute
                  isAuthenticated={!isAuthenticated}
                  redirect="/profile"
                >
                  <ForgetPassword />
                </ProtectedRoute>
              }
            />
            <Route
              path="resetpassword/:token"
              element={
                <ProtectedRoute
                  isAuthenticated={!isAuthenticated}
                  redirect="/profile"
                >
                  <ResetPassword />
                </ProtectedRoute>
              }
            />
            {/* //Admin Routes */}
            <Route
              path="admin/dashboard"
              element={
                <ProtectedRoute
                  isAuthenticated={isAuthenticated}
                  adminRoute={true}
                  isAdmin={user && user.role === "admin"}
                >
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="admin/createcourse"
              element={
                <ProtectedRoute
                  isAuthenticated={isAuthenticated}
                  adminRoute={true}
                  isAdmin={user && user.role === "admin"}
                >
                  <CreateCourse />
                </ProtectedRoute>
              }
            />
            <Route
              path="admin/courses"
              element={
                <ProtectedRoute
                  isAuthenticated={isAuthenticated}
                  adminRoute={true}
                  isAdmin={user && user.role === "admin"}
                >
                  <AdminCourses />
                </ProtectedRoute>
              }
            />
            <Route
              path="admin/users"
              element={
                <ProtectedRoute
                  isAuthenticated={isAuthenticated}
                  adminRoute={true}
                  isAdmin={user && user.role === "admin"}
                >
                  <Users />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} /> //
          </Routes>
          <Footer />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            // transition: Bounce,
          />
        </>
      )}
    </Router>
  );
}

export default App;
