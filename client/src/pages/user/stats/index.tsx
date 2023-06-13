import { AuthContext } from "@/context/auth";
import { useGetData } from "@/hooks/fetching";
import Page from "@/layouts/page";
import { useContext } from "react";
import { Container, Table } from "semantic-ui-react";

export default function StatsPage() {
  const { user }: any = useContext(AuthContext);
  const { data, isLoading, isError } = useGetData("/results/" + user?.sub);

  console.log(data);

  if (isLoading) return <div>...Loading</div>;

  if (isError) return <div>There is some error, try to update page</div>;

  return (
    <Page title="Профиль">
      <div
        style={{
          maxHeight: "75vh",
          overflowY: "auto",
          border: "1px solid rgba(34,36,38,.15)",
        }}
      >
        <Table celled style={{ margin: 0, border: "none", height: "150px" }}>
          <Table.Header
            style={{
              position: "sticky",
              top: "0px",
            }}
          >
            <Table.Row>
              <Table.HeaderCell>#</Table.HeaderCell>
              <Table.HeaderCell>Тест</Table.HeaderCell>
              <Table.HeaderCell>Проценты</Table.HeaderCell>
              <Table.HeaderCell>Дата прохождения</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data?.map((el: any, i: any) => (
              <Table.Row key={i}>
                <Table.Cell>{i}</Table.Cell>
                <Table.Cell>{el?.test?.title || "-"}</Table.Cell>
                <Table.Cell>
                  {el?.percent.toString().substring(0, 4) || "0"}%
                </Table.Cell>
                <Table.Cell>
                  {new Date(el?.createdAt).toLocaleDateString("ru") || "-"}{" "}
                  {`${new Date(el?.createdAt).getHours()}:${new Date(
                    el?.createdAt
                  ).getMinutes()}` || "-"}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </Page>
  );
}
