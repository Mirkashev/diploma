import { ChapterExercisesInterface } from "../../interfaces";
import TitleModal from "@/components/common/modal/titleNew";
import { Button, Icon, Table } from "semantic-ui-react";
import Link from "next/link";
import DeleteComponent from "@/components/common/deleteButton";
import NavTop2 from "@/components/common/nav/top-layer2/Сomponent";
import SideNav from "@/components/common/nav/left-side";

export default function ChapterExComponent({
  exercises,
  themeId,
  title,
}: ChapterExercisesInterface) {
  return (
    <>
      <NavTop2
        title={title}
        activeButton={
          <TitleModal
            route={"/exercises/" + themeId}
            method="POST"
            mutateRoute={"/topics/" + themeId}
            triggerNode={
              <Button
                style={{ background: "rgba(255,255,255,.85)", color: "#000" }}
              >
                Добавить задание
              </Button>
            }
          />
        }
      />
      <SideNav>
        <div
          style={{
            height: "65vh",
            overflowY: "scroll",
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
                <Table.HeaderCell>Название</Table.HeaderCell>
                <Table.HeaderCell style={{ width: "5%" }}>
                  Настройки
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {exercises?.map((el, i) => (
                <Table.Row key={i + Math.random()}>
                  <Table.Cell>
                    <Link
                      href={{
                        pathname: `/admin/topics/${themeId}/exercises/${el.id}`,
                      }}
                    >
                      {el.title}
                    </Link>
                  </Table.Cell>
                  <Table.Cell
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <TitleModal
                      route={"/exercises/" + el.id}
                      method="PATCH"
                      mutateRoute={"/topics/" + themeId}
                      triggerNode={
                        <Icon
                          style={{ cursor: "pointer" }}
                          name="pencil alternate"
                        />
                      }
                      title={el.title}
                    />
                    <DeleteComponent
                      route={"/exercises/" + el.id}
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
}
