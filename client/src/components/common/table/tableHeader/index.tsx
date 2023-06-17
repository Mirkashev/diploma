import { Table } from "semantic-ui-react";

const TableHeaderComponent = ({ children }: any) => {
  return (
    <Table.Header
      style={{
        position: "sticky",
        top: "0px",
      }}
    >
      <Table.Row>{children}</Table.Row>
    </Table.Header>
  );
};

export default TableHeaderComponent;
