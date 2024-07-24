import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function AdminMenu() {
  const StyledLink = styled(Link)({
    textDecoration: "none",
    color: "white",
    width: "100%",
  });

  const StyledTabBox = styled(Box)({
    border: "white solid 1px",
    width: "100%",
    padding: "20px",
    paddingInline: "30px",
    "&:hover": {
      backgroundColor: "blue",
    },
  });
  return (
    <>
      <Box
        position="static"
        display="flex"
        flexDirection="column"
        width="15vw"
        bgcolor="darkgray"
        alignItems="center"
        minHeight="70vh"
      >
        <StyledLink to="/admin">
          <StyledTabBox>
            <Typography variant="h6">Home</Typography>
          </StyledTabBox>
        </StyledLink>
        <StyledLink to="/admin/disputed-orders">
          <StyledTabBox>
            <Typography variant="h6">Disputed Orders</Typography>
          </StyledTabBox>
        </StyledLink>
        <StyledLink to="/admin/completed-orders">
          <StyledTabBox>
            <Typography variant="h6">Completed Orders</Typography>
          </StyledTabBox>
        </StyledLink>
        <StyledLink to="/admin/paid-orders">
          <StyledTabBox>
            <Typography variant="h6">Paid Orders</Typography>
          </StyledTabBox>
        </StyledLink>
      </Box>
    </>
  );
}

export default AdminMenu;
