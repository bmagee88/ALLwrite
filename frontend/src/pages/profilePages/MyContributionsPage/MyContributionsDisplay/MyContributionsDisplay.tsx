import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
// import TimeAgo from "../../../../common/components/TimeAgo/TimeAgo";
// import CoverSample from "../../../../assets/images/sample_cover_image.png";
import ContributionsCoverDisplay from "./ContributionsCoverDisplay/ContributionsCoverDisplay";
// import ContributionsPageDisplay from "./ContributionsCoverDisplay/ContributionsPageDisplay/ContributionsPageDisplay";

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

export interface Story {
  storyContributions: Contributions[];
}

export interface Contributions {
  type: "cover" | "page";
  data: CoverContribution | PageContribution;
}

interface CoverContribution {
  coverid: number;
  coverlastupdated: string;
  coverauthorname: string;
  covertitle: string;
}

interface PageContribution {
  pagenum: number;
  pageauthorname: string;
  pagebody: string;
  pagelastupdated: string;
}

interface MyContributionsDisplayProps {
  stories: Story[];
}

const MyContributionsDisplay: React.FC<MyContributionsDisplayProps> = ({ stories }) => {
  return (
    <Box>
      {stories.map((contribs, index) => {
        return (
          <ContributionsCoverDisplay
            key={index}
            story={contribs}
          />
        );

        // return (
        //   <Accordion key={index}>
        //     <AccordionSummary
        //       aria-controls='panel1-content'
        //       id='panel1-header'>
        //       <Box sx={{ display: "flex", flexDirection: "column" }}>
        //         <Box
        //           component='img'
        //           sx={{ width: "100%", height: "100%", objectFit: "cover" }}
        //           src={CoverSample}
        //         />
        //         <Box>
        //           <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
        //             <Box>
        //               <Typography fontWeight={"bold"}>{covertitle}</Typography>
        //             </Box>
        //             <Box>
        //               <TimeAgo timestamp={lastupdated} />
        //             </Box>
        //           </Box>
        //           <Box>Pg.&nbsp;{pagenum}</Box>
        //         </Box>
        //       </Box>
        //     </AccordionSummary>
        //     <AccordionDetails>
        //       <StyledLink to={`/dashboard/reading/${covertitle}/${pageid}`}>
        //         <Typography>{pagebody}</Typography>
        //       </StyledLink>
        //     </AccordionDetails>
        //   </Accordion>
        // );
      })}
    </Box>
  );
};

export default MyContributionsDisplay;
