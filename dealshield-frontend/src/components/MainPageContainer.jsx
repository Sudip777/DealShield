import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

function MainPageContainer() {
  const [hover, setHover] = useState(false);
  return (
    <Box
      sx={{
        background:
          "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(https://i.pinimg.com/originals/0f/8b/a5/0f8ba5b8d78ed7c43ababd190aafb282.jpg)",
        backgroundBlendMode: "darken",
        height: "75vh",
        width: "100%",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        color: "white",
      }}
    >
      <Box gap={2} display="flex" flexDirection="column" alignItems="center">
        <Typography
          variant="h3"
          textAlign="center"
          fontWeight={600}
          color={"white"}
        >
          From anywhere, At anytime
        </Typography>
        <Typography
          fontFamily="Work Sans"
          fontWeight={350}
          fontSize="25px"
          textAlign={"center"}
        >
          Remove the stress of online transactions with our secure escrow
          service protecting every payment.
        </Typography>
        <Link to={`register`}>
          <Button
            variant="contained"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
              backgroundColor: hover ? "#b3566d" : "#ff3366",
              padding: "20px",
              paddingInline: "65px",
              borderRadius: 0,
              fontSize: "20px",
            }}
          >
            Register
          </Button>
        </Link>
        <Box mt={10}>
          <Link to={`provider-login`}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#213e4a",
                padding: "20px",
                paddingInline: "65px",
                borderRadius: 0,
                fontSize: "20px",
                "&:hover": {
                  backgroundColor: "#5b6163",
                },
              }}
            >
              I'm a Provider
            </Button>
          </Link>
        </Box>
      </Box>
      <Box></Box>
    </Box>
  );
}

export default MainPageContainer;
