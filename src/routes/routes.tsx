import { createBrowserRouter } from "react-router-dom";

// import Login from "../pages/Login";
// import Register from "../pages/Register";
import About from "../pages/About";
import Service from "../pages/Service";

// import AdminLayout from "../components/layout/AdminLayout";
// import { adminPaths } from "./admin.routes";
import Home from "../pages/Home";
import Contact from "../pages/Contact";
import GetStarted from "../pages/GetStarted";
import MainLayout from "../components/layout/MainLayout";
import Rooms from "../pages/Rooms";
import RoomDetails from "../pages/RoomDetails";

const router = createBrowserRouter([
  //     {
  //         path:'/',
  //         element:<App/>,
  //         children:[
  //             {
  //                 path:'about',
  //                 element:<About/>

  //             },
  //             {
  //                 path:'service',
  //                 element:<Service/>

  //             },
  //         ]
  //     },
  //     {
  //     path:'/admin',
  //     element:<AdminLayout/>,
  //     children:adminPaths
  //     },
  //     {
  //         path:'/login',
  //         element:<Login/>
  //     },
  //     {
  //         path:'/register',
  //         element:<Register/>,
  //     },
  // ])

  // export default router;

  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "", element: <Home/> },
      { path: "about", element: <About /> },
      { path: "service", element: <Service /> },
      { path: "contact", element: <Contact /> },
      { path: "rooms", element: <Rooms/> },
      { path: "rooms/:roomId", element: <RoomDetails/> },
    //   { path: "pricing", element: <Pricing /> },
    //   { path: "team", element: <Team /> },
    //   { path: "faq", element: <FAQ /> },
    //   { path: "gallery", element: <Gallery /> },
      { path: "login", element: <GetStarted /> },
    ],
  },
]);

export default router;