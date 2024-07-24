import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { CreateOrder } from "../../api/orders";

/* eslint-disable react/prop-types */
const OrderCreateModal = ({ modalOpen, setModalOpen, addOrder }) => {
  //Handle the order creation submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setModalOpen(false);
    const data = new FormData(event.target);
    let order = Object.fromEntries(data);
    order.Cost = parseInt(parseFloat(order.Cost) * 100);
    order.AllowedDays = parseInt(order.AllowedDays);
    let newOrder = await CreateOrder(order);
    addOrder(newOrder);
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
        <TextField label="title*" variant="outlined" name="Name" />
        <TextField label="Description" multiline rows={4} name="Description" />
        <Typography mb={1.2}>Preferred days to complete:</Typography>
        <input
          id="AllowedDays"
          name="AllowedDays"
          style={{ padding: 15 }}
          type="number"
          placeholder="Preferred days"
        />
        <Typography mb={1.2}>Budget (in Rs.):</Typography>
        <input
          style={{ padding: 15 }}
          type="number"
          placeholder="Budget*"
          name="Cost"
          step="0.01"
        />
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
};

export default OrderCreateModal;
