/* eslint-disable no-unused-vars */
import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import { useLoaderData, useNavigate } from "react-router-dom";
import AdminMenu from "../../components/AdminMenu";
import OrderDetailAdmin from "../../components/OrderDetailAdmin";

export async function loader({ params }) {
  const authToken = localStorage.getItem("auth-token");
  const apiUrl = `${import.meta.env.VITE_API_URL}/Admin/CompletedOrders`;

  try {
    let res = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    let orders = res.data;
    console.log(orders);
    return { orders };
  } catch (error) {
    console.log(error);
  }
}

function CompletedOrders() {
  const navigate = useNavigate();
  var { orders } = useLoaderData();
  return (
    <>
      <Box display="flex" height="100%">
        <AdminMenu />
        <Box flexGrow={1} bgcolor="peachpuff" p={2}>
          <Typography variant="h3" fontSize={40}>
            Completed Orders:{" "}
          </Typography>
          <Box p={2}>
            {orders.map((or) => (
              <Box display={"flex"} key={or.id} alignItems="center" gap={1}>
                <OrderDetailAdmin order={or} />
                <Button
                  onClick={() => navigate(`/order/${or.id}`)}
                  variant="conatined"
                  sx={{
                    bgcolor: "lightblue",
                    color: "brown",
                  }}
                >
                  Check
                </Button>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default CompletedOrders;
