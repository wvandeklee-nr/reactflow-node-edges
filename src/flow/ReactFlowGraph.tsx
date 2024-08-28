import ReactFlow, {
  Controls,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
  EdgeTypes,
  NodeTypes,
} from "reactflow";
import useForceDirectedLayout from "./hooks/useForceDirectedLayout";
import { useCallback, useEffect } from "react";
import useAutofitGraphToContainer from "./hooks/useAutofitGraphToContainer";

interface ReactFlowGraphProps<N, E> {
  initialNodes: Node<N>[];
  initialEdges: Edge<E>[];
  nodeTypes?: NodeTypes;
  edgeTypes?: EdgeTypes;
  onClick: (node: Node<N>) => void;
  autoScaleOnChange?: boolean;
}

const ReactFlowGraph = <N, E>({
  initialNodes,
  initialEdges,
  nodeTypes,
  edgeTypes,
  onClick,
  autoScaleOnChange = true,
}: ReactFlowGraphProps<N, E>) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const doLayout = useForceDirectedLayout(autoScaleOnChange);

  useAutofitGraphToContainer();

  useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [initialNodes, initialEdges, setNodes, setEdges]);

  const highlightNode = useCallback(
    (nodeId?: string) => {
      setNodes((nodes) =>
        nodes.map((flowNode) => {
          flowNode.data = {
            ...flowNode.data,
            currentlyClicked: !!(nodeId && flowNode.id === nodeId),
          };
          return flowNode;
        })
      );
    },
    [setNodes]
  );

  const onNodeClick = useCallback(
    (_: React.MouseEvent<Element, MouseEvent>, node: Node<N>) => {
      highlightNode(node.id);
      onClick(node);
    },
    [highlightNode, onClick]
  );

  const OnPaneClick = useCallback(() => {
    highlightNode();
  }, [highlightNode]);

  useEffect(() => {
    doLayout();
  }, [doLayout]);

  const proOptions = { hideAttribution: true };
  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      onNodeClick={onNodeClick}
      onPaneClick={OnPaneClick}
      fitView
      proOptions={proOptions}
    >
      <Controls />
    </ReactFlow>
  );
};

export default ReactFlowGraph;
