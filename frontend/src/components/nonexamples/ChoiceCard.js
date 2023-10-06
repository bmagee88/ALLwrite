import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RatingDisplay from "./RatingDisplay";

const ChoiceCard = ({ title, choice, setTrigger, trigger, flags }) => {
  const [morePages, setMorePages] = useState(1);

  useEffect(() => {
    setMorePages(() => Math.floor(Math.random() * 100));
    // console.log("choice", choice);
  }, []);
  return (
    <>
      <div className="col-12 col-md-5 col-lg-3 border border-dark mt-2">
        <div className="row">
          <div className="col-4">{choice[0].author}</div>
          <div className="col-5">
          <RatingDisplay page_id={choice[0].id}/>
            {/* <span className="text-warning">&#9956;&#9956;&#9956;</span>
            &#9956;&#9956; */}
          </div>
          <div className="col-3 text-end">+{morePages}</div>
        </div>
        <div className="row mt-2">
          <div className="col border my-2 mx-1">{choice[0].prompt}</div>
        </div>
        <div className="row mt-2 justify-content-start">
            {flags[0].author && (<div className="col-1 w-auto mb-2 border rounded bg-primary">
            Author
          </div>)}
          
          {flags[0].rating && (<div className="col-1 w-auto mb-2 border rounded bg-info">
            Rating
          </div>)}
        </div>
        <div className="row justify-content-end flex-column align-items-end">
          <div className="col-1 w-auto pb-1">
          <Link to={`/reading/${title}/${choice[0].id}`}>
            <button onClick={()=>{setTrigger(!trigger); console.log("id should be node id of choice",choice[0])}}> in {title} turn to page_id {choice[0].id}</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChoiceCard;
