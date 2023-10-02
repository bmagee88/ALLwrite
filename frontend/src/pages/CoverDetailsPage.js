import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const CoverDetails = () => {
  const { cover_id } = useParams();
  const [cover, setCover] = useState({});
  const GET_COVER_ENDPOINT = `http://localhost:8000/cover-details/${cover_id}`;

  useEffect(() => {
    const fetchCover = async () => {
      const response = await fetch(GET_COVER_ENDPOINT);
      const data = await response.json();
      console.log(data.data[0]);
      setCover(() => data.data[0]);
    };
    fetchCover();
  }, []);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">{cover.title}</div>
        </div>
        <div className="row">
          <div className="col">{cover.author}</div>
        </div>
        <div className="row">
          <div className="col">{cover.genre}</div>
        </div>
        <div className="row">
          <div className="col">{cover.summary}</div>
        </div>
        <Link to={`/reading/${cover.title}/${cover.first_page}`}>
          <button>start journey</button>
        </Link>
      </div>
    </>
  );
};

export default CoverDetails;
