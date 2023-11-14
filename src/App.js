import "./App.css";
import { Route, Routes } from "react-router-dom"

import Error from "./pages/Error"

import { Home } from "./pages/Home"
import About from "./pages/About";
import Contact from "./pages/Contact";

import OpenRoute from "./components/core/Auth/OpenRoute"
import Signup from "./pages/AuthFiles/Signup";
import Login from "./pages/AuthFiles/Login";
import Navbar from "./components/common/Navbar";
import ResetPassword from "./pages/AuthFiles/ForgotPassword-EmailSent";
import UpdatePassword from "./pages/AuthFiles/UpdatePassword";
import VerifyEmail from "./pages/AuthFiles/VerifyEmail";

import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import MyProfile from "./components/core/Dashboard/MyProfile"
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import PurchaseHistory from "./components/core/Dashboard/PurchaseHistory";
import Settings from "./components/core/Dashboard/Settings/index";
import Cart from "./components/core/Dashboard/Cart/index"

import MyCourse from "./components/core/Dashboard/Instructor/MyCourse";
import AddCourse from "./components/core/Dashboard/Instructor/AddCourse";
import EditCourse from "./components/core/Dashboard/Instructor/Course.js/EditCourse";
import Instructor from "./components/core/Dashboard/Instructor/InstructorDashboard";

import { ACCOUNT_TYPE } from "./utilis/constants";
import { useSelector } from "react-redux";
import Catalouge from "./pages/Catalouge";
import CoursePage from "./pages/CoursePage";



import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./components/core/Video/VideoDetails";






function App() {
  const { user } = useSelector((state) => state.profile)
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col  font-inter">

      <Navbar></Navbar>

      <Routes>
        {/* home route */}
        <Route path="/" element={<Home />} />

        {/* catalouge */}
        <Route path="/catalogue/:catalogueName" element={<Catalouge />} />

        <Route path="/courses/:courseId" element={<CoursePage />}></Route>

        {/* About route */}
        <Route path="/about" element={<About />}></Route>

        {/* Contact route */}
        <Route path="/contact" element={<Contact />}></Route>

        {/* Auth routes */}
        <Route path="/signup" element={
          <OpenRoute>
            <Signup />
          </OpenRoute>
        } />

        <Route path="/login" element={
          < OpenRoute>
            <Login />
          </OpenRoute>
        } />

        <Route path="/forgot-password" element={
          <OpenRoute>
            <ResetPassword />
          </OpenRoute>
        } />

        <Route path="/update-password/:id" element={
          <OpenRoute>
            <UpdatePassword />
          </OpenRoute>
        } />

        <Route path="/verify-email" element={
          <OpenRoute>
            < VerifyEmail />
          </OpenRoute>
        } />

        {/* Dashboard Routes */}

        <Route element={
        
            <Dashboard></Dashboard>
        


        } >

          <Route path="/dashboard/my-profile" element={<MyProfile />}></Route>



          <Route path="/dashboard/purchase-history" element={<PurchaseHistory />}></Route>

          <Route path="/dashboard/settings" element={<Settings />}></Route>



          {/* routes only for student */}
          {
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses />}></Route>

                <Route path="/dashboard/cart" element={<Cart />}></Route>

               



              </>
            )

          }

          {/* routes only for instructor */}
          {
            <>
              <Route path="/dashboard/my-courses" element={<MyCourse />}></Route>
              <Route path="/dashboard/add-course" element={<AddCourse />}></Route>
              <Route path="/dashboard/edit-course/:courseId" element={<EditCourse />}></Route>
              <Route path="/dashboard/instructor" element={<Instructor/>}></Route>
           

            </>
          }

        </Route>


        {/* view course routes */}
        
        <Route
        element={
          <PrivateRoute>
            <ViewCourse/>
          </PrivateRoute>
        }>
          {
            user?.accountType ===ACCOUNT_TYPE.STUDENT &&(
              <>
               
              <Route path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId" element={<VideoDetails/>}/>
              </>
            )
          }

        </Route>

        {/* error */}
        <Route path="*" element={<Error />} ></Route>

      </Routes>





    </div>
  );
}

export default App;


