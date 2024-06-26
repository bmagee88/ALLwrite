import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RatingDisplay from "./RatingDisplay";
import Read from "../../assets/images/read.png";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Choice, Flag } from "../../pages/contentPages/ReadingPage";

interface ChoiceCardProps {
  title: string;
  choice: Choice[];
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  trigger: boolean;
  flags: Flag[];
  depth: number;
}

const ChoiceCard: React.FC<ChoiceCardProps> = ({
  title,
  choice,
  setTrigger,
  trigger,
  flags,
  depth,
}) => {
  const [isRead, setIsRead] = useState(false);

  const user_id = useSelector((state: RootState) => state.user.user?.user_id);

  const GET_READ_ENDPOINT = `/api/page/page-is-read`;
  // const GET_MAX_DEPTH_ENDPOINT = `http://localhost:8000/page-is-read`;

  useEffect(() => {
    const userReadPage = async (choice_id: number) => {
      console.log("userReadPage values:", choice_id);
      const result = await fetch(GET_READ_ENDPOINT + `?page_id=${choice_id}&user_id=${user_id}`);
      const data = await result.json();

      console.log("user read page", data.data);
      if (data.data.length === 0) {
        setIsRead(() => false);
      } else {
        setIsRead(() => true);
      }
    };
    userReadPage(choice[0].id);

    // const getMaxDepth = async (choice_id) => {
    //   const result = await fetch(
    //     GET_MAX_DEPTH_ENDPOINT +
    //       `?page_id=${choice_id}`
    //   );
    //   const data = await result.json();
    //   console.log("user read page", data.data);
    //   if (data.data.length === 0) {
    //     setIsRead(() => false);
    //   } else {
    //     setIsRead(() => true);
    //   }
    // }
    // getMaxDepth(choice[0].id);
    // const getIfPageRead = async (page_id, user_id) => {

    //   setChoices(() => {
    //     return data.data;
    //   });

    // console.log("choice", choice)
  }, [choice, GET_READ_ENDPOINT, user_id]);
  return (
    <>
      <div className='col-12 col-md-5 col-lg-3 border border-dark mt-2'>
        <div className='row'>
          <div className='col-4'>{choice[0].author}</div>
          <div className='col-5'>
            <RatingDisplay page_id={choice[0].id + ""} />
          </div>
          <div className='col-3 text-end'>+{depth}</div>
        </div>
        <div className='row mt-2'>
          <div className='col border my-2 mx-1'>{choice[0].prompt}</div>
        </div>
        <div className='row mt-2 justify-content-start'>
          {flags[0].author && (
            <div className='col-1 w-auto mb-2 border rounded bg-primary'>Author</div>
          )}

          {flags[0].rating && (
            <div className='col-1 w-auto mb-2 border rounded bg-info'>Rating</div>
          )}
        </div>
        <div className='row justify-content-end flex-column align-items-end'>
          <div className='col-1 w-auto pb-1'>
            <Link to={`/dashboard/reading/${title}/${choice[0].id}`}>
              <button
                onClick={() => {
                  setTrigger(!trigger);
                  console.log("id should be node id of choice", choice[0]);
                }}>
                {isRead && (
                  <img
                    src={Read}
                    alt='read choice'
                    height='15'
                    width='15'></img>
                )}{" "}
                Choose
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChoiceCard;
