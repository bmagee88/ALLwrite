import React, { useEffect, useState } from "react";

import RatingDropFull from "../../assets/images/rating_drop_full.png";
import RatingDropEmpty from "../../assets/images/rating_drop_empty.png";
import WaterDropIcon from "@mui/icons-material/WaterDrop";

const RatingDisplay = ({ page_id }) => {
  const [rating, setRating] = useState(0);
  const [total, setTotal] = useState(0);
  const MAX_RATING = 10;
  const AVG_RATING_FOR_PAGE_ENDPOINT = "http://localhost:8000/avg-rating/";

  useEffect(() => {
    //fetch
    // console.log("uid, pid", user_id, page_id)
    const fetchAvgRatingForPage = async () => {
      const response = await fetch(AVG_RATING_FOR_PAGE_ENDPOINT + `${page_id}`);
      const data = await response.json();

      if (data.data.length !== 0) {
        setRating(() => data.data[0].avg_rating);
        setTotal(() => data.data[0].total);
      }
    };
    fetchAvgRatingForPage();
  }, []);
  return (
    <>
      {Array.from({ length: Math.round(rating) }).map((x, index) => {
        // console.log("full: index, rating", index + 1, parseInt(rating));
        return (
          <WaterDropIcon />
          // <img
          //   key={rating + index + 1}
          //   id={String(parseInt(index) + 1)}
          //   src={RatingDropFull}
          //   height="10"
          //   width="10"
          //   alt="asdf"
          // ></img>
        );
      })}
      {Array.from({ length: MAX_RATING - Math.round(rating) }).map((x, index) => {
        // console.log(
        //   "empty: index, rating",
        //   index + 1,
        //   MAX_RATING - parseInt(rating)
        // );
        return (
          <img
            key={rating + index + 1}
            id={String(parseInt(rating) + parseInt(index) + 1)}
            src={RatingDropEmpty}
            height='10'
            width='10'
            alt='asdf'></img>
        );
      })}{" "}
      <span className='text-nowrap'>
        {parseFloat(rating) || 0} {"("}
        {total}
        {")"}
      </span>
    </>
  );
};

export default RatingDisplay;
