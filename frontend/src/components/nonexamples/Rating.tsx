import React, { useEffect, useState } from "react";

import RatingDropFull from "../../images/rating_drop_full.png";
import RatingDropEmpty from "../../images/rating_drop_empty.png";

const Rating = ({ user_id, page_id, setIsRated, isRated }) => {
  const MAX_RATING = 10;
  const USER_RATING_FOR_PAGE_ENDPOINT = `http://localhost:8000/user-rating-for-page/`;
  const USER_RATING_FOR_PAGE_UPDATE_ENDPOINT = `http://localhost:8000/user-rating-for-page-update/`;
  const USER_RATING_FOR_PAGE_INSERT_ENDPOINT = `http://localhost:8000/user-rating-for-page-insert/`;
  //   let rating = 4;
  const [rating, setRating] = useState(0);
//   const [hasRating, setHasRating] = useState(false);

  useEffect(() => {
    //fetch
    // console.log("uid, pid", user_id, page_id)
    const fetchUserRatingForPage = async () => {
      const response = await fetch(
        USER_RATING_FOR_PAGE_ENDPOINT + `${user_id}/${page_id}`
      );
      const data = await response.json();
      if (data.data.length === 0) {
        // setHasRating(() => false);
        setIsRated(() => false);
        setRating(() => 0);
      } else {
        // setHasRating(() => true);
        setIsRated(() => true);
        setRating(() => data.data[0].rating);
      }
    };
    fetchUserRatingForPage();
    // console.log("testing");
    //if fetch returns non-null, set has rating true
  }, [page_id]);

  const changeRating = async (e) => {
    let tempRating = e.target.id;
    await setRating(() => e.target.id);
    // console.log("clicked");
    if (isRated) {
        const response = await fetch(USER_RATING_FOR_PAGE_UPDATE_ENDPOINT+ `${user_id}/${page_id}/${tempRating}`, {
            method: "PUT",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            }
          });
        const data_update = await response.json();
        console.log("update rating", data_update.data[0].rating);
    } else {
        const response = await fetch(USER_RATING_FOR_PAGE_INSERT_ENDPOINT+ `${user_id}/${page_id}/${tempRating}`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          });
        const data_insert = await response.json();
        setIsRated(() => true);
        console.log("insert rating", data_insert.data[0].rating);
    }
  };

  return (
    <>
      {/* {rating} */}
      {Array.from({ length: rating }).map((x, index) => {
        // console.log("full: index, rating", index + 1, parseInt(rating));
        return (
          <img
            key={rating + index + 1}
            id={parseInt(index) + 1}
            src={RatingDropFull}
            height="15"
            width="15"
            alt="asdf"
            onClick={(e) => changeRating(e)}
          ></img>
        );
      })}
      {Array.from({ length: MAX_RATING - rating }).map((x, index) => {
        // console.log(
        //   "empty: index, rating",
        //   index + 1,
        //   MAX_RATING - parseInt(rating)
        // );
        return (
          <img
            key={rating + index + 1}
            id={parseInt(rating) + parseInt(index) + 1}
            src={RatingDropEmpty}
            height="15"
            width="15"
            alt="asdf"
            onClick={(e) => changeRating(e)}
          ></img>
        );
      })}
    </>
  );
};

export default Rating;
