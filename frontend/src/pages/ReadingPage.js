import React, { useEffect, useState } from "react";
import { FormCheck } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import ChoiceCard from "../components/nonexamples/ChoiceCard";
import Rating from "../components/nonexamples/Rating";
import { v4 as uuidv4 } from "uuid";
import session_data from "../test/session";

const ReadingPage = () => {
  const { cover_title, first_page } = useParams();
  const this_page_id = first_page;
  // here we have the title of the story and the current page's id

  //maybe get cover record by title and first page in useEffect

  // would be nice to have the previous page

  // dont wanna fetch cover info or previous page every time.  cache them.

  const [choices, setChoices] = useState([]);
  const [ratingChoices, setRatingChoices] = useState([]);
  const [authorChoices, setAuthorChoices] = useState([]);
  const [page, setPage] = useState({});
  const [isRatedByActiveUser, setIsRatedByActiveUser] = useState(false);
  const [choiceLimit, setChoiceLimit] = useState(3);
  const [trigger, setTrigger] = useState(false);
  const [cover, setCover] = useState({});
  const [pageIsRead, setPageIsRead] = useState(false);

  const FLAGS = { author: "Author", longest: "Longest", rating: "Rating" };

  const TEST_AUTHOR = "dersh";
  const ACTIVE_USER_ID = 4;
  //   const TEST_ID = 22;

  // console.log("this page id",this_page_id)
  const CURRENT_PAGE_ENDPOINT = `http://localhost:8000/page/${this_page_id}`;
  const CURRENT_COVER_ENDPOINT = `http://localhost:8000/cover-by/${this_page_id}`;
  const CHOICES_ENDPOINT = `http://localhost:8000/choices-for/${this_page_id}?limit=${choiceLimit}`;
  const AUTHOR_ENDPOINT = `http://localhost:8000/author-choices?author=${TEST_AUTHOR}&parent_id=${this_page_id}`;
  const RATING_ENDPOINT = `http://localhost:8000/rating-choices?parent_id=${this_page_id}`;
  const SET_READ_ENDPOINT = `http://localhost:8000/read`;
  //   const AUTHOR_BODY = {
  //     author: "Necrotroph",
  //     parent_id: 4,
  //   };
  //   const RATING_BODY = {
  //     parent_id: 4,
  //   };

  useEffect(() => {
    //fetch first page
    const reset = async () => {
      setIsRatedByActiveUser(false);
    };
    reset();

    const postRead = async () => {

      let post_data = {
        page_id : first_page,
        user_id : ACTIVE_USER_ID
      }

      const result = await fetch(SET_READ_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post_data),
      });
      const data = await result.json();
      // console.log("insert result", data.data);
      setPageIsRead(()=>data.data.length === 0)
    };

    const fetchCover = async () => {
      const result = await fetch(CURRENT_COVER_ENDPOINT);
      const data = await result.json();
      // console.log("fetch cover data", data.data[0]);
      // setPage(data.data[0]);
      setCover(() => data.data[0]);
    };

    const fetchPage = async () => {
      const result = await fetch(CURRENT_PAGE_ENDPOINT);
      const data = await result.json();
      // console.log("fetch page data", data.data[0]);
      setPage(data.data[0]);
      //untick checkbox
    };
    // fetchPage(first_page);
    //fetch choices
    const fetchRandomChoices = async () => {
      const result = await fetch(CHOICES_ENDPOINT);
      const data = await result.json();
      // console.log("random choice data", data.data);
      setChoices(() => {
        return data.data;
      });
    };
    // fetchRandomChoices();

    const fetchAuthorChoice = async (title, page_id) => {
      const result = await fetch(AUTHOR_ENDPOINT);
      const data = await result.json();
      // console.log("author data", data.data);
      setAuthorChoices(() => {
        return data.data;
      });
    };
    // fetchAuthorChoice();

    // const fetchRatingChoice = async (page_id) => {
    //   const result = await fetch(RATING_ENDPOINT);
    //   const data = await result.json();
    //   // console.log("rating data", data.data);
    //   setRatingChoices(() => {
    //     return data.data;
    //   });
    // };

    // fetchRatingChoice(this_page_id);
    fetchAuthorChoice(cover_title, this_page_id);
    fetchPage(this_page_id);
    fetchRandomChoices();
    fetchCover();
    postRead();
  }, [trigger, first_page]);

  //   useEffect(() => {
  //     setIsRatedByActiveUser((isRatedByActiveUser) => !isRatedByActiveUser);
  //   }, [isRatedByActiveUser]);

  return (
    <>
      <div className="container bg=light">
        <div className="row justify-content-between border border-dark mt-2">
          <div className="col-1 w-auto">back</div>
          <div className="col-1 w-auto">{cover_title}
          {pageIsRead && (<span> {'['}READ{']'}</span>)}
          </div>
          <div className="col-1 w-auto">{page.page_num}</div>
        </div>
        <div className="row mt-4 border border-dark p-3 justify-content-center">
          <div className="col-6 border">{page.body}</div>
        </div>
        <div className="row justify-content-center border border-dark mt-2">
          <div className="col-1 w-auto">
            {/* rated: {isRatedByActiveUser.toString()} */}
            <Rating user_id={ACTIVE_USER_ID} page_id={first_page} setIsRated={setIsRatedByActiveUser} isRated={isRatedByActiveUser}/>
            <FormCheck
              onClick={() => {
                // console.log("clicked");
                setIsRatedByActiveUser(() => !isRatedByActiveUser);
                // console.log("choices", choices);
                // console.log("achoices", authorChoices);
                // console.log("rchoices", ratingChoices);
              }}
            ></FormCheck>
          </div>
        </div>
        {false && isRatedByActiveUser && (
          <div className="row justify-content-evenly mt-2 border border-dark p-3">
            {ratingChoices.map((item) => {
              return (
                <ChoiceCard
                  key={uuidv4()}
                  title={cover_title}
                  choice={[item]}
                  setTrigger={setTrigger}
                  trigger={trigger}
                  flags={[{ author: false, rating: true }]}
                />
              );
            })}
          </div>
        )}

        {false && isRatedByActiveUser && (
          <div className="row justify-content-evenly mt-2 border border-dark p-3">
            {authorChoices.map((item) => {
              return (
                <ChoiceCard
                  key={uuidv4()}
                  title={cover_title}
                  choice={[item]}
                  setTrigger={setTrigger}
                  trigger={trigger}
                  flags={[{ author: true, rating: false }]}
                />
              );
            })}
          </div>
        )}

        {isRatedByActiveUser && (
          <div className="row justify-content-evenly mt-2 border border-dark p-3">
            {choices.map((item) => {
              // console.log("item being passed", item);
              return (
                <ChoiceCard
                  key={uuidv4()}
                  title={cover_title}
                  choice={[item]}
                  setTrigger={setTrigger}
                  trigger={trigger}
                  flags={[{ author: false, rating: false }]}
                />
              );
            })}
            <div className="row justify-content-end mt-2">
              <div className="col-1 w-auto">
                <Link to={`../../../create-page/${this_page_id}`}>
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
