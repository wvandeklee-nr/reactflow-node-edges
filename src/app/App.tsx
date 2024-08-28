import { useCallback, useState } from "react";
import { ReactFlowProvider, Node, Edge } from "reactflow";
import "reactflow/dist/style.css";

import { Subject } from "./Subject";
import { SubjectData, SubjectRelationship } from "./types";
import SubjectLink from "./SubjectLink";

import graph1Nodes from "./data/graph-1/initial-nodes";
import graph1Edges from "./data/graph-1/initial-edges";
import graph2Nodes from "./data/graph-2/initial-nodes";
import graph2Edges from "./data/graph-2/initial-edges";
import graph3Nodes from "./data/graph-3/initial-nodes";
import graph3Edges from "./data/graph-3/initial-edges";
import graph4Nodes from "./data/graph-4/initial-nodes";
import graph4Edges from "./data/graph-4/initial-edges";

import ReactFlowGraph from "../flow/ReactFlowGraph";

import "./App.css";

const customNodeTypes = { subject: Subject };
const customEdgeTypes = { subjectEdge: SubjectLink };

function ExampleApp() {
  const [initialNodes, initialEdges] = [graph1Nodes, graph1Edges]
  const [showPanel, setShowPanel] = useState(false);
  const [clickedNode, setClickedNode] = useState<Node<SubjectData>>();
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodeClickHandler = useCallback((node: Node<SubjectData>) => {
    console.log("You clicked on:", node)
    setClickedNode(node);
    setShowPanel(true);
  }, []);

  const onNodeDoubleClickHandler = useCallback((node: Node<SubjectData>) => {
    console.log("You double clicked on:", node)
  }, []);

  const onGraphChangeHandler = useCallback(
    (newGraphId: string) => {
      const [newNodes, newEdges] = getGraphFromSelectedOption(newGraphId);
      setNodes(newNodes);
      setEdges(newEdges);
    },
    [setEdges, setNodes]
  );

  function getGraphFromSelectedOption(
    graphSelection: string
  ): [Node<SubjectData>[], Edge<SubjectRelationship>[]] {
    switch (graphSelection) {
      case "1":
        return [graph1Nodes, graph1Edges];
      case "2":
        return [graph2Nodes, graph2Edges];
      case "3":
        return [graph3Nodes, graph3Edges];
      case "4":
        return [graph4Nodes, graph4Edges];
      default:
        return [graph1Nodes, graph1Edges];
    }
  }

  return (
    <>
      <select
        defaultValue={"1"}
        onChange={(e) => {
          onGraphChangeHandler(e.target.value);
        }}
      >
        <option value="1">Small Network</option>
        <option value="2">Medium Network</option>
        <option value="3">Larger Network</option>
        <option value="4">Hairball (351 nodes)</option>
      </select>
      <div className="container">
        <div className="graph">
          <ReactFlowGraph
            initialNodes={nodes}
            initialEdges={edges}
            onClick={onNodeClickHandler}
            onDoubleClick={onNodeDoubleClickHandler}
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
