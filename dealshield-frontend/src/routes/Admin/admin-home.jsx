import { Box, Grid, Paper, Typography } from "@mui/material";
import AdminMenu from "../../components/AdminMenu";
import { Card } from "primereact/card";
import styled from "@emotion/styled";
import axios from "axios";
import { useLoaderData } from "react-router-dom";

export async function loader({ params }) {
  const authToken = localStorage.getItem("auth-token");
  const apiUrl = `${import.meta.env.VITE_API_URL}/Admin/MonthlyTransaction`;
  const overAllDetailUrl = `${
    import.meta.env.VITE_API_URL
  }/Admin/GetOverAllDetails`;
  const prevMonthTransactionAPIUrl = `${
    import.meta.env.VITE_API_URL
  }/Admin/PreviousMonthTransaction`;
  try {
    let res = axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    let prevMonthRes = axios.get(prevMonthTransactionAPIUrl, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    let overAllDetailsRes = axios.get(overAllDetailUrl, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    let { data: prevMonthTransaction } = await prevMonthRes;
    let { data: currentMonthTransaction } = await res;
    let { data: overAllDetails } = await overAllDetailsRes;

    console.log(currentMonthTransaction);
    return { currentMonthTransaction, prevMonthTransaction, overAllDetails };
  } catch (error) {
    console.log(error);
  }
}

function AdminHome() {
  var { overAllDetails, prevMonthTransaction, currentMonthTransaction } =
    useLoaderData();
  const currentMonthRevenue = (
    currentMonthTransaction -
    0.8 * currentMonthTransaction
  ).toFixed(2);
  const prevMonthRevenue = (
    prevMonthTransaction -
    0.8 * prevMonthTransaction
  ).toFixed(2);

  const increment = (
    ((currentMonthTransaction - prevMonthTransaction) * 100) /
    prevMonthTransaction
  ).toFixed(2);

  const revenueIncrement = (
    ((currentMonthRevenue - prevMonthRevenue) * 100) /
    prevMonthRevenue
  ).toFixed(2);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    borderRadius: 10,
    paddingBlock: 23,
  }));
  return (
    <>
      <Box display="flex" height="100%">
        <AdminMenu />
        <Box flexGrow={1} bgcolor="peachpuff">
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            p={3}
          >
            <Grid item xs={3}>
              <Item>
                <Box>
                  <img
                    src="https://images.vexels.com/media/users/3/135312/isolated/preview/43263210a742754f72b82514eb8e8613-atm-cash-collection.png"
                    alt="cash"
                    height="100px"
                    style={{
                      borderRadius: 10,
                    }}
                  />
                  <Typography variant="h5">Last 30 days transaction</Typography>
                  <Typography variant="h6" color="green">
                    Rs. {currentMonthTransaction}
                  </Typography>

                  {increment > 0 ? (
                    <Typography fontSize="20px" fontWeight={20} color="green">
                      {increment}% increment{" "}
                    </Typography>
                  ) : (
                    <Typography fontSize="20px" fontWeight={20} color="red">
                      {increment}% decrement
                    </Typography>
                  )}
                </Box>
              </Item>
            </Grid>
            <Grid item xs={3}>
              <Item>
                <Box>
                  <img
                    src="https://img.freepik.com/free-vector/hand-drawn-cartoon-dollar-sign-illustration_23-2150927135.jpg"
                    alt="cash"
                    height="100px"
                    style={{
                      borderRadius: 10,
                    }}
                  />
                  <Typography variant="h5">Last 30 days revenue</Typography>
                  <Typography variant="h6" color="green">
                    Rs. {currentMonthRevenue}
                  </Typography>

                  {revenueIncrement > 0 ? (
                    <Typography fontSize="20px" fontWeight={20} color="green">
                      {revenueIncrement}% increment{" "}
                    </Typography>
                  ) : (
                    <Typography fontSize="20px" fontWeight={20} color="red">
                      {revenueIncrement}% decrement
                    </Typography>
                  )}
                </Box>
              </Item>
            </Grid>
          </Grid>
          <Paper
            elevation={5}
            sx={{
              bgcolor: "#b0c9cf",
              padding: 4,
            }}
          >
            <Typography
              fontSize={50}
              fontWeight={100}
              color="crimson"
              textAlign="center"
            >
              Overall Platform Details
            </Typography>
            <Typography variant="h6" fontSize={20}>
              Total Consumers: {overAllDetails.totalConsumers}
            </Typography>
            <Typography variant="h6" fontSize={20}>
              Total Providers: {overAllDetails.totalProviders}
            </Typography>
            <Typography variant="h6" fontSize={20}>
              Disputed Orders: {overAllDetails.totalDisputedOrders}
            </Typography>
            <Typography variant="h6" fontSize={20}>
              Paid Orders: {overAllDetails.totalPaidOrders}
            </Typography>
            <Typography variant="h6" fontSize={20}>
              Requires Payment: {overAllDetails.totalCompletedOrders}
            </Typography>
          </Paper>
        </Box>
      </Box>
    </>
  );
}

export default AdminHome;
