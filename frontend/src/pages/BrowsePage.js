import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TitleCard from "../components/nonexamples/TitleCard";
import Button from "react-bootstrap/esm/Button";

const BrowsePage = () => {
  // const testListOfTitles = [
  //     {
  //         id:1,

  //       title: "first story",
  //       image: "img location",
  //       description: "It was a dark stormy night",
  //     },
  //     {
  //         id:2,

  //       title: "second story",
  //       image: "img location",
  //       description: "lovely day for a run in the park",
  //     },
  //     {
  //         id:3,

  //       title: "third story",
  //       image: "img location",
  //       description: "blah blah blah",
  //     },
  //     {
  //         id:4,

  //       title: "fourth story",
  //       image: "img location",
  //       description: "werewolves and vampires",
  //     },
  //     {
  //         id:5,

  //       title: "fifth story",
  //       image: "img location",
  //       description: "the desc of the c of the c of the c of the fifth story",
  //     },
  //     {
  //         id:6,

  //       title: "sixth story",
  //       image: "img location",
  //       description: "the desc of the fifth story",
  //     },
  //     {
  //         id:7,

  //       title: "seventh story",
  //       image: "img location",
  //       description: "the c of the c of the c of the c of the th story",
  //     },
  //     {
  //         id:8,

  //       title: "eight story",
  //       image: "img location",
  //       description: "the dc of the c of the e fifth story",
  //     },
  //     {
  //         id:9,

  //       title: "nine story",
  //       image: "img location",
  //       description: "the desc of the fifth story",
  //     },
  //     {
  //         id:10,
  //       title: "ten story",
  //       image: "img location",
  //       description:
  //         "the c of the c of the c of the c of the c of the c of the c of the c of the tory",
  //     },
  //   ];

  const [titles, setTitles] = useState([]);
  const [limit, setLimit] = useState(3);
  // const [bookmarks, setBookmarks] = useState([]);
  // const [isBooked, setIsBooked] = useState(false);

  const ADD_AMOUNT = 3;
  const ACTIVE_USER_ID = 1;

  useEffect(() => {
    const outer_stuff = async () => {
      var bms_outer, tits_outer, tits_with_bookmarks;
      const fetchBookmarksByUser = async (user_id) => {
        const response = await fetch(
          `http://localhost:8000/bookmarks/${user_id}`
        );
        const bms = await response.json();
        console.log("bms", bms);
        bms_outer = bms.data;
        // setBookmarks(() => bms.data);
      };
      await fetchBookmarksByUser(ACTIVE_USER_ID);

      const fetchTitles = async (limit) => {
        const response = await fetch(
          `http://localhost:8000/covers?limit=${limit}`
        );
        const tits = await response.json();
        console.log("tits", tits);
        tits_outer = tits.data;
        // console.log("tits outer inside", tits_outer); //works
        // setTitles(() => tits.data);
      };
      await fetchTitles(limit);

      const addBookMarksToTitles = async (t, b) => {
        var found = false;
        console.log("in addbookmakrs to titles");
        const innerf = async () => {
          console.log("first line in anon");
          for (var i = 0; i < t.length; i++) {
            found = false;
            for (var j = 0; j < b.length; j++) {
              console.log(
                "comparing",
                t[i].cover_id,
                "to",
                parseInt(b[j].bm_cover_id)
              );
              if (t[i].cover_id === parseInt(b[j].bm_cover_id)) {
                found = true;
                break;
              }
              // t[i].booked = t[i].cover_id === b[j].bm_cover_id ? true : false;
            }
            found === true ? (t[i].booked = true) : (t[i].booked = false);
          }
          console.log("t", t);
          setTitles(() => t);
          console.log("titles", titles);
        };
        innerf();
      };
      await addBookMarksToTitles(tits_outer, bms_outer);
    };
    outer_stuff();
  }, [limit]);

  // useEffect(() => {
  //   const fetchBookmarksByUser = async (user_id) => {
  //     const response = await fetch(
  //       `http://localhost:8000/bookmarks/${user_id}`
  //     );
  //     //   setTitles(testListOfTitles.slice(0, limit));
  //     const bms = await response.json();
  //     console.log("bms", bms);
  //     // remove records where bookmarked = true and user != current user.
  //     setBookmarks(() => bms.data);
  //   };
  //   fetchBookmarksByUser(ACTIVE_USER_ID);
  // }, []);

  const addItems = (amt) => {
    console.log(limit + amt);
    setLimit((limit) => limit + amt);
  };

  return (
    <>
      {/* <button onClick={() => printCovers()}>hgfjhgjhg</button> */}
      <div className="row justify-content-center">
        <div className="col-6 w-auto h1 my-4 border border-dark rounded bg-light p-1">
          Browse Covers
        </div>
      </div>

      <div className="container-fluid border border-warning p-3">
        <div className="row justify-content-end">
          <div className="col-6 w-auto">
            <Link to="/create-cover">
              <Button className="btn btn-warning">+ New Cover</Button>
            </Link>
          </div>
        </div>
        <div className="row">
          {titles.map((item, index) => {
            return (
              <TitleCard
                key={index}
                cover_id={item.cover_id}
                title={item.title}
                author={item.author}
                genre={item.genre}
                summary={item.summary.slice(0, 75) + "..."}
                image={item.image_url}
                isBookmarked={item.booked}
              />
            );
          })}
          
        </div>
      </div>
      <div className="row">
        <Button onClick={() => addItems(ADD_AMOUNT)}>
          {" "}
          load {ADD_AMOUNT} more
        </Button>
      </div>
    </>
  );
};

export default BrowsePage;
