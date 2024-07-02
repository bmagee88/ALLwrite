import Box from "@mui/material/Box";
import React from "react";
import CoverSample from "../../assets/images/sample_cover_image.png";
// import BasicAvatar from "./user/BasicAvatar/BasicAvatar";
import MoreOptions from "@mui/icons-material/MoreVert";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import AuthorAvatar from "./user/NamedColoredAvatar/NamedColoredAvatar";

interface CoverCardProps {
  cover_id: number;
  title: string;
  author: string;
  genre: string;
  summary: string;
  image: string;
  isBookmarked: boolean;
}

const CoverCard: React.FC<CoverCardProps> = ({
  cover_id,
  title,
  author,
  genre,
  summary,
  image,
  isBookmarked,
}) => {
  return (
    <Box
      id='container'
      // sx={{ padding: "0" }}
    >
      <Box
        sx={{ display: "flex", flexDirection: "column", marginTop: "1rem", marginBottom: "1rem" }}>
        <Link to={`/dashboard/cover-details/${cover_id}`}>
          <Box
            id='image'
            sx={{
              height: "200px",
              overflow: "hidden",
            }}>
            <Box
              component='img'
              sx={{ width: "100%", height: "100%", objectFit: "cover" }}
              src={CoverSample}
            />
          </Box>
        </Link>

        <Box
          id='cover-details'
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: ".25rem",
            paddingRight: ".5rem",
          }}>
          <Link
            to={`/dashboard/profile/${1}`}
            // author id needed TODO
            style={{ textDecoration: "none", color: "inherit" }}>
            <Box
              id='author'
              sx={{ paddingLeft: ".4rem", marginTop: ".2rem" }}>
              <AuthorAvatar name={author} />
              {/* <BasicAvatar
                firstName={author}
                lastName=''
              /> */}
            </Box>
          </Link>
          <Box
            id='details'
            sx={{
              display: "flex",
              flexDirection: "column",
              flexGrow: "1",
              marginTop: ".2rem",
              paddingLeft: ".5rem",
              paddingTop: ".25rem",
            }}>
            <Link
              to={`/dashboard/cover-details/${cover_id}`}
              style={{ textDecoration: "none", color: "inherit" }}>
              <Box
                id='title'
                sx={{ lineHeight: "14px", fontWeight: "bold" }}>
                {title}
              </Box>
            </Link>
            <Box id='stats'>
              <Link
                to={`/dashboard/cover-details/${cover_id}`}
                style={{ textDecoration: "none", color: "inherit" }}>
                <Box
                  id='summary'
                  sx={{
                    textOverflow: "ellipsis",
                    lineHeight: "18px",
                  }}>
                  {summary}
                </Box>
              </Link>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}>
                <Box
                  id='rating'
                  sx={{ display: "flex" }}>
                  <Typography
                    component='span'
                    id='rating-number'
                    sx={{ paddingRight: ".35rem", alignSelf: "center" }}>
                    4.2
                  </Typography>
                  <StarOutlinedIcon color='warning' />
                  <StarOutlinedIcon color='warning' />
                  <StarOutlinedIcon color='warning' />
                  <StarOutlinedIcon color='warning' />
                  <StarOutlineIcon color='warning' />
                  <Typography
                    component='span'
                    id='rating-number'
                    sx={{ paddingLeft: ".15rem", alignSelf: "center" }}>
                    (32)
                  </Typography>
                </Box>
                <Box id='pages'>
                  <AutoStoriesIcon /> 127 (52){" "}
                  {/**TODO how to indicate that these numbers represent total number of pages and longest story*/}
                </Box>
              </Box>
            </Box>
          </Box>
          <Box>
            <MoreOptions />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CoverCard;
