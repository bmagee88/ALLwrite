import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from "@mui/material";
import React from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

interface ContinueReadingDisplayProps {
  bookmarks: [];
}

const ContinueReadingDisplay: React.FC<ContinueReadingDisplayProps> = ({ bookmarks }) => {
  return (
    <Box>
      {bookmarks.map((bookmark, index) => {
        const { covertitle, lastupdated, pageid, pagebody } = bookmark;
        return (
          <Accordion key={index}>
            <AccordionSummary
              // expandIcon={<ArrowDropDownIcon />}
              aria-controls='panel1-content'
              id='panel1-header'>
              <Typography fontWeight={"bold"}>{covertitle}</Typography>
              <Typography sx={{ pl: ".5rem", color: "grey" }}>{lastupdated}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <StyledLink to={`/dashboard/reading/${covertitle}/${pageid}`}>
                <Typography>{pagebody}</Typography>
              </StyledLink>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Box>
  );
};

export default ContinueReadingDisplay;
