import axios from "axios";
import { useEffect, useState } from "react";

export const useOrderHub = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function getOrders() {
      const url = `${import.meta.env.VITE_API_URL}/Consumer/GetAllOrder`;
      const headers = {
        Authorization: `Bearer ${window.localStorage.getItem("auth-token")}`,
      };
      try {
        let res = await axios.get(url, { headers });
        setOrders(res.data);
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

    getOrders();
  }, []);

  return [orders, setOrders];
};

export async function CreateOrder(order) {
  const url = `${import.meta.env.VITE_API_URL}/Order/create`;
  const headers = {
    Authorization: `Bearer ${window.localStorage.getItem("auth-token")}`,
  };
  try {
    let res = await axios.post(url, order, { headers });
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

export async function GetPaymentUrl(orderId, bidId, method) {
  var paymentKeyword = "AcceptBid";
  if (method == "stripe") paymentKeyword = "AcceptBidWithStripe";
  const apiUrl = `${
    import.meta.env.VITE_API_URL
  }/Order/${orderId}/${paymentKeyword}?BidId=${bidId}`;
  const headers = {
    Authorization: `Bearer ${window.localStorage.getItem("auth-token")}`,
  };
  try {
    let res = await axios.get(apiUrl, { headers });
    return res.data.paymentUri;
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

export async function GetAllCreatedOrders() {
  //Url and headers setup
  const createdOrdersUrl = `${import.meta.env.VITE_API_URL}/Order`;
  const headers = {
    Authorization: `Bearer ${window.localStorage.getItem("auth-token")}`,
  };

  try {
    let res = await axios.get(createdOrdersUrl, { headers });
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

export async function GetAllSelectedOrders() {
  //Url and headers setup
  const selectedOrdersUrl = `${
    import.meta.env.VITE_API_URL
  }/Provider/GetSelectedBids`;
  const headers = {
    Authorization: `Bearer ${window.localStorage.getItem("auth-token")}`,
  };

  try {
    let res = await axios.get(selectedOrdersUrl, { headers });
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

export async function GetAllDisputedOrders() {
  //Url and headers setup
  const disputedOrdersUrl = `${
    import.meta.env.VITE_API_URL
  }/Admin/DisputedOrders`;
  const headers = {
    Authorization: `Bearer ${window.localStorage.getItem("auth-token")}`,
  };

  try {
    let res = await axios.get(disputedOrdersUrl, { headers });
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

export async function raiseDispute(orderId) {
  const url = `${import.meta.env.VITE_API_URL}/Order/RaiseDispute/${orderId}`;

  const headers = {
    Authorization: `Bearer ${window.localStorage.getItem("auth-token")}`,
  };

  try {
    let res = await axios.get(url, { headers });
    location.reload();
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

export async function markOrderPaid(orderId) {
  const url = `${
    import.meta.env.VITE_API_URL
  }/Admin/MarkOrderPaid?orderId=${orderId}`;

  const headers = {
    Authorization: `Bearer ${window.localStorage.getItem("auth-token")}`,
  };

  try {
    let res = await axios.get(url, { headers });
    location.reload();
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

export async function createBid(bidRequest) {
  const selectedOrdersUrl = `${
    import.meta.env.VITE_API_URL
  }/Provider/CreateBid`;
  const headers = {
    Authorization: `Bearer ${window.localStorage.getItem("auth-token")}`,
  };

  try {
    let res = await axios.post(selectedOrdersUrl, bidRequest, { headers });
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

export async function markCompleted(orderId) {
  const selectedOrdersUrl = `${
    import.meta.env.VITE_API_URL
  }/Order/MarkCompleted/${orderId}`;

  const headers = {
    Authorization: `Bearer ${window.localStorage.getItem("auth-token")}`,
  };

  try {
    let res = await axios.get(selectedOrdersUrl, { headers });
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

//VerifyOrderCompletion/{{OrderId}}
export async function verifyOrderCompletion(orderId) {
  console.log(orderId);
  const selectedOrdersUrl = `${
    import.meta.env.VITE_API_URL
  }/Order/VerifyOrderCompletion/${orderId}`;

  const headers = {
    Authorization: `Bearer ${window.localStorage.getItem("auth-token")}`,
  };

  try {
    let res = await axios.get(selectedOrdersUrl, { headers });
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

//{{Address}}/{{OrderId}}/rate?RatingCount=9
export async function rateOrder(orderId, ratingCount) {
  const selectedOrdersUrl = `${
    import.meta.env.VITE_API_URL
  }/Order/${orderId}/rate?RatingCount=${ratingCount}`;

  const headers = {
    Authorization: `Bearer ${window.localStorage.getItem("auth-token")}`,
  };

  try {
    let res = await axios.get(selectedOrdersUrl, { headers });
    location.reload();
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
