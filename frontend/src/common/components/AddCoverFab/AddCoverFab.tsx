import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import React from "react";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

interface AddCoverFabProps {
  activeUserId: number;
}

const AddCoverFab: React.FC<AddCoverFabProps> = ({ activeUserId }) => {
  return (
    <>
      {activeUserId !== 0 && (
        <Box sx={{ position: "fixed", right: "1.5rem", bottom: "3.25rem" }}>
          <Link to='/dashboard/create-cover'>
            <Fab
              color='primary'
              aria-label='add'>
              <AddIcon />
            </Fab>
          </Link>
        </Box>
      )}
    </>
  );
};

export default AddCoverFab;
