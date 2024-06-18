import Box from "@mui/material/Box";
import React from "react";
import CoverSample from "../../assets/images/sample_cover_image.png";
import BasicAvatar from "./user/BasicAvatar/BasicAvatar";
import MoreOptions from "@mui/icons-material/MoreVert";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

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
      sx={{}}>
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
              <BasicAvatar
                firstName={author}
                lastName=''
              />
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
                    // width: "100%",
                    // height: "18px",
                    // overflow: "hidden",
                    textOverflow: "ellipsis",
                    // // display: "-webkit-box",
                    // // WebkitBoxOrient: "vertical",
                    // // WebkitLineClamp: "1",
                    lineHeight: "18px", //
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
    // <>
    //   <div className='col-12 col-sm-6 col-md-4 col-lg-3'>
    //     {/* <Link to='/'> */}
    //     <div className='container py-3 my-2 border border-primary bg-light'>
    //       <div className='row'>
    //         <div className='col col-11'>
    //           <div className='row border border-primary p-1 bg-white mx-1 h4'>{title}</div>
    //           <div className='row border border-primary p-1 bg-white mx-1 lead'>{author}</div>
    //           <div className='row'>
    //             <div className='col-4 px-1 mx-3 border small rounded w-auto bg-warning'>
    //               {genre}
    //             </div>
    //           </div>
    //         </div>
    //         <div className='col col-1'>
    //           {isBookmarked && <div className='text-warning'>&#128952;</div>}
    //         </div>
    //       </div>
    //       <div className='row'>
    //         <div className='col p-4'>
    //           <div className='row border border-secondary p-1 bg-white small'>{summary}</div>
    //         </div>
    //         <div className='col p-4'>
    //           <div className='row border border-secondary p-1 bg-white'>{image}</div>
    //         </div>
    //       </div>
    //       <div className='row justify-content-end'>
    //         <div className='col-6 w-auto'>
    //           <Link to={`../cover-details/${cover_id}`}>
    //             <button>Details -{">"}</button>
    //           </Link>
    //         </div>
    //       </div>
    //     </div>
    //     {/* </Link> */}
    //   </div>
    // </>
  );
};

export default CoverCard;
