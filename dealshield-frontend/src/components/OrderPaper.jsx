/* eslint-disable react/prop-types */
import { Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const OrderPaper = ({ order }) => {
  return (
    <Paper
      key={order.Id}
      elevation={6}
      sx={{
        width: { xs: "90%", sm: "45%" },
        padding: 5,
        borderRadius: 7,
      }}
    >
      <Link to={`/order/${order.id}`} style={{ textDecoration: "none" }}>
        <Typography color="black" variant="h6">
          {order.name}
        </Typography>
      </Link>
      <Typography>{order.description}</Typography>
    </Paper>
  );
};

export default OrderPaper;
