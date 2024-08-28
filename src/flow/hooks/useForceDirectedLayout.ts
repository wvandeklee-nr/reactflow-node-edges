import { forceLink, forceManyBody, forceSimulation } from "d3-force";
import { useMemo } from "react";
import { useReactFlow, useStore } from "reactflow";

const useForceDirectedLayout = (autoScaleOnChange: boolean = true) => {
  const { getNodes, setNodes, getEdges, fitView } = useReactFlow();
  const initialised = useStore((store) =>
    [...store.nodeInternals.values()].every((node) => node.width && node.height)
  );

  return useMemo(() => {
    const nodes = getNodes().map((node) => ({
      ...node,
      x: node.position.x,
      y: node.position.y,
    }));
    const edges = getEdges().map((edge) => edge);

    if (!initialised || nodes.length === 0) return () => {};

    forceSimulation(nodes)
      .force(
        "link",
        forceLink(edges)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .id((d: any) => d.id)
          .strength(0.4)
          .distance(250)
      )
      .force("charge", forceManyBody().strength(-200))
      .alphaTarget(0.15)
      .tick(300)
      .on("tick", () => autoScaleOnChange && fitView());

    const tick = () => {
      setNodes(
        nodes.map((node) => ({ ...node, position: { x: node.x, y: node.y } }))
      );
      if (!autoScaleOnChange) {
        window.requestAnimationFrame(() => {
          fitView();
        });
      }
    };

    const doLayout = () => {
      window.requestAnimationFrame(tick);
    };

    return doLayout;
  }, [autoScaleOnChange, fitView, getEdges, getNodes, initialised, setNodes]);
};

export default useForceDirectedLayout;
