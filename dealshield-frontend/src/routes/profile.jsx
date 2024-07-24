/* eslint-disable react/prop-types */
import { Box, Paper, Typography } from "@mui/material";
import { getUserDetails, getUserType } from "../api/consumer";
import styled from "@emotion/styled";
import { useLoaderData } from "react-router-dom";

export async function loader() {
  const userType = getUserType();
  let user = await getUserDetails(userType);
  console.log(user);
  return { user };
}

function Profile() {
  const { user } = useLoaderData();
  return (
    <Box
      display="flex"
      flexDirection="column"
      p={3}
      paddingInline={15}
      gap={10}
    >
      <Box alignSelf="center" height="200px">
        <img
          src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436178.jpg"
          alt="Avatar"
          height="100%"
          style={{ objectFit: "contain", borderRadius: 20 }}
        />
        <Typography textAlign="center" variant="h5" fontWeight={700}>
          User Details:{" "}
        </Typography>
      </Box>
      {user ? <UserDetailContainer user={user} /> : ""}
    </Box>
  );
}

function UserDetailContainer({ user }) {
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
        {user.userType == "CONSUMER" && (
          <>
            <Typography display="flex" flexWrap="wrap" fontSize={20}>
              <StyledLabel> Low cost preference: </StyledLabel>
              {user.lowCostPref}
            </Typography>
            <Typography display="flex" flexWrap="wrap" fontSize={20}>
              <StyledLabel> Trust preference: </StyledLabel>
              {user.trustPref}
            </Typography>
          </>
        )}
        <Typography display="flex" flexWrap="wrap" fontSize={20}>
          <StyledLabel> Total Orders: </StyledLabel>
          {user.totalOrderCount}
        </Typography>
      </Box>
    </Paper>
  );
}

export default Profile;
