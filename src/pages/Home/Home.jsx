import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useApiContext } from "../../context/ApiContext";
import MUIDataTable from "mui-datatables";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "./Home.css";
import { EuroSymbol } from "@mui/icons-material";

function Home() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    image: "",
    name: "",
    deposit: "",
    gender: "",
    email: "",
    credit: "",
    age: "",
    passportid: "",
  });
  const [selectedUsers, setSelectedUsers] = useState([]);

  const {
    Users,
    deleteUserData,
    getUser,
    updateUser,
    errorMessage,
    isLoading,
    catchUser,
  } = useApiContext();

  const columns = [
    {
      name: "image",
      label: "Profile",
      options: {
        customBodyRender: (value) => {
          return (
            <img src={value} alt="pic" className="w-12 h-12 rounded-full p-3" />
          );
        },
      },
    },
    { name: "Name" },
    {
      name: "Deposit",
      options: {
        customBodyRender: (value) => {
          const numericValue = parseInt(value);
          console.log(typeof numericValue);
          if (!isNaN(numericValue)) {
            return (
              <div className={`pos`}>
                <p
                  className={`capitalize px-3 py-1 inline-block rounded-full ${
                    numericValue < 0 ? "bg-red" : "bg-blue"
                  }`}
                >
                  {value}
                </p>
                <EuroSymbol style={{ fontSize: 16 }} />
              </div>
            );
          } else {
            return <p>Invalid Value</p>;
          }
        },
      },
    },
    { name: "Gender" },
    { name: "E-mail" },
    { name: "Credit allowed" },
    { name: "Age" },
    { name: "Passport ID" },
  ];

  const data = Users.map((user) => [
    user.image,
    user.name,
    user.deposit,
    user.gender,
    user.email,
    user.credit,
    user.age,
    user.passportid,
  ]);

  const options = {
    selectableRows: "none",
    onRowClick: (rowData, rowMeta) => {
      const selectedIndex = selectedUsers.findIndex(
        (user) => user.name === rowData[1]
      );
      let newSelected = [];

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(
          selectedUsers,
          Users[rowMeta.dataIndex]
        );
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selectedUsers.slice(1));
      } else if (selectedIndex === selectedUsers.length - 1) {
        newSelected = newSelected.concat(selectedUsers.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selectedUsers.slice(0, selectedIndex),
          selectedUsers.slice(selectedIndex + 1)
        );
      }

      setSelectedUsers(newSelected);
    },
    elevation: 0,
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 10, 15, 20],
    setRowProps: (row, dataIndex, rowIndex) => {
      const isSelected = selectedUsers.some((user) => user.name === row[1]);
      return {
        style: {
          color: isSelected ? "white" : "inherit",
          backgroundColor: isSelected ? "#2c3e50" : "inherit",
          position: "relative",
        },
        className: isSelected ? "selected-row" : "",
      };
    },
  };

  const getMuiTheme = () =>
    createTheme({
      typography: {
        fontFamily: "Poppins",
      },
      palette: {
        background: {
          paper: "#1e293b",
          default: "#0f172a",
        },
        mode: "dark",
      },
      components: {
        MuiTableCell: {
          styleOverrides: {
            head: {
              padding: "10px 4px",
            },
            body: {
              padding: "7px 15px",
              color: "#e2e8f0",
            },
          },
        },
      },
    });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddUser = () => {
    console.log("iwas here");
    catchUser(newUser);
    setNewUser({
      image: "",
      name: "",
      deposit: "",
      gender: "",
      email: "",
      credit: "",
      age: "",
      passportid: "",
    });
    setOpen(false);
  };

  const handleDeleteUsers = () => {
    selectedUsers.forEach((user) => deleteUserData(user));
    setSelectedUsers([]);
  };
  const handleUpdateUser = () => {
    selectedUsers.forEach((user) => {
      navigate("/update/" + user.id);
    });
  };
  const handleWithdrawUser = () => {
    selectedUsers.forEach((user) => {
      navigate("/withdraw/" + user.id);
    });
  };
  const handleDepositUsers = () => {
    selectedUsers.forEach((user) => {
      navigate("/deposit/" + user.id);
    });
  };
  const handleTransferUsers = () => {
    selectedUsers.forEach((user) => {
      navigate("/transfer/" + user.id);
    });
  };
  return (
    <div className="bg-slate-700 py-10 min-h-screen grid place-items-center">
      <h1>User Data Table</h1>
      <div className="btn-classes">
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          Add User
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={handleDeleteUsers}
          disabled={selectedUsers.length === 0}
        >
          Delete User
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleWithdrawUser}
          disabled={selectedUsers.length === 0 || selectedUsers.length > 1}
        >
          Withdraw
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleDepositUsers}
          disabled={selectedUsers.length === 0 || selectedUsers.length > 1}
        >
          Deposit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleUpdateUser}
          disabled={selectedUsers.length === 0 || selectedUsers.length > 1}
        >
          Update
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleTransferUsers}
          disabled={selectedUsers.length === 0 || selectedUsers.length > 1}
        >
          Transfer
        </Button>
      </div>
      <ThemeProvider theme={getMuiTheme()}>
        <MUIDataTable
          title={"Bank Users List"}
          data={data}
          columns={columns}
          options={options}
        />
      </ThemeProvider>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Image URL"
            type="url"
            fullWidth
            value={newUser.image}
            onChange={(e) => setNewUser({ ...newUser, image: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Deposit"
            type="number"
            fullWidth
            value={newUser.deposit}
            onChange={(e) =>
              setNewUser({ ...newUser, deposit: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Gender"
            type="text"
            fullWidth
            value={newUser.gender}
            onChange={(e) => setNewUser({ ...newUser, gender: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Credit allowed"
            type="text"
            fullWidth
            value={newUser.credit}
            onChange={(e) => setNewUser({ ...newUser, credit: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Age"
            type="number"
            fullWidth
            value={newUser.age}
            onChange={(e) => setNewUser({ ...newUser, age: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Passport ID"
            type="text"
            fullWidth
            value={newUser.passportid}
            onChange={(e) =>
              setNewUser({ ...newUser, passportid: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddUser} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <Link to="/" className="back">
        Back
      </Link>
    </div>
  );
}

export default Home;
