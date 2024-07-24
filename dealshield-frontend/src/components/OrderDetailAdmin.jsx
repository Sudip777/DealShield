/* eslint-disable react/prop-types */
import { Box, Paper, Typography } from "@mui/material";
import React from "react";

// {
//   "id": "0ef6c854-bf59-4da7-80e5-75c98890f615",
//   "name": "Tile my bathroom",
//   "description": "I desire a bathroom transformation with elegant tiling. I envision sleek, marble-like tiles adorning the walls and floor, creating a luxurious ambiance. The tiles should exude a timeless charm, with a color palette that complements the overall decor. It's a step towards enhancing both style and functionality in my sanctuary.",
//   "cost": 3000000,
//   "orderStatus": "disputed",
//   "creatorId": "a92b3e7a-5798-45be-ac74-bdfc6ecd652b",
//   "allowedDays": 10,
//   "providerId": "c5a7a4b3-5da8-482c-9e3b-a56a3e0e99da",
//   "acceptedDate": "2024-03-22T04:46:44.9135677",
//   "deadLine": "2024-04-01T04:46:44.9135677",
//   "bidsCount": 1,
//   "acceptedBid": "b8ab2b54-2d97-4590-9caf-63b3083bb473"
// }

function OrderDetailAdmin({ order }) {
  return (
    <Paper
      elevation={3}
      sx={{
        padding: 2,
        marginBottom: 1,
        borderRadius: 4,
      }}
    >
      <Box display="flex">
        <Box>
          <Typography variant="h6" fontWeight={300} mr={10}>
            Title:{" "}
          </Typography>
        </Box>
        <Typography fontSize={20}>{order.name}</Typography>
      </Box>
      <Box display="flex">
        <Typography variant="h6" fontWeight={300} mr={3}>
          Description:{"   "}
        </Typography>
        <Typography fontSize={20} width="70%" textAlign="justify">
          {order.description}
        </Typography>
      </Box>
    </Paper>
  );
}

export default OrderDetailAdmin;
