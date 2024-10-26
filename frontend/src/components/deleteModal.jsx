import React from "react";
import { Button, Dialog, DialogContent, DialogActions, Typography } from "@mui/material";
const DeleteModal = ({ isOpen, toggle, onDelete }) => {

  return (
    <Dialog open={isOpen} onClose={toggle} fullWidth>
      <DialogContent>
        <Typography variant="h6">Are You Sure</Typography>
      </DialogContent>
      <DialogActions style={{ justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            onDelete();
            toggle();
          }}
        >
          yes
        </Button>
        <Button variant="contained" color="secondary" onClick={toggle}>
         cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteModal;
