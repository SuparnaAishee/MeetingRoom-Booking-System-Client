import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <>
     <h1>This is Admin Layout</h1>
     <Outlet/>
    </>
  );
}

export default AdminLayout;
