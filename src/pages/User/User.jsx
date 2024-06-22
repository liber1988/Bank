import React, { useState } from "react";
import {
  Button,
  Container,
  List,
  Grid,
  useMediaQuery,
  useTheme,
  styled,
} from "@mui/material";
import SearchBar from "./Searchbar";
import { useApiContext } from "../../context/ApiContext";
import { useNavigate } from "react-router-dom";

const StyledContainer = styled(Container)(({ theme }) => ({
  minHeight: "100vh",
  color: "white",
  padding: "20px",
  [theme.breakpoints.down("sm")]: {
    padding: "10px",
  },
}));

const StyledList = styled(List)({
  color: "white",
});

const User = () => {
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const { Users, deleteUserData } = useApiContext();
  const items = Users.map((value) => value.passportid);

  const handleSearch = (query) => {
    const results = items.filter((item) =>
      item.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(results);
    setSearched(true);
  };

  const handleClickOpen = () => {};
  const handleDeleteUsers = () => {
    const delUser = Users.find((user) => user.passportid === searchResults[0]);
    deleteUserData(delUser);
  };
  const handleWithdrawUser = () => {
    const user = Users.find((user) => user.passportid === searchResults[0]);
    navigate("/withdraw/" + user.id);
  };
  const handleUpdateUser = () => {
    const user = Users.find((user) => user.passportid === searchResults[0]);
    navigate("/update/" + user.id);
  };

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const selectedUsers = [];

  const handleDepositUsers = () => {
    const user = Users.find((user) => user.passportid === searchResults[0]);
    navigate("/deposit/" + user.id);
  };
  return (
    <StyledContainer>
      <h1>Search User Id</h1>
      <SearchBar onSearch={handleSearch} />
      <StyledList>
        {searched && searchResults.length > 0 ? (
          <Grid
            container
            spacing={2}
            direction={isSmallScreen ? "column" : "row"}
          >
            <Grid item xs={12} sm={6} md={4}>
              <Button
                variant="contained"
                color="error"
                fullWidth
                onClick={handleDeleteUsers}
              >
                Delete User
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={handleWithdrawUser}
              >
                Withdraw
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={handleDepositUsers}
              >
                Deposit
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={handleUpdateUser}
              >
                Update
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={handleDeleteUsers}
              >
                Transfer
              </Button>
            </Grid>
          </Grid>
        ) : searched ? (
          <p>There is no such Id</p>
        ) : null}
      </StyledList>
    </StyledContainer>
  );
};

export default User;
