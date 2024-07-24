/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import order from "../../assets/order.jpg";
import { useEffect, useState } from "react";

import OrderCreateModal from "./OrderCreateModal";
import OrdersContainer from "../../components/OrdersContainer";
import { useOrderHub } from "../../api/orders";

function ConsumerHome() {
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [alignment, setAlignment] = useState("pending");
  const [modalOpen, setModalOpen] = useState(false);
  const [orders, setOrders] = useOrderHub();

  function addOrder(order) {
    setOrders([order, ...orders]);
  }

  useEffect(() => {
    if (!alignment) return;
    switch (alignment) {
      case "pending":
        setFilteredOrders(orders.filter((o) => o.orderStatus == "created"));
        break;
      case "processing":
        setFilteredOrders(
          orders.filter(
            (o) =>
              o.orderStatus == "processing" ||
              o.orderStatus == "marked fulfilled"
          )
        );
        break;
      case "completed":
        setFilteredOrders(orders.filter((o) => o.orderStatus == "completed"));
        break;
      case "fulfilled":
        setFilteredOrders(
          orders.filter((o) => o.orderStatus == "marked fulfilled")
        );
        break;
      case "disputed":
        setFilteredOrders(orders.filter((o) => o.orderStatus == "disputed"));
        break;
      default:
        setFilteredOrders([]);
    }
  }, [alignment, orders]);
  return (
    <Box p={4}>
      <Paper
        elevation={3}
        sx={{
          background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${order})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: 3,
          margin: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          borderRadius: 10,
          color: "white",
        }}
      >
        <Typography variant="h3">Create order</Typography>
        <Typography fontWeight={600} fontSize="25px">
          Create an order and wait for our freelancers to bid on it.
        </Typography>
        <Button
          variant="contained"
          onClick={() => setModalOpen(true)}
          sx={{
            backgroundColor: "green",
            paddingInline: 8,
            paddingBlock: 3,
            borderRadius: 10,
          }}
        >
          Create
        </Button>
      </Paper>
      <OrderCreateModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        addOrder={addOrder}
      />
      <Box display="flex" flexDirection="column" alignItems="center">
        <ToggleButtonGroup
          variant="filled"
          color="primary"
          value={alignment}
          exclusive
          onChange={(event, newAlignment) => {
            setAlignment(newAlignment);
          }}
          aria-label="Platform"
        >
          <ToggleButton value="pending">Pending</ToggleButton>
          <ToggleButton value="processing">Processing</ToggleButton>
          <ToggleButton value="fulfilled">Fulfilled</ToggleButton>
          <ToggleButton value="completed">Completed</ToggleButton>
          <ToggleButton value="disputed">Disputed</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <OrdersContainer orders={filteredOrders} />
    </Box>
  );
}

export default ConsumerHome;
