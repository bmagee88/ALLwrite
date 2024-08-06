import React, { useEffect, useState } from "react";
import { Contributions } from "../../MyContributionsDisplay";
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from "@mui/material";
import CoverSample from "../../../../../../assets/images/sample_cover_image.png";
import TimeAgo from "../../../../../../common/components/TimeAgo/TimeAgo";
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
                      <Typography fontWeight={"bold"}>Prompt</Typography>
                    </Box>
                    <Box>
                      <TimeAgo timestamp={page.data.pagelastupdated} />
                    </Box>
                  </Box>
                  <Box>Pg.&nbsp;{page.data.pagenum}</Box>
                </Box>
              </Box>
            </AccordionSummary>

            <AccordionDetails>{page.data.pagebody}</AccordionDetails>
          </Accordion>
        );
      })}
    </>
  );
};

export default ContributionsPageDisplay;
