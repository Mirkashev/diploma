import { useCallback, useEffect, useState } from "react";
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
import {
  Button,
  Container,
  Dropdown,
  Form,
  Icon,
  Menu,
  TextArea,
} from "semantic-ui-react";
import ArrowNode from "./nodes/arrowNode";
import CircleNode from "./nodes/CircleNode";
import SquareNode from "./nodes/SquareNode";
import NavTop2 from "../common/nav/top-layer2/Сomponent";
import SideNav from "../common/nav/left-side";
import NavTop3 from "../common/nav/top-layer3/Сomponent";

const nodeTypes = {
  arrowNode: ArrowNode,
  circleNode: CircleNode,
  squareNode: SquareNode,
};

const Exercise = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [rfInstance, setRfInstance]: any = useState(
    '{"nodes":[{"width":180,"height":120,"id":"1","position":{"x":0,"y":100},"type":"squareNode","data":{"label":"0"},"positionAbsolute":{"x":0,"y":100}}],"edges":[],"viewport":{"x":241.5,"y":-16.5,"zoom":2}}'
  );

  const updateNode = (id: any, data: any) => {
    setNodes((nodes) => {
      return nodes.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            data: {
              ...node.data,
              ...data,
            },
          };
        } else {
          return node;
        }
      });
    });
  };

  const addCircleNode = () => {
    setNodes((nodes) => [
      ...nodes,
      {
        id: `${nodes.length + 1}`,
        position: { x: 0, y: 100 },
        type: "circleNode",
        data: { label: `0`, update: updateNode, onConnect },
      },
    ]);
  };

  const addSquareNode = () => {
    setNodes((nodes) => [
      ...nodes,
      {
        id: `${nodes.length + 1}`,
        position: { x: 0, y: 100 },
        type: "squareNode",
        data: { label: `0`, update: updateNode, onConnect },
      },
    ]);
  };

  const addArrowNode = (e: any) => {
    return setNodes((nodes) => [
      ...nodes,
      {
        id: `${nodes.length + 1}`,
        position: { x: 0, y: 100 },
        type: "arrowNode",
        data: {
          label: `Текст`,
          update: updateNode,
          onConnect,
          arrowType: e.target.getAttribute("type"),
        },
      },
    ]);
  };

  const onConnect = useCallback(
    (params: any) =>
      setEdges((eds) => addEdge({ ...params, type: "step" }, eds)),
    [setEdges]
  );

  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      console.log(JSON.stringify(flow));
      // localStorage.setItem('tempFlow', JSON.stringify(flow));
    }
  }, [rfInstance]);

  // useEffect(() => {
  //   if (rfInstance) {
  //     const flow = JSON.parse(rfInstance);

  //     if (flow) {
  //       // const { x = 0, y = 0, zoom = 1 } = flow.viewport;
  //       setNodes(flow.nodes || []);
  //       setEdges(flow.edges || []);
  //       // setViewport({ x, y, zoom });
  //     }
  //   }
  // }, []);

  return (
    <>
      <NavTop2 />
      <SideNav>
        <Container style={{ height: "55vh" }}>
          <NavTop3 title={"загрузка..."}>
            <Button onClick={onSave} style={{ borderRadius: 0, margin: 0 }}>
              Сохранить схему
            </Button>
          </NavTop3>
          <TextArea
            placeholder="Введите описание задачи"
            style={{
              width: "100%",
              heigh: "10vh",
              resize: "none",
              borderRadius: "0 0 4px 4px",
              border: "1px solid #d4d4d5",
              padding: "10px",
              marginBottom: "8px",
            }}
          ></TextArea>
          <div
            style={{
              width: "100%",
              height: "100%",
              border: "1px solid #d4d4d5",
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
              nodeTypes={nodeTypes}
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
              <Controls />
              <Panel position="top-left">
                <Menu style={{ width: "100%" }}>
                  <Dropdown item text="Строительные блоки схемы" simple>
                    <Dropdown.Menu>
                      <Dropdown.Item>
                        <Icon name="dropdown" />
                        <span className="text">Приборы </span>
                        <Dropdown.Menu>
                          <Dropdown.Item onClick={addCircleNode}>
                            Полевой прибор
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <Icon name="dropdown" />
                        <span className="text">Тело схемы</span>

                        <Dropdown.Menu>
                          <Dropdown.Item onClick={addSquareNode}>
                            Синий прямоугольник
                          </Dropdown.Item>
                          {/* <Dropdown.Item>Желтый квадрат</Dropdown.Item> */}
                        </Dropdown.Menu>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <Icon name="dropdown" />
                        <span className="text">Линии</span>

                        <Dropdown.Menu>
                          <Dropdown.Item type="default" onClick={addArrowNode}>
                            Горизонтальная линия
                          </Dropdown.Item>
                          <Dropdown.Item
                            type="default-vertical"
                            onClick={addArrowNode}
                          >
                            Вертикальная линия
                          </Dropdown.Item>
                          <Dropdown.Item type="right" onClick={addArrowNode}>
                            Горизонтальная линия вправо
                          </Dropdown.Item>
                          <Dropdown.Item type="left" onClick={addArrowNode}>
                            Горизонтальная линия влево
                          </Dropdown.Item>
                          <Dropdown.Item type="up" onClick={addArrowNode}>
                            Вертикальная линия вверх
                          </Dropdown.Item>
                          <Dropdown.Item type="down" onClick={addArrowNode}>
                            Вертикальная линия вниз
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <Icon name="dropdown" />
                        <span className="text">Элементы схемы</span>
                        <Dropdown.Menu>
                          <Dropdown.Item>Регулирующий клапан</Dropdown.Item>
                          <Dropdown.Item>Отсекатель</Dropdown.Item>
                          <Dropdown.Item>Задвижка</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown.Item>
                      {/* <Dropdown.Item>
                        <Icon name="dropdown" />
                        <span className="text">Примитивы</span>
                        <Dropdown.Menu>
                          <Dropdown.Item>Прямоугольник</Dropdown.Item>
                          <Dropdown.Item>Треугольник</Dropdown.Item>
                          <Dropdown.Item>Ромб</Dropdown.Item>
                          <Dropdown.Item>Трапеция</Dropdown.Item>
                          <Dropdown.Item>Овал</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown.Item> */}
                    </Dropdown.Menu>
                  </Dropdown>
                  {/* <Menu.Item>Cписок приборов задания(пока общие)</Menu.Item> */}
                </Menu>
              </Panel>
            </ReactFlow>
          </div>
        </Container>
      </SideNav>
    </>
  );
};
export default Exercise;
