import { Box, Typography } from "@mui/material";
import { useRouteError } from "react-router-dom";

function Error() {
  const error = useRouteError();
  console.error(error);
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Box display="flex" flexDirection="column" gap={4}>
        <Typography variant="h3" fontWeight={700}>
          Oops!
        </Typography>
        <Typography variant="h5">
          Sorry, an unexpected error has occurred.
        </Typography>
        <Typography>
          <i>{error.statusText || error.message}</i>
        </Typography>
      </Box>
    </Box>
  );
}

export default Error;
