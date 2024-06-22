import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useApiContext } from "../../context/ApiContext";
import { useParams, useNavigate } from "react-router-dom";

const Update = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { Users, updateUser } = useApiContext();
  const [open, setOpen] = useState(true);

  const userToUpdate = Users.find((user) => user.id === id);

  const [newUser, setNewUser] = useState(
    userToUpdate || {
      id: "",
      image: "",
      name: "",
      deposit: 0,
      gender: "",
      email: "",
      credit: "",
      age: 0,
      passportid: "",
    }
  );

  const handleClose = () => {
    setOpen(false);
    navigate("/userspanel");
  };

  const handleUpdateUser = () => {
    updateUser(newUser).then(() => {
      setOpen(false);
    });
    navigate("/userspanel");
  };

  useEffect(() => {
    setNewUser(
      userToUpdate || {
        id: "", // Set default values or handle accordingly
        image: "",
        name: "",
        deposit: 0,
        gender: "",
        email: "",
        credit: "",
        age: 0,
        passportid: "",
      }
    );
  }, [userToUpdate]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Update User</DialogTitle>
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
            setNewUser({ ...newUser, deposit: Number(e.target.value) })
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
          onChange={(e) =>
            setNewUser({ ...newUser, age: Number(e.target.value) })
          }
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
        <Button onClick={handleUpdateUser} color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Update;
