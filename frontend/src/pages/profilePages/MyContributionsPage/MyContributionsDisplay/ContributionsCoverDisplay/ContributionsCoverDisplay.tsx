import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from "@mui/material";
import React from "react";
import { Story } from "../MyContributionsDisplay";
import ContributionsPageDisplay from "./ContributionsPageDisplay/ContributionsPageDisplay";

import CoverSample from "../../../../../assets/images/sample_cover_image.png";
import TimeAgo from "../../../../../common/components/TimeAgo/TimeAgo";

interface ContributionsCoverDisplayProps {
  story: Story;
}

const ContributionsCoverDisplay: React.FC<ContributionsCoverDisplayProps> = ({ story }) => {
  const [cover, ...pages] = story.storyContributions;
  return (
    <Accordion>
      <AccordionSummary
        aria-controls='panel1-content'
        id='contribution-summary-'>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box sx={{ maxHeight: "5rem" }}>
            <Box
              component='img'
              sx={{ width: "100%", height: "100%", objectFit: "cover" }}
              src={CoverSample}
            />
          </Box>
          <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
              <Box>
                <Typography fontWeight={"bold"}>{cover.data.covertitle}</Typography>
              </Box>
              {/* <Box>
                <TimeAgo timestamp={cover.data.coverlastupdated} />
              </Box> */}
            </Box>
            <Box>By: &nbsp;{cover.data.coverauthorname}</Box>
          </Box>
        </Box>
      </AccordionSummary>

      <AccordionDetails>
        <ContributionsPageDisplay pageContributions={pages} />
      </AccordionDetails>
    </Accordion>
  );
};

export default ContributionsCoverDisplay;
