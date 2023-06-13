import {
  Background,
  BackgroundVariant,
  ReactFlow,
  addEdge,
  useEdgesState,
  useNodesState,
} from "reactflow";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import ArrowNode from "../nodes/arrowNode";
import CircleNode from "../nodes/CircleNode";
import SquareNode from "../nodes/SquareNode";
import CustomEdge from "../nodes/edges/Component";
import FlowControlsAdmin from "./flowControls/adminControls";
import FlowControls from "./flowControls/userControls";
import { getRandomInt } from "@/utils/generateNumber";
import { Dropdown } from "semantic-ui-react";
import ShemaNode from "../nodes/schemaNode";

const nodeTypes = {
  arrowNode: ArrowNode,
  circleNode: CircleNode,
  squareNode: SquareNode,
  schemaNode: ShemaNode,
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

const deviceTypes = ["field", "rsu", "paz", "panel", "add_panel"];

const generateCircleLabel = (schemaNumber: string) => {
  let generatedCircleLable = "";
  deviceSymbols.forEach((el) => {
    const index = getRandomInt(0, el.length - 1);
    generatedCircleLable += el[index];
  });
  return generatedCircleLable + schemaNumber;
};

const ConnectedFlow = ({
  data,
  setRfInstance,
  isUser,
  rfInstance,
  onSave,
}: any) => {
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
    const id = (elementsCounter.current += 1);
    setNodes((nodes) => [
      ...nodes,
      {
        id: `${id}`,
        position: { x: 0, y: 100 },
        type: "circleNode",
        data: {
          label: `0`,
          update: updateNode,
          onConnect,
          checked: "false",
          trueId: `${id}`,
        },
      },
    ]);
  };

  const addSquareNode = () => {
    const id = (elementsCounter.current += 1);

    setNodes((nodes) => [
      ...nodes,
      {
        id: `${id}`,
        position: { x: 0, y: 100 },
        type: "squareNode",
        data: {
          label: `0`,
          color: "#618aef",
          update: updateNode,
          onConnect,
          trueId: `${id}`,
        },
      },
    ]);
  };

  const addArrowNode = (e: any) => {
    const id = (elementsCounter.current += 1);

    return setNodes((nodes) => [
      ...nodes,
      {
        id: `${id}`,
        position: { x: 0, y: 100 },
        type: "arrowNode",
        data: {
          label: `Текст`,
          update: updateNode,
          onConnect,
          arrowType: e.target.getAttribute("type"),
          trueId: `${id}`,
        },
      },
    ]);
  };

  const addSchemaNode = (e: any) => {
    // console.log(e.target.getAttribute("type"));
    const id = (elementsCounter.current += 1);

    return setNodes((nodes) => [
      ...nodes,
      {
        id: `${id}`,
        position: { x: 0, y: 100 },
        type: "schemaNode",
        data: {
          label: "Введите текст",
          update: updateNode,
          color: "#618aef",
          rotate: 0,
          onConnect,
          shemaNodeType: e.target.getAttribute("type"),
          trueId: `${id}`,
        },
      },
    ]);
  };

  const createCircle = (data: any) => {
    setNodes((nodes) => [
      ...nodes,
      {
        id: (elementsCounter.current += 1) + "interactivePart",
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

    console.log(flow);

    if (!isUser) {
      setNodes(
        flow.nodes.map(
          (el: any) =>
            ({ ...el, data: { ...el.data, update: updateNode, onConnect } } ||
            [])
        )
      );
      setEdges(
        flow.edges.map((el: any) => ({
          ...el,
          data: { ...el.data, updateEdge: updateEdge },
        })) || []
      );
      // setViewport({ x, y, zoom });
      elementsCounter.current = Math.max(
        ...flow.nodes.map((node: any) => +node.id)
      );
      return;
    }

    const generatedNames = [];

    flow.nodes.forEach((el: any) => {
      if (el.data.checked === "true") {
        generatedNames.push(
          <Dropdown.Item
            // todo: fix bad keys and ids
            key={Math.random() * 100 + "rndmkey"}
            onClick={() => {
              createCircle(el.data);
            }}
          >
            <span>{el.data.label}</span>
          </Dropdown.Item>
        );
      }
    });

    for (let i = 0; i < 20; i += 1) {
      const generatedName = generateCircleLabel("1");
      generatedNames.push(
        <Dropdown.Item
          key={i}
          onClick={() =>
            createCircle({
              label: generatedName,
              type: deviceTypes[getRandomInt(0, deviceTypes.length - 1)],
            })
          }
        >
          <span>{generatedName}</span>
        </Dropdown.Item>
      );
    }

    setGeneratedCircles(generatedNames);

    const staticElems = flow.nodes.filter(
      (el: any) => el.data.checked !== "true"
    );

    const srcIds = flow.edges
      .filter(
        (el: any) =>
          !!flow.nodes.find(
            (elem: any) => elem.id === el.target && elem.data.checked !== "true"
          )
      )
      .filter((el: any) =>
        flow.nodes.find(
          (elem: any) => elem.id == el.source && elem.data.checked != "true"
        )
      );

    setNodes(
      staticElems.map(
        (el: any) =>
          ({
            ...el,
            draggable: false,
            deletable: false,
            data: { ...el.data, static: true, update: updateNode, onConnect },
          } || [])
      )
    );
    setEdges(
      srcIds.map((el: any) => ({
        ...el,
        deletable: false,
        data: { ...el.data, static: true },
      })) || []
    );
    // setViewport({ x, y, zoom });

    // elementsCounter.current = Math.max(...flow.nodes.id)
    elementsCounter.current = Math.max(
      ...flow.nodes.map((node: any) => +node.id)
    );
  }, [data]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      maxZoom={2}
      minZoom={0.5}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      onInit={setRfInstance}
      defaultViewport={{ x: 0, y: 0, zoom: 0.5 }}
      fitView
    >
      <Background variant={BackgroundVariant.Dots} gap={10} size={1} />
      {isUser ? (
        <FlowControls onCheck={onSave}>{generatedCircles || ""}</FlowControls>
      ) : (
        <FlowControlsAdmin
          onSave={onSave}
          addCircleNode={addCircleNode}
          addSquareNode={addSquareNode}
          addArrowNode={addArrowNode}
          addSchemaNode={addSchemaNode}
        />
      )}
    </ReactFlow>
  );
};
export default ConnectedFlow;
