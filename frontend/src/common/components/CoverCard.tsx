import Box from "@mui/material/Box";
import React from "react";
import { Link } from "react-router-dom";
import CoverSample from "../../assets/images/sample_cover_image.png";
import BasicAvatar from "./user/BasicAvatar/BasicAvatar";
import MoreOptions from "@mui/icons-material/MoreVert";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import ScrollableTagsContainer, { Tag } from "./ScrollableTags/ScrollableTags";

const tags: Tag[] = [
  "first",
  "second",
  "third",
  "fourth",
  "fifth",
  "sixth",
  "seventh",
  "either",
  "ninth",
  "tenth",
  "eleventh",
  "twelf",
  "tirteen",
];

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
      <Box sx={{ display: "flex", flexDirection: "column" }}>
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
        <Box
          id='cover-details'
          sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box
            id='author'
            sx={{ padding: ".2rem" }}>
            <BasicAvatar
              firstName={author}
              lastName=''
            />
          </Box>
          <Box
            id='details'
            sx={{ display: "flex", flexDirection: "column", flexGrow: "1", marginTop: ".2rem" }}>
            <Box
              id='title'
              sx={{ lineHeight: "14px" }}>
              {title}
            </Box>
            <Box id='stats'>
              <Box
                id='summary'
                sx={
                  {
                    // width: "100%",
                    // height: "18px",
                    // overflow: "hidden",
                    // textOverflow: "ellipsis",
                    // // display: "-webkit-box",
                    // // WebkitBoxOrient: "vertical",
                    // // WebkitLineClamp: "1",
                    // lineHeight: "16px",//
                  }
                }>
                {summary}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                }}>
                <Box id='rating'>
                  {" "}
                  <StarOutlinedIcon color='warning' />
                  <StarOutlinedIcon color='warning' />
                  <StarOutlinedIcon color='warning' />
                  <StarOutlinedIcon color='warning' />
                  <StarOutlineIcon color='warning' />
                  (32)
                </Box>
                <Box id='pages'>
                  <AutoStoriesIcon /> 2567 (2367)
                </Box>
                <Box>
                  <ScrollableTagsContainer tags={tags} />
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
