import React, { useEffect } from "react";
import MyContributionsDisplay from "./ContinueReadingDisplay/ContinueReadingDisplay";
// import { fetchCoversAndPagesByUser } from "./api";
import { RootState } from "../../../common/store/store";
import { useDispatch, useSelector } from "react-redux";
import { setBookmarks } from "../../../common/store/continueReading/continueReading";

const ContinueReadingPage: React.FC = () => {
  const dispatch = useDispatch();
  // check if theres data in redux
  // have a manual refresh button or timeout to refetch with updated values
  // consider having a time out for the button so they can't just spam the button
  const user_id = useSelector((state: RootState) => state.user.user?.user_id);
  console.log("user_id", user_id);
  const bookmarks = useSelector((state: RootState) => state.continueReading.bookmarks);
  console.log("contribs", bookmarks);
  useEffect(() => {
    console.log("running useeffect");
    const fetchCoversAndPagesByUser = async (user_id: number) => {
      console.log("in fetchCoversAndPagesByUser");
      const response = await fetch(`/api/users/${user_id}/continue-reading`);
      if (response.ok) {
        console.log("response ok");
        const data = await response.json();
        dispatch(setBookmarks(data.data));
      } else {
        console.log("response not okay");
      }
    };
    fetchCoversAndPagesByUser(user_id || 0);
  }, [dispatch, user_id]);
  return <MyContributionsDisplay bookmarks={bookmarks} />;
};

export default ContinueReadingPage;
