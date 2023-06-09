import {
  Background,
  BackgroundVariant,
  Controls,
  Panel,
  ReactFlow,
} from "reactflow";
import { Dropdown, Icon, Menu } from "semantic-ui-react";

const FlowComponent = ({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onConnect,
  nodeTypes,
  edgeTypes,
  setRfInstance,
  children,
}: any) => {
  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      // panOnDrag={false}
      maxZoom={2}
      minZoom={0.5}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      onInit={setRfInstance}
      // translateExtent={[
      //   [-0, -0],
      //   [1125, 795],
      // ]}
      // nodeExtent={[
      //   [-0, -0],
      //   [1025, 695],
      // ]}
      defaultViewport={{ x: 0, y: 0, zoom: 0.5 }}
      fitView
      // fitView={true}
    >
      <Background variant={BackgroundVariant.Dots} gap={10} size={1} />
      {children}
    </ReactFlow>
  );
};

export default FlowComponent;
