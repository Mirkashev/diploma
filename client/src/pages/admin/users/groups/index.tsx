import { Container, Icon, Table } from "semantic-ui-react";
import Page from "@/layouts/page";
import SideNav from "@/components/common/nav/left-side";
// import AddGroupModal from '@/components/common/modal'
// import TableComponent from '@/components/common/table'
import { useGetData } from "@/hooks/fetching";
import AddTitle from "../../../../components/common/modal/titleNew";
import DeleteComponent from "@/components/common/deleteButton";
import Link from "next/link";

export default function UsersGroupPage() {
  const { data, isLoading, isError } = useGetData("/groups/");

  return (
    <Page title={"Редактировать пользователей"}>
      <Container
        as="main"
        style={{
          flexGrow: 1,
          maxWidth: "720px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          marginTop: "72px",
          position: "relative",
        }}
      >
        <SideNav pageType="adminUsers">
          <AddTitle method="POST" route="/groups/" />
          <div
            style={{
              maxHeight: "65vh",
              overflowY: "auto",
              border: "1px solid rgba(34,36,38,.15)",
              borderRadius: "4px",
              marginTop: "10px",
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
                  <Table.HeaderCell>Название</Table.HeaderCell>
                  <Table.HeaderCell style={{ width: "5%" }}>
                    Настройки
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {data?.map((el: any, i: number) => (
                  <Table.Row key={el.title + i}>
                    <Table.Cell>
                      <Link href={{ pathname: `/admin/users/groups/${el.id}` }}>
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
        </SideNav>
      </Container>
    </Page>
  );
}
