import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Typography } from "@mui/material";

export const LeavingPopup = ({
  showDialog,
  setShowDialog,
  cancelNavigation,
  confirmNavigation
}) => {
  const handleDialogClose = () => {
    setShowDialog(false);
  };

  return (
    <Dialog fullWidth open={showDialog} onClose={handleDialogClose}>
      <DialogTitle>Leaving Page</DialogTitle>
      <DialogContent>
        <Typography>Form has been modified. You will loose your unsaved changes. Are you sure you want to close this form?</Typography>
        
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={cancelNavigation}>
          No
        </Button>
        <Button variant="contained" onClick={confirmNavigation}>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};
