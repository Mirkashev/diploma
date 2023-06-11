import React, { useState } from "react";
import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getBezierPath,
  getSmoothStepPath,
} from "reactflow";
import { Button, Form, Icon, Popup } from "semantic-ui-react";

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  data,
}: EdgeProps) {
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const [closePopup, setClosePopup] = useState(false);

  const styles: any = {
    default: {},
    instrumental: { stroke: "#000" },
    electrical: { stroke: "#000", strokeDasharray: 5 },
    pneumatic: { stroke: "#399cd6" },
    gidravlic: { stroke: "#3ed639" },
    programm: { stroke: "#eb9a22" },
  };

  const onChange = (value: string) => {
    data.updateEdge(id, { edgeType: value }, styles[value]);
    setClosePopup(false);
  };

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            fontSize: 12,
            // everything inside EdgeLabelRenderer has no pointer events by default
            // if you have an interactive element, set pointer-events: all
            pointerEvents: "all",
          }}
          // className="nodrag nopan"
        >
          <Popup
            on="click"
            onOpen={() => setClosePopup(true)}
            onClose={() => setClosePopup(false)}
            open={closePopup}
            trigger={
              !data.static ? (
                <Button
                  style={{
                    width: "25px",
                    height: "25px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background:
                      data.isWrong === true
                        ? "red"
                        : data.isWrong === false
                        ? "green"
                        : "#e0e1e2",
                  }}
                  icon="setting"
                />
              ) : null
            }
          >
            <Form.Select
              defaultValue={data.edgeType}
              onChange={(event, { value }: any) => onChange(value)}
              options={[
                {
                  value: "instrumental",
                  text: "Инструментальное",
                },
                {
                  value: "electrical",
                  text: "Электрическое",
                },
                {
                  value: "pneumatic",
                  text: "Пневматическое",
                },
                {
                  value: "gidravlic",
                  text: "Гидравлическое",
                },
                {
                  value: "programm",
                  text: "Программное",
                },
              ]}
            />
          </Popup>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
