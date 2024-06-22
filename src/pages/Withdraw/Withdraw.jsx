import React, { useState } from "react";
import { Button, Container, TextField, styled } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useApiContext } from "../../context/ApiContext";
import { EuroSymbol } from "@mui/icons-material";
const StyledContainer = styled(Container)({
  minHeight: "100vh",
  color: "white",
  padding: "20px",
});

const Withdraw = () => {
  const navigate = useNavigate();
  const { Users, updateUser } = useApiContext();
  const { id } = useParams();
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleWithdraw = async () => {
    const withdrawalAmount = parseFloat(amount);
    if (isNaN(withdrawalAmount) || withdrawalAmount <= 0) {
      setError("Please enter a valid positive number.");
      return;
    }

    try {
      const currentUser = Users.find((value) => value.id === id);
      if (!currentUser) {
        setError("User not found.");
        return;
      }
      if (currentUser.deposit - withdrawalAmount < -currentUser.credit) {
        setError("You are out of credit");
        return;
      }
      const updatedUser = {
        ...currentUser,
        deposit: currentUser.deposit - withdrawalAmount,
      };

      await updateUser(updatedUser);
      setSuccessMessage(
        `Successfully withdrawn ${withdrawalAmount} from deposit.`
      );
      setAmount("");
      setError("");
      setTimeout(() => {
        setSuccessMessage("");
      }, 2000);
      navigate("/");
    } catch (error) {
      setError("Failed to withdraw. Please try again later.");
    }
  };

  return (
    <StyledContainer>
      <h1 style={{ color: "white" }}>Withdraw from Deposit</h1>
      <TextField
        label="Amount to Withdraw"
        type="number"
        fullWidth
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        error={!!error}
        helperText={error}
        InputLabelProps={{
          shrink: true,
          style: { color: "white" },
        }}
        sx={{
          "& .MuiInputBase-input": {
            color: "white",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "white",
          },
        }}
        variant="outlined"
        margin="normal"
      />
      <Button
        variant="contained"
        color="secondary"
        onClick={handleWithdraw}
        disabled={!amount}
        sx={{
          color: "white",
          backgroundColor: "#6A1B9A",
          borderColor: "#6A1B9A",
          "&:hover": {
            backgroundColor: "#9c4dcc",
          },
        }}
      >
        <EuroSymbol /> Withdraw
      </Button>
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
    </StyledContainer>
  );
};

export default Withdraw;
