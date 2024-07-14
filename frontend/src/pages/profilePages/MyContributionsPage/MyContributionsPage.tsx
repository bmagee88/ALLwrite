import React, { useEffect } from "react";
import MyContributionsDisplay from "./MyContributionsDisplay/MyContributionsDisplay";
import { fetchCoversAndPagesByUser } from "./api";
import { RootState } from "../../../common/store/store";
import { useSelector } from "react-redux";

const MyContributionsPage: React.FC = () => {
  // check if theres data in redux
  // have a manual refresh button or timeout to refetch with updated values
  // consider having a time out for the button so they can't just spam the button
  const user_id = useSelector((state: RootState) => state.user.user?.user_id);
  useEffect(() => {
    fetchCoversAndPagesByUser(user_id || 0);
  }, [user_id]);
  return <MyContributionsDisplay />;
};

export default MyContributionsPage;
