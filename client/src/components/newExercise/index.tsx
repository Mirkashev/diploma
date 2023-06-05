import { useCallback } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  Panel,
  addEdge,
  useEdgesState,
  useNodesState,
} from "reactflow";

import "reactflow/dist/style.css";
import { Container, Dropdown, Icon, Menu } from "semantic-ui-react";

const initialNodes = [
  // {
  //   id: "1",
  //   position: { x: 0, y: 0 },
  //   data: { label: "1" },
  //   style: { width: "calc(100% - 1px)", height: "calc(100% - 1px)" },
  //   draggable: false,
  //   selectable: false,
  // },
  {
    id: "2",
    position: { x: 0, y: 0 },
    data: { label: "2" },
    // expandParent: false,
    // parentNode: "1",
    // extent: "parent",
    // width: "100px",
    style: { width: "100px", height: "100px" },
  },
  {
    id: "3",
    position: { x: 0, y: 100 },
    data: { label: "3" },
    // expandParent: false,
    // parentNode: "1",
    // extent: "parent",
    // width: "100px",
    style: { width: "100px", height: "100px" },
  },
];

const initialEdges = [{ id: "e1-2", source: "2", target: "3" }];

const Exercise = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const addNode = () => {
    setNodes([
      ...nodes,
      {
        id: `${nodes.length + 1}`,
        position: { x: 0, y: 100 },
        data: { label: `${nodes.length + 1}` },
        // expandParent: false,
        // parentNode: "1",
        // extent: "parent",
        style: { width: "100px", height: "100px" },
      },
    ]);
  };

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <Container style={{ height: "calc(100vh - 140px)", marginTop: "60px" }}>
      <div
        style={{
          width: "100%",
          height: "100%",
          border: "1px solid #000",
          borderRadius: "4px",
        }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          // panOnDrag={false}
          maxZoom={2}
          minZoom={0.5}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
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
          <Controls />
          <Panel position="top-left">
            <Menu style={{ width: "100%" }}>
              <Dropdown item text="Строительные блоки схемы" simple>
                <Dropdown.Menu>
                  <Dropdown.Item>
                    <Icon name="dropdown" />
                    <span className="text">Тело схемы</span>

                    <Dropdown.Menu>
                      <Dropdown.Item onClick={addNode}>
                        Синий квадрат
                      </Dropdown.Item>
                      <Dropdown.Item>Желтый квадрат</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Icon name="dropdown" />
                    <span className="text">Вход и выход</span>

                    <Dropdown.Menu>
                      <Dropdown.Item>Синяя линия</Dropdown.Item>
                      <Dropdown.Item>Желтая линия</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown.Item>
                  {/* <Dropdown.Item>Open</Dropdown.Item>
                  <Dropdown.Item>Save...</Dropdown.Item>
                  <Dropdown.Item>Edit Permissions</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Header>Export</Dropdown.Header>
                  <Dropdown.Item>Share</Dropdown.Item> */}
                </Dropdown.Menu>
              </Dropdown>
              <Menu.Item
                name="reviews"
                // active={activeItem === 'reviews'}
                // onClick={this.handleItemClick}
              />
              <Menu.Item
                name="upcomingEvents"
                // active={activeItem === 'upcomingEvents'}
                // onClick={this.handleItemClick}
              />
              <Menu.Item
                name="upcomingEvents"
                // active={activeItem === 'upcomingEvents'}
                // onClick={this.handleItemClick}
              />
              <Menu.Item
                name="upcomingEvents"
                // active={activeItem === 'upcomingEvents'}
                // onClick={this.handleItemClick}
              />
              <Menu.Item
                name="upcomingEvents"
                // active={activeItem === 'upcomingEvents'}
                // onClick={this.handleItemClick}
              />
              <Menu.Item
                name="upcomingEvents"
                // active={activeItem === 'upcomingEvents'}
                // onClick={this.handleItemClick}
              />
            </Menu>
          </Panel>
        </ReactFlow>
      </div>
    </Container>
  );
};
export default Exercise;
