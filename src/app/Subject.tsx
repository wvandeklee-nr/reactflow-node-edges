import { Handle, NodeProps, Position } from "reactflow";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import { SubjectData } from "./types";

import "./Subject.css";

const nodeSize = 40;

type NodeStyle = {
  size: number;
  labelSpacing: number;
  glyphSize: number;
  glyphLeftOffset: number;
  glyphBottomOffset: number;
  fontSizeRem: number;
};

const nodeStyle: NodeStyle = {
  size: 40,
  labelSpacing: 5,
  glyphSize: 9,
  glyphLeftOffset: 23,
  glyphBottomOffset: 7,
  fontSizeRem: 0.5,
};

const offset = nodeSize / 2;
const handleStyle = {
  opacity: 0,
  transform: `translate(0px, ${offset}px)`,
};

type NodeHandleProps = {
  type: "source" | "target";
};
const NodeHandle = ({ type }: NodeHandleProps) => (
  <Handle
    type={type}
    position={Position.Top}
    style={handleStyle}
    isConnectableStart={false}
    isConnectableEnd={false}
  />
);

export function Subject({ data }: NodeProps<SubjectData>): JSX.Element {
  return (
    <div
      className="subject-node"
      style={{
        borderColor: data.riskLevel,
        outline: data.currentlyClicked ? "blue 3px solid" : "none",
        height: `${nodeStyle.size}px`,
        width: `${nodeStyle.size}px`,
      }}
    >
      <NodeHandle type="source" />
      <NodeHandle type="target" />

      <div>
        {data.subtype === "personal" ? (
          <PersonOutlineOutlinedIcon />
        ) : (
          <BusinessOutlinedIcon />
        )}
        {data.expandLinks && (
          <div
            className="expand-links"
            style={{
              height: `${nodeStyle.glyphSize}px`,
              width: `${nodeStyle.glyphSize}px`,
              bottom: `${nodeStyle.glyphBottomOffset}px`,
              left: `${nodeStyle.glyphLeftOffset}px`,
            }}
          ></div>
        )}
        <div
          className="subject-node-label"
          style={{
            paddingTop: `${nodeStyle.labelSpacing}px`,
            fontSize: `${nodeStyle.fontSizeRem}rem`,
          }}
        >
          {data.label}
        </div>
      </div>
    </div>
  );
}
