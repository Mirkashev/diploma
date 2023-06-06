import styles from "./index.module.css";
import { Form, Popup } from "semantic-ui-react";
import React from "react";

const ArrowNode = ({ id, data }: any) => {
  const { label, update } = data;

  const onChange = (label: any) => {
    update(id, {
      label,
    });
  };

  return (
    <Popup
      on="click"
      // content='I will not flip!'
      pinned
      style={{
        marginLeft: "8px",
      }}
      trigger={
        <div>
          <div
            style={{
              wordWrap: "break-word",
              maxWidth: "80px",
              maxHeight: "10px",
              lineHeight: "10px",
              margin: "auto",
              paddingTop: "4px",
              paddingBottom: "4px",
              textAlign: "right",
            }}
          >
            {label}
          </div>
          <div className={styles[data.arrowType]}></div>
        </div>
      }
    >
      <div>
        <Form.Input
          defaultValue={data.label}
          onChange={(event) => onChange(event.target.value)}
        />
      </div>
    </Popup>
  );
};

export default ArrowNode;
