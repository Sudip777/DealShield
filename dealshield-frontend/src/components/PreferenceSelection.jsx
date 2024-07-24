import { Box, Slider, Typography } from "@mui/material";

function PreferenceSelection({
  costPref,
  setCostPref,
  trustPref,
  setTrustPref,
}) {
  const handleChange = (event, newValue) => {
    setCostPref(newValue);
  };
  const handleTrustChange = (event, newValue) => {
    setTrustPref(newValue);
  };
  return (
    <>
      <Box width={"100%"} mt={2}>
        <Typography>Cost Preferences: </Typography>
        <Slider
          sx={{
            flexGrow: 1,
          }}
          defaultValue={costPref}
          aria-label="Default"
          valueLabelDisplay="auto"
          onChange={handleChange}
        />
      </Box>

      <Box width={"100%"}>
        <Typography>Trust Preferences: </Typography>
        <Slider
          sx={{
            flexGrow: 1,
          }}
          defaultValue={trustPref}
          aria-label="Default"
          valueLabelDisplay="auto"
          onChange={handleTrustChange}
        />
      </Box>
    </>
  );
}

export default PreferenceSelection;
