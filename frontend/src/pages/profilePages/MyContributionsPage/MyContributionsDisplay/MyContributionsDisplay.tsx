import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import TimeAgo from "../../../../common/components/TimeAgo/TimeAgo";
import CoverSample from "../../../../assets/images/sample_cover_image.png";

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

interface MyContributionsDisplayProps {
  contributions: [];
}

const MyContributionsDisplay: React.FC<MyContributionsDisplayProps> = ({ contributions }) => {
  return (
    <Box>
      {contributions.map((contribs, index) => {
        const { covertitle, lastupdated, pageid, pagebody, pagenum } = contribs; ////
        return (
          <Accordion key={index}>
            <AccordionSummary
              aria-controls='panel1-content'
              id='panel1-header'>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Box
                  component='img'
                  sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                  src={CoverSample}
                />
                <Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                    <Box>
                      <Typography fontWeight={"bold"}>{covertitle}</Typography>
                    </Box>
                    <Box>
                      <TimeAgo timestamp={lastupdated} />
                    </Box>
                  </Box>
                  <Box>Pg.&nbsp;{pagenum}</Box>
                </Box>
              </Box>
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

export default MyContributionsDisplay;
