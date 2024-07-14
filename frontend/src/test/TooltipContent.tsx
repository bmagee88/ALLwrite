import React from "react";
import ReactDOM from "react-dom";

interface TooltipContentProps {
  node: any;
}

const TooltipContent: React.FC<TooltipContentProps> = ({ node }) => {
  return (
    <div className='custom-tooltip'>
      <h3>{node.label}</h3>
      <p>ID: {node.id}</p>
      <p>Additional information...</p>
    </div>
  );
};

export default TooltipContent;
