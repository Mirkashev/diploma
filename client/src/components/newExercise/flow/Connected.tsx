import {
  Background,
  BackgroundVariant,
  ReactFlow,
  addEdge,
  useEdgesState,
  useNodesState,
} from "reactflow";
import FlowComponent from "./Component";
import { useCallback, useEffect, useRef, useState } from "react";
import ArrowNode from "../nodes/arrowNode";
import CircleNode from "../nodes/CircleNode";
import SquareNode from "../nodes/SquareNode";
import CustomEdge from "../nodes/edges/Component";
import FlowControlsAdmin from "./flowControls/adminControls";
import FlowControls from "./flowControls/userControls";
import { getRandomInt } from "@/utils/generateNumber";
import { Dropdown } from "semantic-ui-react";

const nodeTypes = {
  arrowNode: ArrowNode,
  circleNode: CircleNode,
  squareNode: SquareNode,
};

const edgeTypes = {
  customEdge: CustomEdge,
};
// todo: дописать
const deviceSymbols = [
  [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "K",
    "L",
    "M",
    "P",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
  ],
  ["Q", "J", "F", "D"],
  ["I", "R", "C", "S", "A", "E", "T", "K", "Y", "V"],
];

const generateCircleLabel = (schemaNumber: string) => {
  let generatedCircleLable = "";
  deviceSymbols.forEach((el) => {
    const index = getRandomInt(0, el.length - 1);
    generatedCircleLable += el[index];
  });
  return generatedCircleLable + schemaNumber;
};

const ConnectedFlow = ({ data, setRfInstance, isUser }: any) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [generatedCircles, setGeneratedCircles]: any = useState([]);
  const elementsCounter = useRef(0);

  const updateEdge = (id: any, data: any, style: any) => {
    return setEdges((edges) => {
      return edges.map((edge) => {
        if (edge.id === id) {
          return {
            ...edge,
            style: style,
            data: {
              ...edge.data,
              ...data,
            },
          };
        } else {
          return edge;
        }
      });
    });
  };

  const onConnect = useCallback(
    (params: any) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            style: { stroke: "#000" },
            type: "customEdge",
            data: {
              edgeType: "instrumental",
              updateEdge: updateEdge,
            },
          },
          eds
        )
      ),
    [setEdges]
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
        id: `${(elementsCounter.current += 1)}`,
        position: { x: 0, y: 100 },
        type: "circleNode",
        data: { label: `0`, update: updateNode, onConnect, checked: "false" },
      },
    ]);
  };

  const addSquareNode = () => {
    setNodes((nodes) => [
      ...nodes,
      {
        id: `${(elementsCounter.current += 1)}`,
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
        id: `${(elementsCounter.current += 1)}`,
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

  const createCircle = (id: string, data: any) => {
    setNodes((nodes) => [
      ...nodes,
      {
        id: id,
        position: { x: 0, y: 100 },
        type: "circleNode",
        data: { ...data, update: updateNode, onConnect },
      },
    ]);
  };
  // todo: убрать юзлесс эффект
  useEffect(() => {
    if (!data?.exerciseSchema) return;
    const flow = JSON.parse(data?.exerciseSchema?.content);

    if (!flow) return;

    if (!isUser) {
      console.log(flow);
      setNodes(
        flow.nodes.map(
          (el: any) =>
            ({ ...el, data: { ...el.data, update: updateNode, onConnect } } ||
            [])
        )
      );
      setEdges(flow.edges || []);
      // setViewport({ x, y, zoom });
      return;
    }

    console.log(flow);

    const generatedNames = [];

    for (let i = 0; i < 20; i += 1) {
      generatedNames.push(generateCircleLabel("1"));
    }

    setGeneratedCircles(generatedNames);

    const interElems = flow.nodes.filter(
      (el: any) => el.data.checked !== "true"
    );
    console.log(interElems);
    const srcIds = flow.edges
      .map((el: any) => {
        if (!!interElems.find((elem: any) => elem.id === el.target)) {
          return { sId: el.source, tId: el.target, eType: el.data.edgeType };
        }
      })
      .filter((el: any) => el != undefined);

    console.log(srcIds);

    setNodes(
      interElems.map(
        (el: any) =>
          ({ ...el, data: { ...el.data, update: updateNode, onConnect } } || [])
      )
    );
    setEdges(flow.edges || []);
    // setViewport({ x, y, zoom });
    console.log(generatedCircles);

    elementsCounter.current = flow.nodes.length + flow.edges.length;
  }, [data]);

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
      {isUser ? (
        <FlowControls>
          {generatedCircles
            ? generatedCircles?.map((el: any, i: number) => {
                return (
                  <Dropdown.Item
                    key={i}
                    onClick={() =>
                      createCircle("fakeCircle" + i, { label: el })
                    }
                  >
                    <span>{el}</span>
                  </Dropdown.Item>
                );
              })
            : ""}
        </FlowControls>
      ) : (
        <FlowControlsAdmin
          addCircleNode={addCircleNode}
          addSquareNode={addSquareNode}
          addArrowNode={addArrowNode}
        />
      )}
    </ReactFlow>
  );
};
export default ConnectedFlow;
