import { useCallback, useState } from "react";

import { ReactFlowProvider, Node } from "reactflow";
import "reactflow/dist/style.css";

import "./App.css";

import { Subject } from "./Subject";
import { graphMapper, LinkExplorerGraph } from "./graph-mapper";
import { SubjectData } from "./types";
import SubjectLink from "./SubjectLink";

import graph1 from "./data/example-graph-1";
import graph2 from "./data/example-graph-2";
import graph3 from "./data/example-graph-3";
import graph4 from "./data/example-graph-4";
import ReactFlowGraph from "../flow/ReactFlowGraph";

const customNodeTypes = { subject: Subject };
const customEdgeTypes = { customEdge: SubjectLink };

function ExampleApp() {
  const [initialNodes, initialEdges] =
    graphMapper.fromLinkExplorerGraph.toReactFlowGraph(graph1);
  const [showPanel, setShowPanel] = useState(false);
  const [clickedNode, setClickedNode] = useState<Node<SubjectData>>();
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const handleNodeClicked = useCallback((node: Node<SubjectData>) => {
    setClickedNode(node);
    setShowPanel(true);
  }, []);

  const handleChangeOfGraph = useCallback(
    (newGraphId: string) => {
      const newLinkExplorerGraph: LinkExplorerGraph =
        getGraphFromSelectedOption(newGraphId);
      const [newNodes, newEdges] =
        graphMapper.fromLinkExplorerGraph.toReactFlowGraph(
          newLinkExplorerGraph
        );
      setNodes(newNodes);
      setEdges(newEdges);
    },
    [setEdges, setNodes]
  );

  function getGraphFromSelectedOption(
    graphSelection: string
  ): LinkExplorerGraph {
    switch (graphSelection) {
      case "1":
        return graph1;
      case "2":
        return graph2;
      case "3":
        return graph3;
      case "4":
        return graph4;
      default:
        return graph1;
    }
  }

  return (
    <>
      <select
        defaultValue={"1"}
        onChange={(e) => {
          handleChangeOfGraph(e.target.value);
        }}
      >
        <option value="1">Example 1</option>
        <option value="2">Example 2</option>
        <option value="3">Example 3</option>
        <option value="4">Example 4</option>
      </select>
      <div className="container">
        <div className="graph">
          <ReactFlowGraph
            initialNodes={nodes}
            initialEdges={edges}
            onClick={handleNodeClicked}
            nodeTypes={customNodeTypes}
            edgeTypes={customEdgeTypes}
            autoScaleOnChange={false}
          />
        </div>
        {showPanel && (
          <div onClick={() => setShowPanel(false)} className="panel">
            You clicked on {clickedNode?.data.label}
          </div>
        )}
      </div>
    </>
  );
}

export default function App() {
  return (
    <ReactFlowProvider>
      <ExampleApp />
    </ReactFlowProvider>
  );
}
