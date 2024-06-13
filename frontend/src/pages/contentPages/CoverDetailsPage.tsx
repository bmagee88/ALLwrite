import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { RootState } from "../../common/store/store";

const CoverDetails = () => {
  const { cover_id } = useParams();
  const [cover, setCover] = useState({});
  const GET_COVER_ENDPOINT = `http://localhost:8000/cover-details/`;

  const ACTIVE_USER_ID = useSelector((state: RootState) => state.user.user.user_id);

  useEffect(() => {
    const fetchCover = async () => {
      const response = await fetch(GET_COVER_ENDPOINT + cover_id);
      const data = await response.json();
      console.log(data.data[0]);
      setCover(() => data.data[0]);
    };
    fetchCover();
  }, [GET_COVER_ENDPOINT, cover_id]);

  return (
    <>
      <div className='container'>
        <div className='row'>
          <div className='col'>{cover.title}</div>
        </div>
        <div className='row'>
          <div className='col'>by {cover.author}</div>
        </div>
        <div className='row'>
          <div className='col'>{cover.genre}</div>
        </div>
        <div className='row'>
          <div className='col'>{cover.summary}</div>
        </div>
        {ACTIVE_USER_ID !== null ? (
          <Link to={`/reading/${cover.title}/${cover.first_page}`}>
            <button>start journey</button>
          </Link>
        ) : (
          <Link to={`/register`}>
            <button>start journey</button>
          </Link>
        )}
      </div>
    </>
  );
};

export default CoverDetails;
