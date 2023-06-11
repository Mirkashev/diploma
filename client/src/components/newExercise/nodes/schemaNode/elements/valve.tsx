import Image from "next/image";
import clapan from "../../../../../../public/clapan.svg";
import { Handle, Position } from "reactflow";
import { Button, Popup } from "semantic-ui-react";

const SchemaNodeValve = ({ data, isConnectable, onChange }: any) => {
  return (
    <Popup
      on="click"
      disabled={data.static}
      trigger={
        <div
          style={{
            width: "35px",
            height: "55px",
            // background: "#618aef",
          }}
        >
          <Handle
            type="target"
            position={Position.Left}
            style={{
              background: "#000",
              zIndex: 1,

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
              left: "41px",
              zIndex: 1,
            }}
            // onConnect={(params) => console.log('handle onConnect', params)}
            isConnectable={isConnectable}
            id="right"
          />
          <Handle
            type="target"
            position={Position.Top}
            style={{
              background: "#000",
              zIndex: 1,

              width: "10px",
              height: "10px",
              left: "21px",
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
              left: "21px",
              zIndex: 1,
            }}
            // onConnect={(params) => console.log('handle onConnect', params)}
            isConnectable={isConnectable}
            id="bot"
          />

          <Image
            style={{
              marginTop: "15px",
              transform: `rotate(${data.rotate}deg)`,
            }}
            priority
            src={clapan}
            alt="отсекатель"
          />
        </div>
      }
    >
      <Button
        icon="reply"
        onClick={(event) => onChange("rotate", (data.rotate -= 90))}
      />
      <Button
        icon="share"
        onClick={(event) => onChange("rotate", (data.rotate += 90))}
      />
    </Popup>
  );
};

export default SchemaNodeValve;
