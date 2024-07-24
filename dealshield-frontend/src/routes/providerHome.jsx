/* eslint-disable react/prop-types */
import { Box, Divider, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Carousel } from "primereact/carousel";

import { TabView, TabPanel } from "primereact/tabview";
import { useEffect, useState } from "react";
import { GetAllCreatedOrders, GetAllSelectedOrders } from "../api/orders";

function ProviderHome() {
  const [createdOrders, setCreatedOrders] = useState(null);
  const [selectedOrders, setSelectedOrders] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    async function getProvidersOrders() {
      const [createdOrdersRes, selectedOrdersRes] = await Promise.all([
        GetAllCreatedOrders(),
        GetAllSelectedOrders(),
      ]);
      setCreatedOrders(createdOrdersRes);
      setSelectedOrders(selectedOrdersRes);
    }
    getProvidersOrders();
  }, []);

  const filteredOrders = activeIndex == 1 ? selectedOrders : createdOrders;

  const carouselData = [
    {
      title: "Sell your service with assurance",
      description:
        "We hold the funds before you start working. After the completion, we disburse you your earnings minus our service charge",
      image: "https://cdn-icons-png.flaticon.com/512/4157/4157207.png",
    },
    {
      title: "Power on you hands",
      description:
        "Review tons of orders and choose any amount you like. Place your proposals and wait for it to be accepted.",
      image: "https://cdn-icons-png.flaticon.com/512/6577/6577645.png",
    },
    {
      title: "Grow your income with side hustles",
      description:
        "Keep your main job and work on the side with our online freelancing/escrow platform.",
      image: "https://clipart-library.com/images/yckrderqi.png",
    },
  ];

  const carousalTemplate = (data) => {
    return (
      <Box
        display="flex"
        alignItems="flex-start"
        margin="auto"
        p={5}
        bgcolor="lightblue"
        marginBlock={2}
        borderRadius={10}
        sx={{
          width: { xs: "75vw", sm: "70vw", md: "50vw" },
        }}
      >
        <Box>
          <Typography mb={5} variant="h6" fontWeight={600}>
            {data.title}
          </Typography>
          <Typography>{data.description}</Typography>
        </Box>
        <img
          src={data.image}
          alt="carousel-img"
          width="300px"
          height="100px"
          style={{ objectFit: "contain" }}
        />
      </Box>
    );
  };
  return (
    <Box>
      <div className="card">
        <Carousel
          value={carouselData}
          numScroll={1}
          numVisible={1}
          itemTemplate={carousalTemplate}
          autoplayInterval={7000}
        />
      </div>
      <Box
        marginInline={3}
        marginBlock={2}
        boxShadow={5}
        p={5}
        bgcolor="#f5f0f0"
        borderRadius={10}
        display="flex"
        flexDirection="column"
        gap={2}
      >
        <OrderTabs activeIndex={activeIndex} setActiveIndex={setActiveIndex} />

        {filteredOrders ? (
          filteredOrders.map((order) => (
            <OrderBox key={order.id} order={order} />
          ))
        ) : (
          <h6>No orders.</h6>
        )}
      </Box>
    </Box>
  );
}

function OrderBox({ order }) {
  return (
    <Box>
      <Box p={1}>
        <Link
          style={{ textDecoration: "none", color: "black" }}
          to={`/order/${order.id}`}
        >
          <Typography variant="h5" fontWeight={700}>
            {order.name}
          </Typography>
        </Link>
        <Box
          mb={3}
          display="flex"
          gap="10px"
          sx={{ fontSize: 10, color: "gray" }}
        >
          <Typography>
            <b>Budget:</b> Rs. {order.cost / 100}
          </Typography>
          <Typography>
            <b>Proposed Time:</b> {order.allowedDays} days
          </Typography>
        </Box>
        <Box mb={2} display="flex" gap="10px" sx={{ fontSize: 10 }}>
          <Typography textAlign="justify">
            <b>Description:</b> {order.description}
          </Typography>
        </Box>
        <Divider sx={{ backgroundColor: "black", height: "2px" }} />
      </Box>
    </Box>
  );
}

function OrderTabs({ activeIndex, setActiveIndex }) {
  const styles = {
    cursor: "pointer",
    marginInline: 3,
    padding: "14px",
    borderRadius: "10px",
    marginBlock: "5px",
  };
  const tab1Style = (options) => {
    return (
      <div
        onClick={options.onClick}
        style={{
          ...styles,
        }}
      >
        <Typography fontSize={20} fontWeight={600}>
          Bid On Orders
        </Typography>
      </div>
    );
  };
  const tab2Style = (options) => {
    return (
      <div
        onClick={options.onClick}
        style={{
          ...styles,
        }}
      >
        <Typography fontSize={20} fontWeight={600}>
          Your Orders
        </Typography>
      </div>
    );
  };
  const tab3Style = (options) => {
    return (
      <div
        onClick={options.onClick}
        style={{
          ...styles,
          backgroundColor: activeIndex == 2 ? "green" : "",
        }}
      >
        <Typography fontSize={20} fontWeight={600}>
          Completed Orders
        </Typography>
      </div>
    );
  };
  const tab4Style = (options) => {
    return (
      <div
        onClick={options.onClick}
        style={{
          ...styles,
          backgroundColor: activeIndex == 3 ? "green" : "",
        }}
      >
        <Typography fontSize={20} fontWeight={600}>
          Disputed Orders
        </Typography>
      </div>
    );
  };
  return (
    <TabView
      activeIndex={activeIndex}
      onTabChange={(e) => setActiveIndex(e.index)}
    >
      <TabPanel header="Bid on Orders" headerTemplate={tab1Style}></TabPanel>
      <TabPanel headerTemplate={tab2Style} header="Your Orders"></TabPanel>
      {/* <TabPanel headerTemplate={tab3Style} header="Completed Orders"></TabPanel>
      <TabPanel headerTemplate={tab4Style} header="Disputed Orders"></TabPanel> */}
    </TabView>
  );
}

export default ProviderHome;
