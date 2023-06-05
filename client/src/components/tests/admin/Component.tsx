import AddModal from "@/components/common/modal/titleNew";
import { ChapterTestsInterface } from "../../interfaces";
import SideNav from "@/components/common/nav/left-side";
import NavTop2 from "@/components/common/nav/top-layer2/Сomponent";
import { Button, Icon, Table } from "semantic-ui-react";
import Link from "next/link";
import DeleteComponent from "@/components/common/deleteButton";
import TitleModal from "@/components/common/modal/titleNew";

const AdminTestComponent = ({
  themeId,
  tests,
  title,
}: ChapterTestsInterface) => {
  return (
    <>
      <NavTop2
        title={title}
        activeButton={
          <TitleModal
            route={"/tests/" + themeId}
            method="POST"
            mutateRoute={"/topics/" + themeId}
            triggerNode={
              <Button
                style={{ background: "rgba(255,255,255,.85)", color: "#000" }}
              >
                Добавить тест
              </Button>
            }
          />
        }
      />
      <SideNav>
        <div
          style={{
            maxHeight: "65vh",
            overflowY: "auto",
            border: "1px solid rgba(34,36,38,.15)",
            borderRadius: "4px",
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
                <Table.HeaderCell>Название теста</Table.HeaderCell>
                <Table.HeaderCell style={{ width: "5%" }}>
                  Настройки
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {tests?.map((el, i) => (
                <Table.Row key={i + Math.random()}>
                  <Table.Cell style={{ padding: 0 }}>
                    <Link
                      href={{
                        pathname: `/admin/topics/${themeId}/tests/${el.id}`,
                      }}
                      style={{
                        display: "block",
                        width: "100%",
                        padding: "10px",
                      }}
                    >
                      {el.title}
                    </Link>
                  </Table.Cell>
                  <Table.Cell
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <TitleModal
                      route={"/tests/" + el.id}
                      mutateRoute={"/topics/" + themeId}
                      method="PATCH"
                      title={el.title}
                      triggerNode={
                        <Icon
                          style={{ cursor: "pointer" }}
                          name="pencil alternate"
                        />
                      }
                    />
                    <DeleteComponent
                      route={"/tests/" + el.id}
                      mutateRoute={"/topics/" + themeId}
                    />
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </SideNav>
    </>
  );
};

export default AdminTestComponent;
