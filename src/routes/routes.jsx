import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import AllInstructors from "../pages/Instructors/AllInstructors";
import AllClasses from "../pages/Classes/AllClasses";
import NotFound from "../pages/Error/NotFound";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import axios from "axios";
import PrivateRoute from "./PrivateRoute";
import DashBoardHome from "../pages/Dashboard/Home/DashBoardHome";
import MyClasses from "../pages/Dashboard/Instructor/MyClasses";
import AddClass from "../pages/Dashboard/Instructor/AddClass";
import SelectedClasses from "../pages/Dashboard/Student/SelectedClasses";
import EnrolledClasses from "../pages/Dashboard/Student/EnrolledClasses";
import MyPayments from "../pages/Dashboard/Student/MyPayments";
import Payment from "../pages/Dashboard/Student/Payment/Payment";
import AdminRoute from "./AdminRoute";
import InstructorRoute from "./InstructorRoute";
import UpdateClass from "../pages/Dashboard/Instructor/UpdateClass";
import { lazy, Suspense } from "react";
import LoadingScreen from "../components/LoadingScreen";
import ClassDetails from "../pages/Classes/ClassDetails";
import InstructorProfile from "../pages/Instructors/instructorProfile";
import ManageClasses from "../pages/Dashboard/Admin/ManageClasses";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";

// This will lazy load Pages
const Dashoard = lazy(() => import("../pages/Dashboard/Dashoard"));

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/instructors",
        element: <AllInstructors />,
      },
      {
        path: "/classes",
        element: <AllClasses />,
      },
      {
        path: "/class-details/:id",
        element: (
          <PrivateRoute>
            <ClassDetails />
          </PrivateRoute>
        ),
        loader: async ({ params }) =>
          await axios.get(
            `https://unilearners-server.vercel.app/classes/${params?.id}`
          ),
      },
      {
        path: "/instructor-profile/:id",
        element: (
          <PrivateRoute>
            <InstructorProfile />
          </PrivateRoute>
        ),
        loader: async ({ params }) =>
          await axios.get(
            `https://unilearners-server.vercel.app/instructors/${params?.id}`
          ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Suspense fallback={<LoadingScreen />}>
          <Dashoard />
        </Suspense>
      </PrivateRoute>
    ),
    children: [
      { path: "home", element: <DashBoardHome /> },
      {
        path: "manageclasses",
        element: (
          <AdminRoute>
            <ManageClasses />
          </AdminRoute>
        ),
      },
      {
        path: "manageusers",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "myclasses",
        element: (
          <InstructorRoute>
            <MyClasses />
          </InstructorRoute>
        ),
      },
      {
        path: "addclass",
        element: (
          <InstructorRoute>
            <AddClass />
          </InstructorRoute>
        ),
      },
      {
        path: "updateclass/:id",
        element: (
          <InstructorRoute>
            <UpdateClass />
          </InstructorRoute>
        ),
        loader: async ({ params }) =>
          await axios.get(
            `https://unilearners-server.vercel.app/myclasses/${params?.id}`
          ),
      },
      {
        path: "selectedclasses",
        element: <SelectedClasses />,
      },
      {
        path: "enrolledclasses",
        element: <EnrolledClasses />,
      },
      {
        path: "mypayments",
        element: <MyPayments />,
      },
      {
        path: "payment",
        element: <Payment />,
      },
    ],
  },
]);

export default routes;
