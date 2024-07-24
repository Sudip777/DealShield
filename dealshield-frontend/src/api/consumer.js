import axios from "axios";
import { jwtDecode } from "jwt-decode";

//calls the login API endpoint with the email and password.
export async function Login(userType, email, password) {
  console.log(email, password);
  var loginData = { email, password };
  var apiUrl = import.meta.env.VITE_API_URL;
  var res;
  try {
    //Try to login and if successful, set the auth-token in the local storage
    //and raise a storage event for the custom hooks to reposnd to.

    if (userType == "consumer")
      res = await axios.post(`${apiUrl}/Consumer/login`, loginData);
    if (userType == "provider")
      res = await axios.post(`${apiUrl}/Provider/login`, loginData);
    if (userType == "admin")
      res = await axios.post(`${apiUrl}/Admin/login`, loginData);
    localStorage.setItem("auth-token", res.data.token);
    window.dispatchEvent(new Event("storage"));
    //console.log(res);
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      console.log(error.response.data.detail);
      console.log(error.response.status);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
  }
}

export async function SignUp(userType, userDetails) {
  console.log(userDetails);
  var apiUrl = import.meta.env.VITE_API_URL;
  var res;
  try {
    //Try to login and if successful, set the auth-token in the local storage
    //and raise a storage event for the custom hooks to reposnd to.
    if (userType == "consumer")
      res = await axios.post(`${apiUrl}/Consumer/register`, userDetails);
    if (userType == "provider")
      res = await axios.post(`${apiUrl}/Provider/register`, userDetails);

    localStorage.setItem("auth-token", res.data.token);
    window.dispatchEvent(new Event("storage"));
    console.log(res);
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      console.log(error.response.data.detail);
      console.log(error.response.status);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
  }
}

export function getUserId() {
  let token = localStorage.getItem("auth-token");
  let decoded = jwtDecode(token);
  let userId =
    decoded[
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
    ];
  return userId;
}

export function getUserType() {
  let token = localStorage.getItem("auth-token");
  let decoded = jwtDecode(token);
  var userType = decoded["UserType"];
  return userType.toLowerCase();
}

export async function getUserDetails(userType) {
  var apiUrl = import.meta.env.VITE_API_URL;
  var res;

  try {
    const headers = {
      Authorization: `Bearer ${window.localStorage.getItem("auth-token")}`,
    };
    res =
      userType == "consumer"
        ? await axios.get(`${apiUrl}/Consumer/details`, { headers })
        : await axios.get(`${apiUrl}/Provider/details`, { headers });
    return res.data;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      console.log(error.response.data.detail);
      console.log(error.response.status);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
  }
}

export async function getProviderProfile(providerId) {
  var apiUrl = import.meta.env.VITE_API_URL;
  var res;

  try {
    res = await axios.get(`${apiUrl}/Provider/providerDetails/${providerId}`);
    return res.data;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      console.log(error.response.data.detail);
      console.log(error.response.status);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
  }
}
