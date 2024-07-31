import React, { useEffect } from "react";
import MyContributionsDisplay from "./MyContributionsDisplay/MyContributionsDisplay";
import { RootState } from "../../../common/store/store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { setContributions } from "../../../common/store/myContributions/myContributionsSlice";

const MyContributionsPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // check if theres data in redux
  // have a manual refresh button or timeout to refetch with updated values
  // consider having a time out for the button so they can't just spam the button
  const user_id = useSelector((state: RootState) => state.user.user?.user_id);
  console.log("user_id", user_id);
  const contributions = useSelector((state: RootState) => state.myContributions.contribs);
  console.log("contribs", contributions);
  useEffect(() => {
    console.log("running useeffect");
    const fetchCoversAndPagesByUser = async (user_id: number) => {
      console.log("in fetchCoversAndPagesByUser - contributions");
      const response = await fetch(`/api/users/${user_id}/contributions`);
      if (response.ok) {
        console.log("response ok");
        const data = await response.json();
        dispatch(setContributions(data.data));
      } else {
        console.log("response not okay");
        navigate("/login");
      }
    };
    fetchCoversAndPagesByUser(user_id || 0);
  }, [dispatch, navigate, user_id]);
  return (
    <Box>
      <Box sx={{ paddingLeft: "1rem", paddingTop: ".5rem" }}>
        <Typography fontSize={24}>My Contributions</Typography>
      </Box>
      <MyContributionsDisplay contributions={contributions} />
    </Box>
  );
};

export default MyContributionsPage;
