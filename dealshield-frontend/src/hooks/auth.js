import { useEffect, useState } from "react";

//Custom hook that will return isLoggedIn everytime token is removed from the browser.
export const useAuth = () => {
  const token = localStorage.getItem("auth-token");
  const [isLoggedIn, setIsLoggedIn] = useState(token ? true : false);
  useEffect(() => {
    const handleStorage = () => {
      const isLoggedIn = localStorage.getItem("auth-token");
      if (!isLoggedIn) {
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
      }
    };

    //Listens to the storage event that gets raised.
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);
  return isLoggedIn;
};
