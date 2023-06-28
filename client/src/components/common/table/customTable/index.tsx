import { Table } from "semantic-ui-react";
import { ReactNode } from "react";

interface ICustomTable {
  children: string | ReactNode;
  headerArray: Array<Array<string | ReactNode>> | Array<string | ReactNode>;
}

const ComponentCustomTable = ({ children, headerArray }: ICustomTable) => {
  const headerRows = !!Array.isArray(headerArray?.[0])
    ? headerArray.map((row: any) => {
        return (
          <Table.Row>
            {row.map((cell: any) => {
              return <Table.HeaderCell>{cell}</Table.HeaderCell>;
            })}
          </Table.Row>
        );
      })
    : headerArray.map((cell: any) => {
        return <Table.HeaderCell>{cell}</Table.HeaderCell>;
      });

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
        <Table.Header>{headerRows}</Table.Header>
        {children}
      </Table>
    </div>
  );
};

export default ComponentCustomTable;
