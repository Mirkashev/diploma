import { Table } from "semantic-ui-react";

const TableBodyComponent = ({ children }: any) => {
  return <Table.Body style={{ borderRadius: 0 }}>{children}</Table.Body>;
};

export default TableBodyComponent;
