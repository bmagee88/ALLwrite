import RegisterButton from "./RegisterButton/RegisterButton";
import LoginButton from "./LoginButton/LoginButton";
import { Box } from "@mui/material";
import ProfileMenu from "../../../ProfileMenu/ProfileMenu";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import Greeting from "./Greeting/Greeting";

const HeaderAccount = () => {
  const activeUser = useSelector((state: RootState) => state.user.user);

  return (
    <>
      {activeUser ? (
        <Box sx={{ display: "flex", gap: "1rem" }}>
          <Greeting username={activeUser.username} />
          <ProfileMenu />
        </Box>
      ) : (
        <Box sx={{ display: "flex", gap: "1rem", alignSelf: "end" }}>
          <RegisterButton />
          <LoginButton />
        </Box>
      )}
    </>
  );
};

export default HeaderAccount;
