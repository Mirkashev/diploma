import React from "react";
import { Handle, Position } from "reactflow";
import { Form, Popup } from "semantic-ui-react";
import { HexColorPicker } from "react-colorful";

const SquareNode = ({ id, data, isConnectable }: any) => {
  // console.log(data);
  const { label, update } = data;
  // console.log(update);
  const onChange = (field: string, value: string) => {
    update(id, {
      [field]: value,
    });
  };

  return (
    <Popup
      on="click"
      disabled={data.static}
      trigger={
        <div
          style={{
            width: "180px",
            height: "120px",
            background: data.color || "#618aef",
          }}
        >
          <Handle
            type="target"
            position={Position.Top}
            style={{
              background: "#000",

              width: "10px",
              height: "10px",
            }}
            // onConnect={(params) => console.log('handle onConnect', params)}
            isConnectable={isConnectable}
            id="top"
          />
          <Handle
            type="source"
            position={Position.Bottom}
            style={{
              background: "#fff",
              border: "1px solid #000",
              width: "10px",
              height: "10px",
            }}
            // onConnect={(params) => console.log('handle onConnect', params)}
            isConnectable={isConnectable}
            id="bot"
          />
          <Handle
            type="target"
            position={Position.Left}
            style={{
              background: "#000",

              width: "10px",
              height: "10px",
            }}
            // onConnect={(params) => console.log('handle onConnect', params)}
            isConnectable={isConnectable}
            id="left"
          />
          <Handle
            type="source"
            position={Position.Right}
            style={{
              background: "#fff",
              border: "1px solid #000",
              width: "10px",
              height: "10px",
            }}
            // onConnect={(params) => console.log('handle onConnect', params)}
            isConnectable={isConnectable}
            id="right"
          />
          <div
            style={{
              margin: "auto",
              paddingTop: "44px",
              textAlign: "center",
              color: "white",
            }}
          >
            {label}
          </div>
        </div>
      }
    >
      <Form.Input
        defaultValue={data.label}
        // label={""}
        onChange={(event) => onChange("label", event.target.value)}
      />
      <HexColorPicker
        style={{
          height: "100px",
          width: "100%",
          marginTop: "8px",
        }}
        color={data.color || "#618aef"}
        onChange={(newColor: string) => onChange("color", newColor)}
      />
    </Popup>
  );
};

export default SquareNode;
