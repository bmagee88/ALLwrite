import { Box, Button, InputAdornment, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";

const HeaderSearch = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    handleResize(); // Check on initial render

    window.addEventListener("resize", handleResize);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isSmall = screenWidth > 337;

  return (
    <Box sx={{ alignSelf: "end", flexGrow: "1" }}>
      <TextField
        id='search-field'
        fullWidth
        size='small'
        variant='outlined'
        label={isSmall ? "Search" : ""}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <Link to={"/"}>
                <SearchIcon />
              </Link>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default HeaderSearch;
