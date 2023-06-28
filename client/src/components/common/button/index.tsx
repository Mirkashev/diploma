import { ReactNode } from "react";
import { Button } from "semantic-ui-react";

interface IComponentButton {
  onClick: (...props: any) => {} | void;
  children: string | ReactNode;
}

const ComponentButton = ({ onClick, children }: IComponentButton) => {
  return (
    <Button
      onClick={onClick}
      style={{
        height: 42,
        width: "150px",
        marginRight: 20,
        background: "#fff",
        border: "1px solid rgba(34, 36, 38, 0.15)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </Button>
  );
};

export default ComponentButton;
