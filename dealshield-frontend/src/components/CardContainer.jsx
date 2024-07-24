import styled from "@emotion/styled";
import { Grid, Paper, Typography } from "@mui/material";
import talent from "../assets/talent.png";
import freelance from "../assets/freelance.png";
import business from "../assets/business.png";
import { PropTypes } from "prop-types";

function CardContainer() {
  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: "center",
    color: theme.palette.text.secondary,
    lineHeight: "60px",
    elevation: 3,
    padding: 13,
    width: "100%",
  }));

  // eslint-disable-next-line react/prop-types
  const CardItem = ({ heading, description, image }) => (
    <Grid item xs={12} sm={6} md={4}>
      <Item>
        <img src={image} alt="talent" height="100px" />
        <Typography variant="h5">{heading}</Typography>
        <Typography textAlign="left">{description}</Typography>
      </Item>
    </Grid>
  );

  CardItem.propTypes = {
    heading: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  };
  return (
    <Grid container spacing={2} padding={3}>
      <CardItem
        heading="Global Talents"
        description=" We open the magic portal for you to gain find talents from all over
          the world. A decentralized service where freelancers from all over the
          world are welcome to compete for orders."
        image={talent}
      />
      <CardItem
        heading="Work with the best"
        description="Providers all over the globe use our platform. Find the best among all the workforce. Never compromise on quality. We have the pool of best workers for you at your fingertips."
        image={freelance}
      />

      <CardItem
        heading="Creative Ideas"
        description="Turn the ideas of your dreams into reality. From ideas to concrete tasks on the real world, we make it happen. We provide the platform for our users to do just that."
        image={business}
      />
    </Grid>
  );
}

export default CardContainer;
