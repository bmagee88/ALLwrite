import Box from '@mui/material/Box';
import { useState } from 'react';
import { useTruncatedElement } from '../../hooks/useTruncatedElement/useTrunctatedElement';
import PropTypes from 'prop-types';
import TextBox from './TextBox';
import ShowMore from './ShowMore';
import TruncateTextContext from './contexts/TruncateTextContext';
import { TruncatedTextProps } from './interfaces/truncate-text.interface';
import { useTruncateTextReferences } from './hooks/useTruncateTextReferences';

const TruncatedText = ({
  children: text,
  maxLines = 3,
  lineHeight = '1.2em',
  moreText = 'Read More',
  lessText = 'Read Less',
  expandButtonStyles,
  id,
}: TruncatedTextProps) => {
  const { ref, refCallback } = useTruncateTextReferences();

  const { isTruncated } = useTruncatedElement(refCallback);

  const [isReadingMore, setIsReadingMore] = useState(false);

  const contextValue = {
    children: text,
    maxLines,
    lineHeight,
    moreText,
    lessText,
    isTruncated,
    expandButtonStyles,
    setIsReadingMore,
    isReadingMore,
    id,
    ref,
    text,
  };

  return (
    <TruncateTextContext.Provider value={contextValue}>
      <Box id="needed-dont-question-it">
        <TextBox />
        <ShowMore />
      </Box>
    </TruncateTextContext.Provider>
  );
};

TruncatedText.propTypes = {
  children: PropTypes.string.isRequired,
  expandButtonStyles: PropTypes.shape({
    fontWeight: PropTypes.string,
    fontSize: PropTypes.string,
    color: PropTypes.string,
  }),
};

export default TruncatedText;
