import { Table } from "semantic-ui-react";

const TableContainerComponent = ({ children }: any) => {
  return (
    <div
      style={{
        maxHeight: "75vh",
        width: "100%",
        overflowY: "auto",
        border: "1px solid rgba(34,36,38,.15)",
      }}
    >
      <Table celled style={{ border: "none", borderRadius: 0 }}>
        {children}
      </Table>
    </div>
  );
};

export default TableContainerComponent;
