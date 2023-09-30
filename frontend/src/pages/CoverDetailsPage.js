import React from "react";
import { useParams } from "react-router-dom";

const CoverDetails = () => {
  const {cover_id} = useParams();

  return <>cover details for cover id: {cover_id}</>;
};

export default CoverDetails;
