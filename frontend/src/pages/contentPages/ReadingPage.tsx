import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ChoiceCard from "../../common/components/ChoiceCard";
import Rating from "../../common/components/Rating";
import { v4 as uuidv4 } from "uuid";
import Read from "../../assets/images/read.png";
import { RootState } from "../../common/store/store";
import { useDispatch, useSelector } from "react-redux";
import { Cover } from "./BrowsePage/BrowsePage";
import { setCoverId } from "../../common/store/cover/coverSlice";
import Bookmark from "../../common/components/Bookmark/Bookmark";
import Box from "@mui/material/Box";
import { Input, TextField, Typography } from "@mui/material";
import Pin from "../../common/components/Pin/Pin";
import CoverSample from "../../assets/images/sample_cover_image.png";

export interface Choice {
  author: string;
  body: string;
  created_at: string;
  deleted_at: string | null;
  id: number;
  page_num: string;
  parent_id: string;
  prompt: string;
  updated_at: string;
  depth: number;
}

interface Page {
  author: string;
  body: string;
  created_at: string | null;
  deleted_at: string | null;
  id: number;
  page_num: string;
  parent_id: string | null;
  prompt: string | null;
  updated_at: string;
  cover_id: number;
}

export interface Flag {
  author: boolean;
  rating: boolean;
}

const ReadingPage: React.FC = () => {
  const { cover_title, first_page } = useParams();
  const this_page_id = first_page;

  const dispatch = useDispatch();
  // here we have the title of the story and the current page's id

  //maybe get cover record by title and first page in useEffect

  // would be nice to have the previous page

  // dont wanna fetch cover info or previous page every time.  cache them.

  const [choices, setChoices] = useState<Choice[]>([]);
  // const [choiceDepths, setChoiceDepths] = useState([]);
  const [ratingChoices] = useState<Choice[]>([]);
  const [authorChoices, setAuthorChoices] = useState<Choice[]>([]);
  const [page, setPage] = useState<Page>({} as Page);
  const [isRatedByActiveUser, setIsRatedByActiveUser] = useState(false);
  const [choiceLimit] = useState(3);
  const [trigger, setTrigger] = useState(false);
  // const [cover, setCover] = useState<Cover>({} as Cover);
  const [pageIsRead, setPageIsRead] = useState(false);
  const [isFirstPage, setIsFirstPage] = useState(false);

  const navigate = useNavigate();

  const { user_id: ACTIVE_USER_ID, username } = useSelector(
    (state: RootState) => state.user.user ?? { user_id: 0, username: "Anon" }
  );

  // const coverId = useSelector((state: RootState) => state.cover.coverId);
  // console.log("redux coverId", coverId);

  if (!ACTIVE_USER_ID) {
    navigate("/login");
  }

  const CURRENT_PAGE_ENDPOINT = `/api/page/page/${this_page_id}`; // TODO rm page/page from api
  const CURRENT_COVER_ENDPOINT = `/api/cover/cover-by/${this_page_id}`; // TODO rm this and replace with the cover_id from fetched page
  const CHOICES_ENDPOINT = `/api/choice/choices-for/${this_page_id}?limit=${choiceLimit}`;
  const AUTHOR_ENDPOINT = `/api/cover/author-choices?author=${username}&parent_id=${this_page_id}`;
  // const RATING_ENDPOINT = `/api/rating-choices?parent_id=${this_page_id}`;
  const SET_READ_ENDPOINT = `/api/page/read`;
  const CHOICE_DEPTHS_ENDPOINT = `/api/page/longest-stories`;

  useEffect(() => {
    //fetch first page
    const reset = async () => {
      setIsRatedByActiveUser(false);
    };
    reset();

    const postRead = async () => {
      if (!ACTIVE_USER_ID) {
        return;
      }

      let post_data = {
        page_id: first_page,
        user_id: ACTIVE_USER_ID,
      };

      const result = await fetch(SET_READ_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post_data),
      });
      const data = await result.json();
      const pageIsRead = data.data;
      setPageIsRead(() => pageIsRead.length === 0);
    };

    // const fetchCover = async () => {
    //   console.log("fetching cover");
    //   const result = await fetch(CURRENT_COVER_ENDPOINT);
    //   const data = await result.json();
    //   const cover = data.data[0];
    //   console.log("cover", cover);
    //   // if (coverId < 0 || cover.id !== coverId) {
    //   /////////////
    //   // }
    //   console.log("setting cover in Redux");
    //   dispatch(setCoverId(cover.id));
    //   // setCover(cover);
    // };

    const fetchPage = async () => {
      const result = await fetch(CURRENT_PAGE_ENDPOINT);
      const data = await result.json();
      const page = data.data[0] as Page;
      setPage(page);
      if (page.parent_id === null) {
        setIsFirstPage(() => true);
      } else {
        setIsFirstPage(() => false);
      }

      // console.log("setting cover in Redux"); // TODO preservation of something i haven't looked into yet
      // dispatch(setCoverId(page.cover_id));
    };
    const fetchRandomChoices = async () => {
      const result = await fetch(CHOICES_ENDPOINT);
      const data = await result.json();
      const choices_data = data.data as Choice[];

      const fetchLongestStoryChoicesFrom_data = async (page_id: string | undefined) => {
        if (!page_id) {
          return;
        }
        const result = await fetch(CHOICE_DEPTHS_ENDPOINT + `?page_id=${page_id}`);
        const data = await result.json();
        return data.data;
      };
      const depth_data = await fetchLongestStoryChoicesFrom_data(this_page_id);

      const addDepthToChoices = async (choices: Choice[]) => {
        for (let i = 0; i < choices.length; i++) {
          choices[i]["depth"] = depth_data[i].more_pages;
        }
      };
      await addDepthToChoices(choices_data);

      setChoices(choices_data);
    };

    const fetchAuthorChoice = async () => {
      const result = await fetch(AUTHOR_ENDPOINT);
      const data = await result.json();
      const authorChoices = data.data as Choice[];
      setAuthorChoices(authorChoices);
    };

    // const fetchRatingChoice = async (page_id) => {
    //   const result = await fetch(RATING_ENDPOINT);
    //   const data = await result.json();
    //   const ratingData = data.data as Choice[];
    //   // console.log("rating data", data.data);
    //   setRatingChoices(ratingData);
    // };

    // fetchRatingChoice(this_page_id);
    fetchAuthorChoice(); //buggy
    fetchPage();
    fetchRandomChoices();
    // fetchCover();
    postRead();
  }, [
    trigger,
    first_page,
    ACTIVE_USER_ID,
    SET_READ_ENDPOINT,
    CURRENT_COVER_ENDPOINT,
    CURRENT_PAGE_ENDPOINT,
    CHOICES_ENDPOINT,
    this_page_id,
    CHOICE_DEPTHS_ENDPOINT,
    AUTHOR_ENDPOINT,
    dispatch,
  ]);

  return (
    <>
      <div className='container bg=light'>
        <div className='row justify-content-between border border-dark mt-2'>
          <div className='col-1 w-auto'>
            {isFirstPage && <Link to={`/dashboard/cover-details/${page.cover_id}`}>back</Link>}
            {!isFirstPage && (
              <Link to={`/dashboard/reading/${cover_title}/${page.parent_id}`}>back</Link>
            )}
          </div>
          <div className='col-1 w-auto'>
            <Link to={`/dashboard/cover-details/${page.cover_id}`}>{cover_title}</Link>
            {pageIsRead && (
              <span>
                {" "}
                <img
                  src={Read}
                  alt='read'
                  height='15'
                  width='15'></img>
              </span>
            )}
          </div>
          <div className='col-1 w-auto'>{page.page_num}</div>
        </div>
        <div className='row mt-4 border border-dark p-3 justify-content-center'>
          <div className='row'>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box>
                <Box sx={{ display: "flex", alignItems: "center", mb: "1rem" }}>
                  <Bookmark
                    userId={ACTIVE_USER_ID}
                    coverId={page.cover_id}
                    pageId={this_page_id ? parseInt(this_page_id) : -1}
                  />
                  <Pin
                    userId={ACTIVE_USER_ID}
                    pageId={this_page_id ? parseInt(this_page_id) : -1}
                  />
                </Box>
              </Box>
              <Box>Flags</Box>
            </Box>
          </div>
          <Box
            component='img'
            sx={{ width: "100%", height: "100%", objectFit: "cover" }}
            src={CoverSample}
          />
          <div className='col-6 border'>{page.body}</div>
        </div>
        <div className='row justify-content-center border border-dark mt-2'>
          <div className='col-1 w-auto'>
            <Rating
              user_id={ACTIVE_USER_ID + ""}
              page_id={first_page + ""}
              setIsRated={setIsRatedByActiveUser}
              isRated={isRatedByActiveUser}
            />
          </div>
        </div>
        {false && isRatedByActiveUser && (
          <div className='row justify-content-evenly mt-2 border border-dark p-3'>
            {ratingChoices.map((ratingChoice) => {
              return (
                <ChoiceCard
                  key={uuidv4()}
                  title={cover_title || ""}
                  choice={[ratingChoice]}
                  setTrigger={setTrigger}
                  trigger={trigger}
                  flags={[{ author: false, rating: true } as Flag]}
                  depth={ratingChoice.depth}
                />
              );
            })}
          </div>
        )}
        {false && isRatedByActiveUser && (
          <div className='row justify-content-evenly mt-2 border border-dark p-3'>
            {authorChoices.map((authorChoice) => {
              return (
                <ChoiceCard
                  key={uuidv4()}
                  title={cover_title || ""}
                  choice={[authorChoice]}
                  setTrigger={setTrigger}
                  trigger={trigger}
                  flags={[{ author: true, rating: false } as Flag]}
                  depth={authorChoice.depth}
                />
              );
            })}
          </div>
        )}
        {isRatedByActiveUser && (
          <div className='row justify-content-evenly mt-2 border border-dark p-3'>
            {choices.length !== 0 &&
              choices.map((choice) => {
                return (
                  <ChoiceCard
                    key={uuidv4()}
                    title={cover_title || ""}
                    choice={[choice]}
                    setTrigger={setTrigger}
                    trigger={trigger}
                    flags={[{ author: false, rating: false } as Flag]}
                    depth={choice.depth}
                  />
                );
              })}
            {choices.length === 0 && (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Typography sx={{ fontWeight: "bold" }}>The End</Typography>
              </Box>
            )}
            <div className='row justify-content-center mt-2'>
              <div className='col-1 w-auto'>
                <Link to={`/dashboard/create-page/${this_page_id}`}>
                  <button>+ add new choice</button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ReadingPage;
