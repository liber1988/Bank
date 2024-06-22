import React from "react";
import { Container, Box, Typography, Button } from "@mui/material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const navigate = useNavigate();
  const userClick = (event) => {
    event.preventDefault();
    navigate("/user");
  };
  const userPanelClick = (event) => {
    event.preventDefault();
    navigate("/userspanel");
  };
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: "-5%",
        height: "100vh",
        textAlign: "center",
        color: "white",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          color: "white",
        }}
      >
        <AccountBalanceIcon sx={{ fontSize: 100, mb: 2 }} />
        <Typography variant="h2" sx={{ mb: 4 }}>
          Welcome to My Bank
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={(event) => userClick(event)}
          >
            User
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={(event) => userPanelClick(event)}
          >
            Users Panel
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default MainPage;
