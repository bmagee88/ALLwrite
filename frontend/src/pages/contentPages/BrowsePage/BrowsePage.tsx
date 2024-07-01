import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TitleCard from "../../../common/components/CoverCard";
import { Box, Button, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../common/store/store";
import ScrollableTagsContainer, {
  Tag,
} from "../../../common/components/ScrollableTags/ScrollableTags";

const tags: Tag[] = [
  "Genre1",
  "Genre1",
  "Genre1",
  "Genre1",
  "Genre1",
  "Genre1",
  "Genre1",
  "Genre1",
  "Genre1",
  "Genre1",
  "Genre1",
  "Genre1",
  "Genre1",
];

export interface Cover {
  cover_id: number;
  title: string;
  author: string;
  genre: string;
  summary: string;
  image_url: string;
  booked: boolean;
  first_page?: string;
}

interface Bookmark {
  bm_cover_id: string;
}

const BrowsePage: React.FC = () => {
  const [limit, setLimit] = useState<number>(3);
  const [covers, setCovers] = useState<Cover[]>([]);

  const ADD_AMOUNT = 3;
  const ACTIVE_USER_ID = useSelector((state: RootState) => state.user.user?.user_id) || 0;

  useEffect(() => {
    const outer_stuff = async () => {
      let bms_outer: Bookmark[] = [],
        tits_outer: Cover[] = [];
      const fetchBookmarksByUser = async (user_id: number) => {
        console.log("in bookmarks by user on browse page");
        const response = await fetch(`/api/cover/bookmarks/${user_id}`);
        const bms = await response.json();
        console.log("bms", bms);
        bms_outer = bms.data;
      };
      await fetchBookmarksByUser(ACTIVE_USER_ID);

      const fetchTitles = async (limit: number) => {
        console.log("getching from api cover covers");
        const response = await fetch(`/api/cover/covers?limit=${limit}`);
        const covers = await response.json();
        console.log("covers", covers);
        tits_outer = covers.data;
      };
      await fetchTitles(limit);

      const addBookMarksToTitles = async (t: Cover[], b: Bookmark[]) => {
        console.log("in add bookmarks to titles on browse page");
        var found = false;
        const innerf = async () => {
          for (var i = 0; i < t.length; i++) {
            found = false;
            for (var j = 0; j < b.length; j++) {
              if (t[i].cover_id === parseInt(b[j].bm_cover_id)) {
                found = true;
                break;
              }
            }
            found === true ? (t[i].booked = true) : (t[i].booked = false);
          }
          setCovers(t);
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
    setLimit((limit) => limit + amt);
  };

  return (
    <Box>
      <Box sx={{ paddingLeft: ".5rem", paddingTop: ".5rem" }}>
        <Typography fontSize={20}>Explore</Typography>
      </Box>

      <Box>
        <ScrollableTagsContainer tags={tags} />
      </Box>

      <Box
        sx={{
          "@media (min-width: 500px)": {
            padding: "1.5rem",
          },
        }}>
        <div className='row justify-content-end'>
          <Box className='col-6 w-auto'>
            {ACTIVE_USER_ID !== 0 && (
              <Link to='../create-cover'>
                <Button variant='contained'>Add</Button>
              </Link>
            )}
          </Box>
        </div>
        <Box
          className='row'
          sx={{ marginTop: ".5rem" }}>
          {covers.map((cover: Cover, index) => {
            return (
              <TitleCard
                key={index}
                cover_id={cover.cover_id}
                title={cover.title}
                author={cover.author}
                genre={cover.genre}
                summary={cover.summary.slice(0, 75) + "..."}
                image={cover.image_url}
                isBookmarked={cover.booked}
              />
            );
          })}
        </Box>
      </Box>
      <div className='row'>
        <Button onClick={() => addItems(ADD_AMOUNT)}> load {ADD_AMOUNT} more</Button>
      </div>
    </Box>
  );
};

export default BrowsePage;
