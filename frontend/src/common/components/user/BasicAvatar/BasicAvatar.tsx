import Box from "@mui/material/Box";
import React from "react";

interface BasicAvatarProps {
  firstName: string;
  lastName: string;
}

const BasicAvatar: React.FC<BasicAvatarProps> = ({ firstName, lastName }) => {
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const getInitials = (first: string, last: string) => {
    const firstInitial = first ? first[0].toUpperCase() : "";
    const lastInitial = last ? last[0].toUpperCase() : "";
    return `${firstInitial}${lastInitial}`;
  };

  const initials = getInitials(firstName, lastName);
  const backgroundColor = getRandomColor();
  const avatarStyle = {
    display: "inline-block",
    width: "35px",
    height: "35px",
    borderRadius: "50%",
    backgroundColor,
    color: "white",
    fontSize: "16px",
    textAlign: "center",
    lineHeight: "35px",
    fontWeight: "bold",
  };

  return <Box sx={avatarStyle}>{initials}</Box>;
};

export default BasicAvatar;
