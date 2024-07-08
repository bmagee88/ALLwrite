import React from "react";

import Avatar from "@mui/material/Avatar";
import { stopWords } from "../../../utils/stopwords";

interface NamedColoredAvatarProps {
  name: string;
}

const NamedColoredAvatar: React.FC<NamedColoredAvatarProps> = ({ name }) => {
  function removeStopWords(wordList: string[]) {
    return wordList.filter((word) => !stopWords.includes(word.toLowerCase()));
  }

  function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name: string) {
    let splitName = name.split(" ");
    // console.log("splitName", splitName);

    // let splitNameLength = splitName.length;

    splitName = removeStopWords(splitName);

    let displayName = "";

    splitName.forEach((word) => {
      displayName += word[0];
    });
    // console.log("displayname", displayName);

    //to limit to 2
    // if (splitNameLength === 1) {
    //   displayName = `${splitName[0][0]}`;
    // } else if (splitNameLength > 1) {
    //   displayName = `${splitName[0][0]}${splitName[1][0]}`;
    // }

    return {
      sx: {
        bgcolor: stringToColor(name),
        display: "inline-block",
        width: "35px",
        height: "35px",
        borderRadius: "50%",
        color: "white",
        fontSize: "16px",
        textAlign: "center",
        lineHeight: "35px",
        fontWeight: "bold",
        margin: "0",
        padding: "0",
      },
      children: displayName,
    };
  }

  return <Avatar {...stringAvatar(name)} />;
};

export default NamedColoredAvatar;
