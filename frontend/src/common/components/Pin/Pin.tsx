import { Box, Button, TextField as Note } from "@mui/material";
import React, { useEffect, useState } from "react";
import PinIcon from "../SelectableIcon/SelectableIcon";
import Unpinned from "@mui/icons-material/PushPinOutlined";
import Pinned from "@mui/icons-material/PushPin";

const PIN_BY_USER_AND_PAGE_ENDPOINT = `/api/pin/by-user-by-page`;
const PIN_ADD_OR_DELETE_ENDPOINT = "/api/pin/add-or-delete";
const UPDATE_NOTE_ENDPOINT = "/api/pin/update-note";

interface PinProps {
  userId: number;
  pageId: number;
}

interface PinRecord {
  id: number;
  user_id: number;
  page_id: number;
  note: string;
}

const Pin: React.FC<PinProps> = ({ userId, pageId }) => {
  const [pin, setPin] = useState<PinRecord[]>([]); // an array with 0 or 1 element
  const isPinned = pin.length !== 0;
  const [editedNote, setEditedNote] = useState<string>("");
  const userUpdatedPinNote: boolean =
    editedNote !== (isPinned && pin[0].note !== null ? pin[0].note : "");

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
      const rows: { data: PinRecord[] } = await result.json();
      const pin_data: PinRecord[] = rows.data; // an array with 0 or 1 element

      setPin(pin_data);
      if (pin_data.length > 0) {
        const initNote = pin_data[0].note !== null ? pin_data[0].note : "";
        setEditedNote(pin_data.length !== 0 ? initNote : "");
      } else {
        setEditedNote("");
      }
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

      setPin(data.data);
      setEditedNote("");
      console.log("upsert good");
    } else {
      console.log("upsert failed");
    }
  };

  const handleNoteSave = async (): Promise<void> => {
    //update database with new note
    console.log("handling save to database");
    const newRecord = { userId, pageId, note: editedNote };
    const response = await fetch(UPDATE_NOTE_ENDPOINT, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRecord),
    });
    if (response.ok) {
      await response.json();

      console.log("note update good");
      const newPin = { ...pin[0], note: editedNote };
      setPin([newPin]);
    } else {
      console.log("note update failed");
    }
  };

  const handleNoteStateUpdate = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = e.target;
    setEditedNote(value);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Box
        onClick={updatePinnedPage}
        sx={{ display: "flex", alignItems: "center" }}>
        <PinIcon
          isSelected={isPinned}
          selectedIcon={() => <Pinned fontSize={"medium"} />}
          unselectedIcon={() => <Unpinned fontSize={"medium"} />}
        />
      </Box>
      <>
        <Note
          id='pin-note'
          label='Note'
          size='small'
          sx={{ visibility: isPinned ? "visible" : "hidden" }}
          value={editedNote}
          onChange={(e) => handleNoteStateUpdate(e)}
        />
        {userUpdatedPinNote && <Button onClick={() => handleNoteSave()}>Save</Button>}
      </>
    </Box>
  );
};

export default Pin;
