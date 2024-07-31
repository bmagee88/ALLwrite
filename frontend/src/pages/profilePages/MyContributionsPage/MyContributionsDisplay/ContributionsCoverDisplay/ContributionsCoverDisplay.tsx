import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import React from "react";
import { Story } from "../MyContributionsDisplay";
import ContributionsPageDisplay from "./ContributionsPageDisplay/ContributionsPageDisplay";

interface ContributionsCoverDisplayProps {
  story: Story;
}

const ContributionsCoverDisplay: React.FC<ContributionsCoverDisplayProps> = ({ story }) => {
  const [cover, ...pages] = story.storyContributions;
  return (
    <Accordion>
      <AccordionSummary>
        {/** all the cover stuff goes here */}
        {cover.data.covertitle}
      </AccordionSummary>

      <AccordionDetails>
        <ContributionsPageDisplay pageContributions={pages} />
      </AccordionDetails>
    </Accordion>
  );
};

export default ContributionsCoverDisplay;
