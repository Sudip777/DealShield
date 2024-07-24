/* eslint-disable react/prop-types */
import { Link, useLoaderData } from "react-router-dom";
import orderImg from "../assets/order.jpg";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { Rating } from "primereact/rating";
import styled from "@emotion/styled";
import axios from "axios";
import { useState } from "react";
import {
  GetPaymentUrl,
  createBid,
  markCompleted,
  markOrderPaid,
  raiseDispute,
  rateOrder,
  verifyOrderCompletion,
} from "../api/orders";
import { getUserId, getUserType } from "../api/consumer";
import { Check, Gavel } from "@mui/icons-material";

export async function loader({ params }) {
  const authToken = localStorage.getItem("auth-token");
  const apiUrl = `${import.meta.env.VITE_API_URL}/Order/${params.orderId}`;

  try {
    let res = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    let order = res.data;
    console.log(order);
    return { order };
  } catch (error) {
    console.log(error);
  }
}
function Order() {
  const [modalOpen, setModalOpen] = useState(false);
  const { order } = useLoaderData();
  const [bids, setBids] = useState(order.bids);
  const [rating, setRating] = useState(0);
  const StyledText = styled(Typography)({
    component: "p",
    fontSize: 16,
    alignSelf: "flex-start",
  });

  const handleMarkCompleted = async () => {
    var result = await markCompleted(order.id);
    if (result == "Done") window.location.reload(true);
  };

  const StyledButton = styled(Button)({
    alignSelf: "flex-start",
    paddingBlock: "10px",
    paddingInline: "20px",
    backgroundColor: "green",
    color: "white",
    borderRadius: 10,
    "&:hover": {
      backgroundColor: "purple",
    },
  });

  const MarkCompletedButton = () => (
    <Button
      startIcon={<Check />}
      onClick={handleMarkCompleted}
      sx={{
        alignSelf: "flex-start",
        paddingBlock: "10px",
        paddingInline: "20px",
        backgroundColor: "green",
        color: "white",
        borderRadius: 10,
        "&:hover": {
          backgroundColor: "purple",
        },
      }}
    >
      Mark Completed
    </Button>
  );

  // setBids([...order.bids]);
  return (
    <Box
      p={8}
      width="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={2}
    >
      <img
        src={orderImg}
        alt="Online order"
        style={{ objectFit: "fill", height: "250px" }}
      />
      <Typography variant="h5">{order.name}</Typography>
      <StyledText>
        <b>Id:</b> {order.id}
      </StyledText>
      <StyledText>
        <b>Description: </b> {order.description}
      </StyledText>
      <StyledText>
        <b>Proposed Cost: </b>Rs. {order.cost / 100}
      </StyledText>
      <StyledText>
        <b>Order Status: </b>
        {order.orderStatus.toUpperCase()}
      </StyledText>
      <StyledText>
        <b>Proposed Time Period: </b>
        {order.allowedDays} days
      </StyledText>
      {order.orderStatus == "marked fulfilled" ? (
        <StyledText>
          <b>Completed date: </b>
          {order.completionDate}
        </StyledText>
      ) : (
        <></>
      )}
      <StyledText>
        <b>No. of bids: </b>
        {order.bids.length}
      </StyledText>

      {CheckIfCanResolve(order) && (
        <Box
          width="auto"
          alignSelf="flex-start"
          sx={{ display: "flex", gap: "3px" }}
        >
          <StyledButton onClick={() => markOrderPaid(order.id)}>
            Resolve Order
          </StyledButton>
        </Box>
      )}

      {CheckIfCanPay(order) && (
        <Box
          width="auto"
          alignSelf="flex-start"
          sx={{ display: "flex", gap: "3px" }}
        >
          <StyledButton onClick={() => markOrderPaid(order.id)}>
            Disburse Payment
          </StyledButton>
        </Box>
      )}

      {CheckIfCanAcceptOrDispute(order) && (
        <Box
          width="auto"
          alignSelf="flex-start"
          sx={{ display: "flex", gap: "3px" }}
        >
          <StyledButton onClick={() => verifyOrderCompletion(order.id)}>
            Verify Completion
          </StyledButton>
          <StyledButton
            style={{ backgroundColor: "red" }}
            onClick={() => raiseDispute(order.id)}
          >
            Dispute
          </StyledButton>
        </Box>
      )}

      {CheckIfCanComplete(order) ? <MarkCompletedButton /> : <></>}
      {CheckIfCanBid(order) ? (
        <CreateBidButton setModalOpen={setModalOpen} />
      ) : (
        ""
      )}
      {CheckIfCanRate(order) ? (
        <Box display="flex" gap={4} alignItems="center">
          <Typography variant="h6">Rate: </Typography>
          <Rating
            value={rating}
            onChange={(e) => setRating(e.value)}
            stars={10}
          />
          <StyledButton
            style={{ backgroundColor: "green" }}
            onClick={() => rateOrder(order.id, rating)}
          >
            Rate
          </StyledButton>
        </Box>
      ) : (
        <></>
      )}
      <CreateBidModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        orderId={order.id}
        bids={bids}
        setBids={setBids}
      />
      <Box alignSelf="flex-start">
        {bids.length > 0 ? (
          <Typography fontSize={22} fontWeight={600}>
            BIDS:
          </Typography>
        ) : (
          ""
        )}
        {bids.map((b) => (
          <BidComponent
            key={b.bidId}
            bid={b}
            orderStatus={order.orderStatus}
            order={order}
            recommendedBid={order.recommendedBid}
          />
        ))}
      </Box>
    </Box>
  );
}

function CheckIfCanAcceptOrDispute(order) {
  if (order.creatorId != getUserId()) return false;
  if (order.orderStatus != "marked fulfilled") return false;
  return true;
}

function CheckIfCanResolve(order) {
  if (order.orderStatus != "disputed") return false;
  if (getUserType() != "admin") return false;
  return true;
}

function CheckIfCanPay(order) {
  if (order.orderStatus != "completed") return false;
  if (getUserType() != "admin") return false;
  return true;
}

function CheckIfCanComplete(order) {
  if (order.orderStatus != "processing") return false;
  if (order.providerId != getUserId()) return false;
  return true;
}

function CheckIfCanBid(order) {
  // If not a ProviderHome, return false
  if (getUserType() != "provider") return false;
  //If order status is not created, return false
  if (order.orderStatus != "created") return false;
  //If created order has no bids, return true;
  if (order.bids.length == 0) return true;
  //Check if already bidded by the user
  if (order.bids.find((b) => b.bidderId == getUserId())) return false;
  return true;
}

function CheckIfCanRate(order) {
  if (getUserId() !== order.creatorId) {
    return false;
  }
  if (order.rated == true) return false;
  if (
    order.orderStatus != "completed" &&
    order.orderStatus != "marked fulfilled" &&
    order.orderStatus != "paid"
  ) {
    return false;
  }
  return true;
}

function CreateBidModal({ modalOpen, setModalOpen, orderId, bids, setBids }) {
  const handleSubmit = async (event) => {
    event.preventDefault();
    setModalOpen(false);
    const data = new FormData(event.target);
    let bid = Object.fromEntries(data);
    bid.ProposedAmount = parseInt(parseFloat(bid.ProposedAmount) * 100);
    bid.OrderId = orderId;
    let createdBid = await createBid(bid);
    //Create a bid and add it to bids list
    setBids([createdBid, ...bids]);
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: { xs: "90vw", sm: "70vw", md: 400 },
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    borderRadius: 10,
    p: 4,
  };
  return (
    <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
      <Box
        sx={style}
        display="flex"
        flexDirection="column"
        gap={3}
        component="form"
        onSubmit={handleSubmit}
      >
        <Typography variant="h5">Create Order</Typography>
        <Typography mb={1.2}>Proposed Amount:</Typography>
        <input
          id="Proposed Amount"
          name="ProposedAmount"
          style={{ padding: 15 }}
          type="number"
          step="0.01"
          placeholder="Proposed amount"
        />
        <TextField label="Description" multiline rows={4} name="comment" />

        <Button
          type="submit"
          variant="filled"
          sx={{ backgroundColor: "purple", color: "white", p: 1, fontSize: 16 }}
        >
          Create
        </Button>
      </Box>
    </Modal>
  );
}

function CreateBidButton({ setModalOpen }) {
  return (
    <Button
      onClick={() => setModalOpen(true)}
      startIcon={<Gavel />}
      sx={{
        alignSelf: "flex-start",
        paddingBlock: "10px",
        paddingInline: "20px",
        backgroundColor: "green",
        color: "white",
        borderRadius: 10,
        "&:hover": {
          backgroundColor: "purple",
        },
      }}
    >
      Create Bid
    </Button>
  );
}

function BidComponent({ bid, orderStatus, order, recommendedBid }) {
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  function handlePayClicked() {
    setPaymentModalOpen(true);
  }

  const isRecommended =
    getUserType() == "consumer" &&
    order.orderStatus == "created" &&
    bid.bidId == recommendedBid;
  return (
    <Box
      key={bid.bidId}
      borderColor={"brown"}
      border="solid"
      p={3}
      borderRadius={10}
      mb={2}
      bgcolor={isRecommended ? "green" : ""}
    >
      <Typography>
        Bidder:{" "}
        <Link
          style={{ textDecoration: "none", fontSize: "20px", color: "orange" }}
          to={`/provider/${bid.bidderId}`}
        >
          Click for bidder details
        </Link>
      </Typography>
      <Typography>Proposed Amount: Rs. {bid.proposedAmount / 100}</Typography>
      <Typography>Comments: {bid.comment}</Typography>
      <Typography>Status: {bid.bidStatus.toUpperCase()}</Typography>

      {orderStatus == "created" && order.creatorId == getUserId() ? (
        <Button
          onClick={handlePayClicked}
          variant="filled"
          sx={{
            backgroundColor: isRecommended ? "black" : "green",
            color: "white",
            "&:hover": {
              backgroundColor: "purple",
            },
          }}
        >
          Accept Bid
        </Button>
      ) : (
        ""
      )}

      <PaymentModal
        modalOpen={paymentModalOpen}
        setModalOpen={setPaymentModalOpen}
        orderId={order.id}
        bidId={bid.bidId}
      />
    </Box>
  );
}

function PaymentModal({ modalOpen, setModalOpen, orderId, bidId }) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    borderRadius: 10,
    p: 4,
  };

  async function handleKhaltiPayment() {
    var url = await GetPaymentUrl(orderId, bidId, "khalti");
    setModalOpen(false);
    const newWindow = window.open(url, "_blank");
    if (newWindow) newWindow.opener = null;
    console.log(url);
  }

  async function handleStripePayment() {
    var url = await GetPaymentUrl(orderId, bidId, "stripe");
    setModalOpen(false);
    const newWindow = window.open(url, "_blank");
    if (newWindow) newWindow.opener = null;
    console.log(url);
  }

  return (
    <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
      <Box
        sx={style}
        display="flex"
        flexDirection="column"
        gap={3}
        width="40vw"
      >
        <Button
          onClick={handleKhaltiPayment}
          sx={{
            backgroundColor: "#6b516b",
            color: "white",
            "&:hover": {
              backgroundColor: "lightblue",
            },
          }}
        >
          <img
            src="https://seeklogo.com/images/K/khalti-logo-F0B049E67E-seeklogo.com.png"
            alt="Khalti logo"
            width="100px"
            height="50px"
            style={{
              objectFit: "contain",
            }}
          />
          <Box width={20}></Box>
          <Typography variant="button">Pay with Khalti</Typography>
        </Button>
        <Button
          onClick={handleStripePayment}
          sx={{
            backgroundColor: "gray",
            color: "white",
            "&:hover": {
              backgroundColor: "purple",
            },
          }}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/2560px-Stripe_Logo%2C_revised_2016.svg.png"
            alt="Stripe logo"
            width="100px"
            height="50px"
            style={{
              objectFit: "contain",
            }}
          />
          <Box width={20}></Box>
          <Typography variant="button">Pay with Stripe</Typography>
        </Button>
      </Box>
    </Modal>
  );
}

export default Order;
