import { Edge, MarkerType, Node } from "reactflow";
import { SubjectData, SubjectRelationship } from "./app/types";

export type LinkExplorerLink = {
  id: string;
  from: string;
  to: string;
  type: string;
  attributes?: Record<string, string>;
};

export type LinkExplorerNode = {
  id: string;
  type: string;
  attributes?: Record<string, string>;
};

export type LinkExplorerGraph = {
  links: LinkExplorerLink[];
  nodes: LinkExplorerNode[];
};

export const graphMapper = {
  fromLinkExplorerGraph: {
    toReactFlowGraph: function (
      linkExplorerGraph: LinkExplorerGraph
    ): [Node<SubjectData>[], Edge<SubjectRelationship>[]] {
      const nodesOnly: Node<SubjectData>[] = linkExplorerGraph.nodes.map(
        generateReactFlowNodeFromLinkExplorerNode
      );

      const linksOnly: Edge<SubjectRelationship>[] =
        linkExplorerGraph.links.map(generateReactFlowLinkFromLinkExplorerLink);

      return [nodesOnly, linksOnly];
    },
  },
};

function generateReactFlowNodeFromLinkExplorerNode(
  node: LinkExplorerNode
): Node<SubjectData> {
  const isExpandable = node.attributes && node.attributes["expandLinks"];
  const riskLevel = node.attributes && node.attributes["riskLevel"];
  const label = node.attributes && node.attributes["label"];

  const reactFlowNode: Node<SubjectData> = {
    id: node.id,
    type: "subject",
    position: { x: 0, y: 0 },
    data: {
      name: label || "",
      label: getDisplayableValue(label || ""),
      subtype: node.type === "sys:personal" ? "personal" : "corporate",
      riskLevel: getColorThemeByRiskLevel(riskLevel || ""),
    },
  };

  if (isExpandable) {
    reactFlowNode.data.expandLinks = node.attributes?.["expandLinks"];
  }

  return reactFlowNode;
}

function generateReactFlowLinkFromLinkExplorerLink(
  link: LinkExplorerLink
): Edge<SubjectRelationship> {
  return {
    id: link.id,
    source: link.from,
    target: link.to,
    // label: "placeholder",
    labelShowBg: false,
    type: "customEdge",
    markerEnd: { type: MarkerType.Arrow },
    data: { strength: 1 },
  };
}

export const getColorThemeByRiskLevel = (subjectRiskLevel: string): string => {
  switch (subjectRiskLevel) {
    case "Low":
      return "rgb(22 163 74)";
    case "Medium":
      return "rgb(202 138 4)";
    case "Standard":
      return "rgb(126 34 206)";
    case "High":
      return "rgb(220 38 38)";
    case "Very High":
      return "rgb(185 28 28)";
    default:
      return "rgb(209 213 219)";
  }
};

export const getDisplayableValue = (value: string) => {
  return value
    ?.toLowerCase()
    .replace(/(^\w{1})|(\s+\w{1})/g, (letter: string) => letter.toUpperCase());
};
