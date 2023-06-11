import { Handle, Position } from "reactflow";
import relay from "../../../../../../public/relay.svg";
import Image from "next/image";

const SchemaNodeRelay = ({ data, isConnectable }: any) => {
  return (
    <div
      style={{
        width: "25px",
        height: "25px",
        // background: "#618aef",
      }}
    >
      <div
        style={{
          margin: "auto",
          textAlign: "center",
          color: "white",
        }}
      >
        <div>
          <Handle
            type="source"
            position={Position.Top}
            style={{
              background: "#fff",
              border: "1px solid #000",
              width: "10px",
              height: "10px",
            }}
            // onConnect={(params) => console.log('handle onConnect', params)}
            isConnectable={isConnectable}
            id="top"
          />
          <Image priority src={relay} alt="relay" />
        </div>
      </div>
    </div>
  );
};

export default SchemaNodeRelay;
