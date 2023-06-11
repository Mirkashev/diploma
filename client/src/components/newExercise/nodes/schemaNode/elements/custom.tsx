import { HexColorPicker } from "react-colorful";
import { Form, Popup } from "semantic-ui-react";

const SchemaNodeCustom = ({ data, isConnectable, onChange }: any) => {
  console.log(data);
  return (
    <Popup
      on="click"
      disabled={data.static}
      trigger={
        <div
          style={{
            width: "auto",
            height: "auto",
            padding: "5px",
            background: data.color,
          }}
        >
          <div
            style={{
              margin: "auto",
              textAlign: "center",
              color: "white",
            }}
          >
            <div>{data.label || "Введите текст"}</div>
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

export default SchemaNodeCustom;
