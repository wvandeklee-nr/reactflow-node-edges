import { useEffect } from "react";
import { useReactFlow, useStore } from "reactflow";

/*
 * Esnures that the graph size dynamically scales to the current size of its containing element
 */
const useAutofitGraphToContainer = () => {
  const widthSelector = (state: { width: number }) => state.width;
  const heightSelector = (state: { height: number }) => state.height;
  const reactFlowWidth = useStore(widthSelector);
  const reactFlowHeight = useStore(heightSelector);
  const reactFlow = useReactFlow();
  useEffect(() => {
    reactFlow.fitView();
  }, [reactFlowWidth, reactFlowHeight, reactFlow]);
};
export default useAutofitGraphToContainer;
