import Box from '@mui/material/Box';
import { useContext } from 'react';
import TruncateTextContext from '../contexts/TruncateTextContext';

const TextBox = () => {
  const { id, lineHeight, isReadingMore, maxLines, ref, text } =
    useContext(TruncateTextContext);
  return (
    <Box
      id={id}
      sx={{
        overflowWrap: 'break-word',
        width: '300px',
        lineHeight: lineHeight,
        ...(!isReadingMore
          ? {
              maxHeight: `calc(${lineHeight} * ${maxLines})`,
              overflow: 'hidden',
            }
          : {}),
      }}
      ref={ref}
    >
      {text}
    </Box>
  );
};

export default TextBox;
