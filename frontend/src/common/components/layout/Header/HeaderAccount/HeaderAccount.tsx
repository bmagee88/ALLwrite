import RegisterButton from "./RegisterButton/RegisterButton";
import LoginButton from "./LoginButton/LoginButton";
import { Box } from "@mui/material";
import ProfileMenu from "../../../ProfileMenu/ProfileMenu";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";

const HeaderAccount = () => {
  const activeUser = useSelector((state: RootState) => state.user.user);
  const hasActiveUser = Object.keys(activeUser).length !== 0;

  return (
    <>
      {hasActiveUser ? (
        <ProfileMenu />
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
