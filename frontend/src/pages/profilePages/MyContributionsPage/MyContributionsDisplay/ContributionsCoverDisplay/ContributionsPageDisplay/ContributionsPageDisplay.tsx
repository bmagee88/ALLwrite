import React from "react";
import { Contributions } from "../../MyContributionsDisplay";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

interface ContributionsPageDisplayProps {
  pageContributions: Contributions[];
}

const ContributionsPageDisplay: React.FC<ContributionsPageDisplayProps> = ({
  pageContributions,
}) => {
  return (
    <>
      {pageContributions.map((page, index) => {
        return (
          <Accordion key={index}>
            <AccordionSummary>
              {/** page info */} {page.data.pagenum}
            </AccordionSummary>

            <AccordionDetails>
              {/** page details here*/} {page.data.pagebody}
            </AccordionDetails>
          </Accordion>
        );
      })}
    </>
  );
};

export default ContributionsPageDisplay;
