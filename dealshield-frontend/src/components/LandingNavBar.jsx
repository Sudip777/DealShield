import {
  AppBar,
  Box,
  Divider,
  Icon,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import logo from "../assets/logo.svg";
import styled from "@emotion/styled";
import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../hooks/auth";
import {
  AddIcCall,
  Email,
  Facebook,
  LinkedIn,
  Person,
  Place,
  X,
  YouTube,
} from "@mui/icons-material";
import { getUserType } from "../api/consumer";

function LandingNavBar() {
  const isLoggedIn = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    handleClose();
    window.localStorage.removeItem("auth-token");
    window.dispatchEvent(new Event("storage"));
  };

  const StyledTitleBox = styled(Box)(({ theme }) => ({
    display: "block",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  }));

  const StyledLinks = styled(Typography)({
    variant: "h6",
    color: "white",
    textDecoration: "none",
    fontWeight: 700,
  });
  const LoginRegisterBox = () => (
    <Box display="flex" gap={3}>
      <Link to={`/login`} style={{ textDecoration: "none" }}>
        <StyledLinks>SIGN IN</StyledLinks>
      </Link>
      <Link to={`/register`} style={{ textDecoration: "none" }}>
        <StyledLinks>SIGN UP</StyledLinks>
      </Link>
    </Box>
  );

  const Avatar = () => (
    <IconButton>
      <Person
        sx={{
          height: "50px",
          width: "40px",
        }}
      />
    </IconButton>
  );
  const redirectUrl = isLoggedIn
    ? getUserType() == "provider"
      ? "/Provider"
      : getUserType() == "consumer"
      ? "/Consumer"
      : "/Admin"
    : "/";

  return (
    <>
      <AppBar position="sticky">
        <Toolbar sx={{ backgroundColor: "gray" }}>
          <Box display="flex" justifyContent="space-between" width="100%">
            <Link
              to={redirectUrl}
              style={{ textDecoration: "none", color: "white" }}
            >
              <Box display="flex" gap={3} alignItems="center" height="100%">
                <Icon>
                  <img src={logo} alt="Logo" />
                </Icon>
                <StyledTitleBox>
                  <h3>Escrow App</h3>
                </StyledTitleBox>
              </Box>
            </Link>
            {isLoggedIn ? (
              <IconButton onClick={handleClick}>
                <Avatar />
              </IconButton>
            ) : (
              <LoginRegisterBox />
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Menu
        open={menuOpen}
        onClose={handleClose}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem
          style={{
            paddingInline: "40px",
            paddingBlock: "20px",
          }}
          onClick={handleClose}
        >
          <Link
            to="/profile"
            style={{ textDecoration: "none", color: "black" }}
          >
            Profile
          </Link>
        </MenuItem>
        <Divider sx={{ backgroundColor: "black", height: 2 }} />
        <MenuItem
          style={{ paddingInline: "40px", paddingBlock: "20px" }}
          onClick={handleLogout}
        >
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            Logout
          </Link>
        </MenuItem>
      </Menu>
      <>
        <Outlet />
      </>
      <Box display="flex" alignItems="center" justifyContent="center">
        <Box
          width="100%"
          display="flex"
          flexWrap="wrap"
          bgcolor="gray"
          pb="5vh"
          paddingInline="3vw"
        >
          <Box sx={{ color: "white", padding: 3 }} flexBasis="600px">
            <Typography variant="h5" fontWeight={700}>
              Escrow Service
            </Typography>
            <Typography variant="p" lineHeight={1.5}>
              An escrow service acts as a neutral third party in a financial
              transaction. It holds onto the funds and assets involved in the
              transaction until all parties has fulfilled their obligations and
              the transaction is completed.
            </Typography>
          </Box>
          <Stack
            direction="row"
            flex={1}
            display="flex"
            flexWrap="wrap"
            justifyContent="flex-start"
          >
            <Box p={3} color="white">
              <Typography fontSize={20} fontWeight={700}>
                Contact Us
              </Typography>
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <Place />
                <p>Kathmandu, Nepal</p>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <AddIcCall />
                <p>+977 01-123456</p>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <Email />
                <p>info@escrow.com</p>
              </div>
            </Box>
            <Box p={3} color="white">
              <Typography fontSize={20} fontWeight={700}>
                Follow Us
              </Typography>
              <p>
                Stay updated with our latest news and updates by following us on
                social media
              </p>
              <div
                style={{ display: "flex", alignItems: "center", gap: "20px" }}
              >
                <Facebook />
                <X />
                <YouTube />
                <LinkedIn />
              </div>
            </Box>
          </Stack>
        </Box>
      </Box>
    </>
  );
}

export default LandingNavBar;
