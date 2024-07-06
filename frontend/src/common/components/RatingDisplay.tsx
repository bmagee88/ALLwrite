import React, { useEffect, useState } from "react";

import RatingDropFull from "../../assets/images/rating_drop_full.png";
import RatingDropEmpty from "../../assets/images/rating_drop_empty.png";
interface Rating {
  avg_rating: number;
  total: number;
}
interface RatingDisplayProps {
  page_id: string;
}

const RatingDisplay: React.FC<RatingDisplayProps> = ({ page_id }) => {
  const [rating, setRating] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const MAX_RATING = 10;
  const AVG_RATING_FOR_PAGE_ENDPOINT = "/api/rating/avg-rating/";

  useEffect(() => {
    const fetchAvgRatingForPage = async () => {
      const response = await fetch(AVG_RATING_FOR_PAGE_ENDPOINT + `${page_id}`);
      const data = await response.json();
      const ratingData: Rating = data.data[0];
      const avgRatingData = data.data;

      if (avgRatingData.length !== 0) {
        setRating(ratingData.avg_rating);
        setTotal(ratingData.total);
      }
    };
    fetchAvgRatingForPage();
  }, [page_id]);
  return (
    <>
      {Array.from({ length: Math.round(rating) }).map((_, index) => {
        return (
          <img
            key={rating + index + 1}
            id={index + 1 + ""}
            src={RatingDropFull}
            height='10'
            width='10'
            alt='asdf'></img>
        );
      })}
      {Array.from({ length: MAX_RATING - Math.round(rating) }).map((_, index) => {
        return (
          <img
            key={rating + index + 1}
            id={rating + index + 1 + ""}
            src={RatingDropEmpty}
            height='10'
            width='10'
            alt='asdf'></img>
        );
      })}{" "}
      <span className='text-nowrap'>
        {rating + "" || 0} {"("}
        {total}
        {")"}
      </span>
    </>
  );
};

export default RatingDisplay;
