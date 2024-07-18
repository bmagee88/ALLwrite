import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import SelectableIcon from "../SelectableIcon/SelectableIcon";
import Unpinned from "@mui/icons-material/PushPinOutlined";
import Pinned from "@mui/icons-material/PushPin";

const PIN_BY_USER_AND_PAGE_ENDPOINT = `/api/pin/by-user-by-page`;
const PIN_ADD_OR_DELETE_ENDPOINT = "/api/pin/add-or-delete";

interface PinProps {
  userId: number;
  pageId: number;
}

const Pin: React.FC<PinProps> = ({ userId, pageId }) => {
  console.log(`userId${userId}--pageId${pageId}`);
  const [isPinned, setIsPinned] = useState<boolean>(false);

  useEffect(() => {
    const fetchPinByUser = async (): Promise<void> => {
      console.log("fetching pinByUser");
      const result = await fetch(PIN_BY_USER_AND_PAGE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, pageId }),
      });
      const data: { data: number } = await result.json();
      const rowCount = data.data;
      //   const data = { data: [1] };
      console.log("rowCount after fetchPinByUser: ", rowCount);

      setIsPinned(rowCount > 0);
    };

    fetchPinByUser();
  }, [pageId, userId]);

  const updatePinnedPage = async () => {
    const upsertPinData = {
      userId,
      pageId,
    };
    const response = await fetch(PIN_ADD_OR_DELETE_ENDPOINT, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(upsertPinData),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("data.data after pin toggle", data.data);

      setIsPinned(data.data > 0);
      console.log("upsert good");
    } else {
      console.log("upsert failed");
    }
  };

  return (
    <Box onClick={updatePinnedPage}>
      <SelectableIcon
        isSelected={isPinned}
        selectedIcon={() => <Pinned fontSize={"medium"} />}
        unselectedIcon={() => <Unpinned fontSize={"medium"} />}
      />
    </Box>
  );
};

export default Pin;
