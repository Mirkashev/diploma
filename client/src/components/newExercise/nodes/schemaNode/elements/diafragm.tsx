import { Form, Popup } from "semantic-ui-react";
import diafragm from "../../../../../../public/diafragm.svg";
import Image from "next/image";
import { Handle, Position } from "reactflow";

const SchemaNodeDiafragm = ({ data, isConnectable, onChange }: any) => {
  console.log(data);
  return (
    <Popup
      on="click"
      disabled={data.static || true}
      trigger={
        <div
          style={{
            width: "auto",
            height: "auto",
            padding: "5px",
            // background: data.color,
          }}
        >
          <div
            style={{
              margin: "auto",
              textAlign: "center",
              color: "white",
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
                left: "25px",
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
                zIndex: 1,
              }}
              // onConnect={(params) => console.log('handle onConnect', params)}
              isConnectable={isConnectable}
              id="bot"
            />
            <Image
              style={{
                transform: `rotate(${data.rotate}deg)`,
              }}
              priority
              src={diafragm}
              alt="диафрагма"
            />
          </div>
        </div>
      }
    ></Popup>
  );
};

export default SchemaNodeDiafragm;
