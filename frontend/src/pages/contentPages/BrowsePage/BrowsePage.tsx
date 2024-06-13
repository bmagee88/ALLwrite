import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TitleCard from "../../../common/components/TitleCard";
import { Box, Button, Typography } from "@mui/material";
import ControlPanel from "../../../common/components/ControlPanel/ControlPanel";
import { useSelector } from "react-redux";
import { RootState } from "../../../common/store/store";

const BrowsePage = () => {
  const [titles, setTitles] = useState([]);
  const [limit, setLimit] = useState(3);
  // const [bookmarks, setBookmarks] = useState([]);
  // const [isBooked, setIsBooked] = useState(false);

  const ADD_AMOUNT = 3;
  const ACTIVE_USER_ID = useSelector((state: RootState) => state.user.user.user_id) || 0;

  useEffect(() => {
    const outer_stuff = async () => {
      var bms_outer, tits_outer;
      const fetchBookmarksByUser = async (user_id: number) => {
        const response = await fetch(`http://localhost:8000/bookmarks/${user_id}`);
        const bms = await response.json();
        // console.log("bms", bms);
        bms_outer = bms.data;
        // setBookmarks(() => bms.data);
      };
      await fetchBookmarksByUser(ACTIVE_USER_ID);

      const fetchTitles = async (limit: number) => {
        const response = await fetch(`http://localhost:8000/covers?limit=${limit}`);
        const tits = await response.json();
        // console.log("tits", tits);
        tits_outer = tits.data;
        // console.log("tits outer inside", tits_outer); //works
        // setTitles(() => tits.data);
      };
      await fetchTitles(limit);

      const addBookMarksToTitles = async (t, b) => {
        var found = false;
        // console.log("in addbookmakrs to titles");
        const innerf = async () => {
          // console.log("first line in anon");
          for (var i = 0; i < t.length; i++) {
            found = false;
            for (var j = 0; j < b.length; j++) {
              // console.log(
              //   "comparing",
              //   t[i].cover_id,
              //   "to",
              //   parseInt(b[j].bm_cover_id)
              // );
              if (t[i].cover_id === parseInt(b[j].bm_cover_id)) {
                found = true;
                break;
              }
              // t[i].booked = t[i].cover_id === b[j].bm_cover_id ? true : false;
            }
            found === true ? (t[i].booked = true) : (t[i].booked = false);
          }
          // console.log("t", t);
          setTitles(() => t);
          // console.log("titles", titles);
        };
        innerf();
      };
      await addBookMarksToTitles(tits_outer, bms_outer);
    };
    outer_stuff();
  }, [limit, ACTIVE_USER_ID]);

  // useEffect(() => {
  //   const fetchBookmarksByUser = async (user_id) => {
  //     const response = await fetch(
  //       `http://localhost:8000/bookmarks/${user_id}`
  //     );
  //     //   setTitles(testListOfTitles.slice(0, limit));
  //     const bms = await response.json();
  //     console.log("bms", bms);
  //     // remove records where bookmarked = true and user != current user.
  //     setBookmarks(() => bms.data);
  //   };
  //   fetchBookmarksByUser(ACTIVE_USER_ID);
  // }, []);

  const addItems = (amt: number) => {
    // console.log(limit + amt);
    setLimit((limit) => limit + amt);
  };

  return (
    <Box>
      {/* <button onClick={() => printCovers()}>hgfjhgjhg</button> */}
      {/** put here the control panel for signed in users */}
      {/* <Divider sx={{ marginY: ".5rem" }} /> */}
      <Box sx={{ paddingLeft: ".5rem", paddingTop: ".5rem" }}>
        <Typography
          fontSize={20}
          // fontWeight={"bold"}
        >
          Explore
        </Typography>
      </Box>

      <Box
        sx={{
          "@media (min-width: 500px)": {
            padding: "1.5rem",
          },
        }}>
        <div className='row justify-content-end'>
          <div className='col-6 w-auto'>
            {ACTIVE_USER_ID !== null && (
              <Link to='/create-cover'>
                <Button variant='contained'>Add</Button>
              </Link>
            )}
          </div>
        </div>
        <div className='row'>
          {titles.map((item, index) => {
            return (
              <TitleCard
                key={index}
                cover_id={item.cover_id}
                title={item.title}
                author={item.author}
                genre={item.genre}
                summary={item.summary.slice(0, 75) + "..."}
                image={item.image_url}
                isBookmarked={item.booked}
              />
            );
          })}
        </div>
      </Box>
      <div className='row'>
        <Button onClick={() => addItems(ADD_AMOUNT)}> load {ADD_AMOUNT} more</Button>
      </div>
    </Box>
  );
};

export default BrowsePage;