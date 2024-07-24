/* eslint-disable react/prop-types */
import { Box, Container, InputBase, Stack, Typography } from "@mui/material";
import OrderPaper from "./OrderPaper";
import styled from "@emotion/styled";

function OrdersContainer({ orders }) {
  const SideBarBox = styled(Box)(({ theme }) => ({
    height: "100%",
    width: "25%",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  }));

  const Search = styled("div")(({ theme }) => ({
    backgroundColor: "white",
    padding: "5px 15px",
    borderRadius: 10,
    border: "black solid 1px",
    width: "70%",
  }));
  return (
    <Container>
      <Typography mb={3} fontWeight={700} fontSize={25}>
        Order
      </Typography>
      <Box display="flex">
        <SideBarBox>
          <Typography mb={1}>Search orders: </Typography>
          <Search>
            <InputBase sx={{}} placeholder="Search..." />
          </Search>
        </SideBarBox>
        <Stack
          useFlexGap
          flexWrap="wrap"
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          flex={1}
        >
          {orders.length ? (
            orders.map((order) => <OrderPaper key={order.Id} order={order} />)
          ) : (
            <h1>No orders</h1>
          )}
        </Stack>
      </Box>
    </Container>
  );
}

export default OrdersContainer;
