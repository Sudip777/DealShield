/* eslint-disable react/prop-types */
import { Box, Paper, Typography } from "@mui/material";
import styled from "@emotion/styled";

export function UserDetailContainer({ user }) {
  const StyledLabel = styled("b")({
    fontWeight: "bold",
    marginRight: "3rem",
    flexBasis: "130px",
  });
  return (
    <Paper
      elevation={5}
      sx={{
        width: "100%",
        borderRadius: 8,
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        gap={3}
        padding="20px 10px"
        paddingRight="5px"
        width="100#"
      >
        <Typography width="100%" display="flex" flexWrap="wrap" fontSize={20}>
          <StyledLabel> User Id: </StyledLabel>
          {user.id}
        </Typography>
        <Typography display="flex" flexWrap="wrap" fontSize={20}>
          <StyledLabel> Ratings: </StyledLabel>
          {user.avgRating + " stars from " + user.ratingCount + " reviews."}
        </Typography>
        <Typography display="flex" flexWrap="wrap" fontSize={20}>
          <StyledLabel> Name: </StyledLabel>
          {user.firstName.toUpperCase() + " " + user.lastName.toUpperCase()}
        </Typography>
        <Typography display="flex" flexWrap="wrap" fontSize={20}>
          <StyledLabel> Email: </StyledLabel>
          {user.email}
        </Typography>
        <Typography display="flex" flexWrap="wrap" fontSize={20}>
          <StyledLabel> Mobile: </StyledLabel>
          {user.mobileNo}
        </Typography>
        <Typography display="flex" flexWrap="wrap" fontSize={20}>
          <StyledLabel> User Type: </StyledLabel>
          {user.userType}
        </Typography>
        <Typography display="flex" flexWrap="wrap" fontSize={20}>
          <StyledLabel> Total Orders: </StyledLabel>
          {user.totalOrderCount}
        </Typography>
      </Box>
    </Paper>
  );
}
