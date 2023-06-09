import React from "react";
import { Handle, Position } from "reactflow";
import { Form, Popup } from "semantic-ui-react";

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
      trigger={
        <div
          style={{
            width: "180px",
            height: "120px",
            background: "#618aef",
          }}
        >
          <Handle
            type="target"
            position={Position.Top}
            style={{
              // background: "rgb(99, 212, 84)",
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
              // background: "rgb(99, 212, 84)",
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
              // background: "rgb(99, 212, 84)",
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
              // background: "rgb(99, 212, 84)",
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
    </Popup>
  );
};

export default SquareNode;
