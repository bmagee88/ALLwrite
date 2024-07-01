import React, { useEffect, useState } from "react";

import RatingDropFull from "../../assets/images/rating_drop_full.png";
import RatingDropEmpty from "../../assets/images/rating_drop_empty.png";

interface RatingProps {
  user_id: string;
  page_id: string;
  setIsRated: React.Dispatch<React.SetStateAction<boolean>>;
  isRated: boolean;
}

const Rating: React.FC<RatingProps> = ({ user_id, page_id, setIsRated, isRated }) => {
  const MAX_RATING = 10;
  const USER_RATING_FOR_PAGE_ENDPOINT = `/api/rating/user-rating-for-page/`;
  const USER_RATING_FOR_PAGE_UPDATE_ENDPOINT = `/api/rating//user-rating-for-page-update/`;
  const USER_RATING_FOR_PAGE_INSERT_ENDPOINT = `/api/rating//user-rating-for-page-insert/`;
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const fetchUserRatingForPage = async () => {
      const response = await fetch(USER_RATING_FOR_PAGE_ENDPOINT + `${user_id}/${page_id}`);
      const data = await response.json();
      const userRating = data.data;
      if (userRating.length === 0) {
        setIsRated(false);
        setRating(0);
      } else {
        setIsRated(true);
        setRating(userRating[0].rating);
      }
    };
    fetchUserRatingForPage();
  }, [USER_RATING_FOR_PAGE_ENDPOINT, page_id, setIsRated, user_id]);

  const changeRating = async (e: React.MouseEvent<HTMLImageElement>) => {
    let tempRating = e.currentTarget.id;
    await setRating(parseInt(tempRating));
    if (isRated) {
      const response = await fetch(
        USER_RATING_FOR_PAGE_UPDATE_ENDPOINT + `${user_id}/${page_id}/${tempRating}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      const updateData = data.data;
      console.log("update rating", updateData[0].rating);
    } else {
      const response = await fetch(
        USER_RATING_FOR_PAGE_INSERT_ENDPOINT + `${user_id}/${page_id}/${tempRating}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const data_insert = await response.json();
      setIsRated(() => true);
      console.log("insert rating", data_insert.data[0].rating);
    }
  };

  return (
    <>
      {Array.from({ length: rating }).map((_, index: number) => {
        return (
          <img
            key={rating + index + 1}
            id={index + 1 + ""}
            src={RatingDropFull}
            height='15'
            width='15'
            alt='asdf'
            onClick={changeRating}></img>
        );
      })}
      {Array.from({ length: MAX_RATING - rating }).map((_, index) => {
        return (
          <img
            key={rating + index + 1}
            id={rating + index + 1 + ""}
            src={RatingDropEmpty}
            height='15'
            width='15'
            alt='asdf'
            onClick={changeRating}></img>
        );
      })}
    </>
  );
};

export default Rating;
