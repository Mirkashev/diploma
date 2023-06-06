import { Image } from "semantic-ui-react";

const ValveNode = ({ id, data }: any) => {
  const { label, valveType } = data;

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
          paddingTop: "44px",
          textAlign: "center",
          color: "white",
        }}
      >
        <Image src="" />
      </div>
    </div>
  );
};

export default ValveNode;
