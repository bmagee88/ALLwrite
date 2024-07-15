import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import SelectableIcon from "../SelectableIcon/SelectableIcon";

import BookmarkUnselected from "@mui/icons-material/BookmarkBorderOutlined";
import BookmarkSelected from "@mui/icons-material/Bookmark";

const BOOKMARK_BY_COVER_BY_USER_ENDPOINT = `/api/bookmark/by-cover-by-user`;
interface BookmarkProps {
  userId: number;
  coverId: number;
  pageId: number;
}

const Bookmark: React.FC<BookmarkProps> = ({ userId, coverId, pageId }) => {
  //   console.log(`userId${userId}coverId${coverId}pageId${pageId}`);
  const [bookmarkedPageId, setBookmarkedPageId] = useState<number>(-1);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

  //   console.log(`bookmarkedPageId${bookmarkedPageId}isBookmarked${isBookmarked}`);
  useEffect(() => {
    const fetchBookmarkByUserAndCover = async (): Promise<void> => {
      const result = await fetch(BOOKMARK_BY_COVER_BY_USER_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, coverId }),
      });
      const data = await result.json();
      //   console.log("bookmark data", data.data);
      const pageIdNumber = parseInt(data.data.page_id);

      setBookmarkedPageId(pageIdNumber);
      //   console.log("what is pageId?", pageId);
      //   console.log("what is data.data.page_id?", data.data.page_id);
      //   console.log("what is pageIdNumber?", pageIdNumber);
      //   console.log("what is boolean for pageId===data.data.page_id?", pageId === pageIdNumber);
      setIsBookmarked(pageId === pageIdNumber);
    };

    // console.log("fetching bookmark for cover");
    fetchBookmarkByUserAndCover();
  }, [bookmarkedPageId, coverId, pageId, userId]);

  const updateBookmarkedPageForStory = async () => {
    const upsertBookmarkData = {
      userId,
      coverId,
      pageId,
    };
    const response = await fetch("/api/bookmark/upsert", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(upsertBookmarkData),
    });
    //   const data = await response.json();
    if (response.ok) {
      console.log("upsert good");
      setBookmarkedPageId(-1);
    } else {
      console.log("upsert failed");
    }
  };
  return (
    <Box onClick={() => updateBookmarkedPageForStory()}>
      <SelectableIcon
        isSelected={isBookmarked}
        selectedIcon={() => <BookmarkSelected fontSize={"medium"} />}
        unselectedIcon={() => <BookmarkUnselected fontSize={"medium"} />}
      />
    </Box>
  );
};

export default Bookmark;
