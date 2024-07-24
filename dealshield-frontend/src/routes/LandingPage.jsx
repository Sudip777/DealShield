import { useEffect } from "react";
import CardContainer from "../components/CardContainer";
import MainPageContainer from "../components/MainPageContainer";
import { useAuth } from "../hooks/auth";
import { useNavigate } from "react-router-dom";
import { getUserType } from "../api/consumer";

function LandingPage() {
  const isLoggedIn = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn) {
      console.log(getUserType());
      getUserType() == "consumer"
        ? navigate("/Consumer")
        : getUserType() == "provider"
        ? navigate("/Provider")
        : navigate("/admin");
    }
  }, [isLoggedIn, navigate]);
  return (
    <>
      <MainPageContainer />
      <CardContainer />
    </>
  );
}

export default LandingPage;
