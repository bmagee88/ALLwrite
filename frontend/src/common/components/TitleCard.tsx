import React from "react";
import { Link } from "react-router-dom";

const TitleCard = ({
  cover_id,
  title,
  author,
  genre,
  summary,
  image,
  isBookmarked,
}) => {
  return (
    <>
      <div className="col-12 col-sm-6 col-md-4 col-lg-3">
        {/* <Link to='/'> */}
        <div className="container py-3 my-2 border border-primary bg-light">
          <div className="row">
            <div className="col col-11">
              <div className="row border border-primary p-1 bg-white mx-1 h4">
                {title}
              </div>
              <div className="row border border-primary p-1 bg-white mx-1 lead">
                {author}
              </div>
              <div className="row">
                <div className="col-4 px-1 mx-3 border small rounded w-auto bg-warning">
                  {genre}
                </div>
              </div>
            </div>
            <div className="col col-1">
              {isBookmarked && <div className="text-warning">&#128952;</div>}
            </div>
          </div>
          <div className="row">
            <div className="col p-4">
              <div className="row border border-secondary p-1 bg-white small">
                {summary}
              </div>
            </div>
            <div className="col p-4">
              <div className="row border border-secondary p-1 bg-white">
                {image}
              </div>
            </div>
          </div>
          <div className="row justify-content-end">
            <div className="col-6 w-auto">
              <Link to={`../cover-details/${cover_id}`}>
                <button>Details -{">"}</button>
              </Link>
            </div>
          </div>
        </div>
        {/* </Link> */}
      </div>
    </>
  );
};

export default TitleCard;
