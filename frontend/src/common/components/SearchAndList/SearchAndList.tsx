import Autocomplete from "@mui/material/Autocomplete";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";

interface SearchAndListProps {
  subject: string;
  options: string[];
}

const SearchAndList: React.FC<SearchAndListProps> = ({ subject, options }) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleAddItem = (event: React.SyntheticEvent, newValue: string | null) => {
    if (newValue && !selectedItems.includes(newValue)) {
      setSelectedItems([...selectedItems, newValue]);
    }
    setInputValue("");
  };

  const handleDelete = (itemToDelete: string) => () => {
    setSelectedItems((items) => items.filter((item) => item !== itemToDelete));
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const firstMatch = options.find((option) =>
        option.toLowerCase().startsWith(inputValue.toLowerCase())
      );
      if (firstMatch) {
        handleAddItem(event, firstMatch);
      }
    }
  };

  return (
    <Box>
      <Autocomplete
        options={options}
        value={null}
        open={inputValue.length > 0}
        onChange={handleAddItem}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            label={`Select ${subject}`}
            variant='outlined'
            onKeyDown={handleKeyDown}
          />
        )}
      />
      <Box sx={{ marginTop: 2 }}>
        {selectedItems.map((item) => (
          <Chip
            key={item}
            label={item}
            onDelete={handleDelete(item)}
            sx={{ marginRight: 1, marginBottom: 1 }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default SearchAndList;
