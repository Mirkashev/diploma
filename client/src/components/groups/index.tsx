import { Button, Icon, Table } from "semantic-ui-react";
import { useGetData } from "@/hooks/fetching";
import AddTitle from "@/components/common/modal/titleNew";
import DeleteComponent from "@/components/common/deleteButton";
import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "@/context/auth";
import { useRouter } from "next/router";

export default function GroupsComponent() {
  const { user }: any = useContext(AuthContext);
  const { data, isLoading, isError } = useGetData("/groups/");
  const router = useRouter();
  const { id } = router.query;

  return (
    <div
      style={{
        maxHeight: "75vh",
        overflowY: "auto",
        border: "1px solid rgba(34,36,38,.15)",
      }}
    >
      <Table celled style={{ border: "none" }}>
        <Table.Header
          style={{
            position: "sticky",
            top: "0px",
          }}
        >
          <Table.Row>
            <Table.HeaderCell>Список групп:</Table.HeaderCell>
            <Table.HeaderCell style={{ width: "5%", padding: 0 }}>
              <AddTitle
                method="POST"
                route="/groups/"
                triggerNode={
                  <Button icon="plus" style={{ marginLeft: 12.5 }} />
                }
              />
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data?.map((el: any, i: number) => (
            <Table.Row key={el.title + i}>
              <Table.Cell>
                <Link href={{ pathname: `/${user?.role}/groups/${el.id}` }}>
                  {el.title}
                </Link>
              </Table.Cell>
              <Table.Cell
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <AddTitle
                  method="PATCH"
                  route={"/groups/" + el.id}
                  mutateRoute={"/groups/"}
                  title={el.title}
                  triggerNode={
                    <Icon
                      style={{ cursor: "pointer" }}
                      name="pencil alternate"
                    />
                  }
                />
                <DeleteComponent
                  route={"/groups/" + el.id}
                  mutateRoute={"/groups/"}
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
