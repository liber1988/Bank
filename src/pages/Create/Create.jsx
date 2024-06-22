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
function Create() {
  return (
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
          onChange={(e) => setNewUser({ ...newUser, deposit: e.target.value })}
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
  );
}
export default Create;
