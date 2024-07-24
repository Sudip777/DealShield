import { ThumbUp } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

function StripeCallBack() {
  return (
    <Box
      height="70vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      gap={3}
    >
      <ThumbUp style={{ width: "150px", height: "150px", color: "green" }} />
      <Typography variant="h3" fontWeight={200}>
        Your payment has been processed.
      </Typography>
      <Typography variant="h5" fontWeight={400}>
        <i>You may close this tab.</i>
      </Typography>
    </Box>
  );
}

export default StripeCallBack;
