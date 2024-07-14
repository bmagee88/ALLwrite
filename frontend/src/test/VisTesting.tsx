import Box from "@mui/material/Box";
import React, { useEffect, useRef } from "react";
import { DataSet, Network } from "vis-network/standalone/umd/vis-network.min";
import Image from "../assets/images/anon_user.png";
import ReactDOM from "react-dom";
import TooltipContent from "./TooltipContent";

interface VisNode {
  id: number;
  title: string;
  label: string;
  shape?: string;
  color?: {
    background: string;
    border: string;
    highlight: {
      background: string;
      border: string;
    };
  };
  size?: number;
  font?: {
    color: string;
    size: number;
    face: string;
    background: string;
  };
  image?: string;
  icon?: {
    face: string;
    code: string;
    size: number;
    color: string;
  };
}

interface Edge {
  id: string;
  from: number;
  to: number;
}

const VisTesting: React.FC = () => {
  const networkRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (networkRef.current) {
      console.log("doing things");
      const nodes = new DataSet<VisNode>([
        {
          id: 1,
          title: "Tooltip for Node 1",
          label: "Node 1",
          shape: "dot",
          size: 10,
          color: {
            background: "#ff6b6b",
            border: "#ff4757",
            highlight: { background: "#ff6b6b", border: "#ff4757" },
          },
          font: { color: "#ffffff", size: 14, face: "arial", background: "#ff4757" },
        },
        {
          id: 2,
          title: "Tooltip for Node 1",
          label: "Node 2",
          shape: "icon",
          icon: { face: "FontAwesome", code: "\uf007", size: 50, color: "#1e90ff" },
        },
        {
          id: 3,
          title: "Tooltip for Node 1",
          label: "Node 3",
          shape: "circularImage",
          image: Image,
          color: {
            background: "#ff6b6b",
            border: "#2ecc71",
            highlight: { background: "#2ed573", border: "#2ecc71" },
          },
        },
      ]);

      const edges = new DataSet<Edge>([
        { id: "-1", from: 1, to: 2 },
        { id: "-2", from: 1, to: 3 },
      ]);

      const container = networkRef.current;
      const data = { nodes, edges };
      const options = {
        nodes: {
          borderWidth: 2,
          shape: "circle",
          font: { size: 0 }, // Hide label text
          shadow: true, // Optional: add shadow for nodes
          scaling: {
            label: false, // Disable label scaling
          },
          shapeProperties: {
            useBorderWithImage: true, // Use border with image for circle shape
          },
        },
        tooltip: {
          delay: 300, // Delay in milliseconds before showing the tooltip
          fontSize: 14, // Font size for the tooltip text
          color: {
            border: "#666", // Border color of the tooltip
            background: "#f9f9f9", // Background color of the tooltip
          },
          render: (props: any) => {
            console.log("props", props);
            const tooltipContainer = document.createElement("div");
            ReactDOM.render(<TooltipContent node={props.node} />, tooltipContainer);
            return tooltipContainer;
          },
        },
        interaction: {
          hover: true,
        },
        physics: {
          enabled: true,
        },
      };

      new Network(container, data, options);
    } else {
      console.log("not doing thigngs");
    }
  }, []);
  return (
    <div>
      <Box sx={{ display: "flex", justifyContent: "center" }}>testing vis</Box>
      <Box
        id='mynetwork'
        ref={networkRef}
        style={{ height: "500px" }}
      />
      ;
    </div>
  );
};

export default VisTesting;
