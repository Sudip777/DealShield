import { Outlet } from "react-router-dom";
import LandingNavBar from "../components/LandingNavBar";

function Root() {
  return (
    <>
      <LandingNavBar />
      <Outlet />
    </>
  );
}

export default Root;
