import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../common/store/store";
import { Cover } from "./BrowsePage/BrowsePage";
import Button from "@mui/material/Button";
import { Box, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CoverSample from "../../assets/images/sample_cover_image.png";

const CoverDetails: React.FC = () => {
  const { cover_id: x } = useParams();
  const cover_id = parseInt(x || "-1");
  const [cover, setCover] = useState<Cover>({} as Cover);
  const navigate = useNavigate();
  const GET_COVER_ENDPOINT = `/api/cover/cover-details/`;

  const ACTIVE_USER_ID = useSelector((state: RootState) => state.user.user?.user_id);

  useEffect(() => {
    const fetchCover = async () => {
      const response = await fetch(GET_COVER_ENDPOINT + cover_id);
      const data = await response.json();
      const cover = data.data[0] as Cover;
      setCover(cover);
    };
    fetchCover();
  }, [GET_COVER_ENDPOINT, cover_id]);

  const handleClick = () => {
    if (ACTIVE_USER_ID) {
      navigate(`/dashboard/reading/${cover.title}/${cover.first_page}`);
    } else {
      navigate(`/login`);
    }
  };

  return (
    <>
      <Box className='container'>
        <Box className='row'>
          <Box className='col'>
            <Box
              component='img'
              sx={{ width: "100%", height: "100%", objectFit: "cover" }}
              src={CoverSample}
            />
          </Box>
        </Box>
        <Box className='row'>
          <Box className='col'>{cover.title}</Box>
        </Box>
        <Box className='row'>
          <Box className='col'>by {cover.author}</Box>
        </Box>
        <Box className='row'>
          <Box className='col'>{cover.genre}</Box>
        </Box>
        <Box className='row'>
          <Box className='col'>{cover.summary}</Box>
        </Box>
        <Button
          sx={{ alignItems: "center" }}
          variant={"contained"}
          onClick={handleClick}>
          <Typography>Open</Typography>
          <ArrowForwardIcon />
        </Button>
      </Box>
    </>
  );
};

export default CoverDetails;
