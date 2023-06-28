import { Table, Dropdown } from "semantic-ui-react";
import ExportToExcel from "@/components/common/exportToExecel";
import TabsNavComponent from "@/components/common/nav/tabs";
import ComponentCustomTable from "@/components/common/table/customTable";

const StatsTestComponent = ({ data, router, user, filterData }: any) => {
  return (
    <>
      <div style={{ display: "flex", marginBottom: "10px" }}>
        <ExportToExcel
          apiData={filterData(data)}
          fileName={"exportedData " + new Date().toDateString()}
        />
        <TabsNavComponent
          links={[
            {
              key: "exercise",
              name: "Упражнения",
              onClick: () => router.push(`statsEx/`),
              active: !!router.pathname.match("/statsEx"),
            },
            {
              key: "test",
              name: "Тесты",
              onClick: () => router.push(`stats/`),
              active: !!router.pathname.match("/stats"),
            },
          ]}
        />
      </div>
      <ComponentCustomTable
        headerArray={[
          "#",
          <Dropdown
            placeholder="Группа"
            selection
            onChange={(event, { value }: any) =>
              router.push(
                {
                  pathname: `/${user?.role}/stats`,
                  query: { ...router.query, group: value },
                },
                undefined,
                { shallow: true }
              )
            }
            options={[{ value: "", text: "Все группы", key: -1 }].concat(
              Array.from(
                new Set(
                  data
                    .filter(({ user }: any, i: number) => {
                      console.log(user?.group);
                      if (!!user?.group) return user?.group?.title;
                    })
                    .map((el: any) => {
                      return el?.user?.group?.title;
                    })
                )
              ).map((title: any, i: number) => ({
                value: title,
                text: title,
                key: i,
              }))
            )}
          />,
          <Dropdown
            placeholder="Тема"
            selection
            onChange={(event, { value }: any) =>
              router.push(
                {
                  pathname: `/${user?.role}/stats`,
                  query: { ...router.query, topic: value },
                },
                undefined,
                { shallow: true }
              )
            }
            options={[{ value: "", text: "Все темы", key: -1 }].concat(
              Array.from(
                new Set(
                  data.map(
                    (
                      {
                        test: {
                          topic: { title },
                        },
                      }: any,
                      i: number
                    ) => title
                  )
                )
              ).map((title: any, i: number) => ({
                value: title,
                text: title,
                key: i,
              }))
            )}
          />,
          "Тест",
          "ФИО",
          "Проценты",
          "Дата прохождения",
        ]}
      >
        <Table.Body>
          {filterData(data)?.map((el: any, i: any) => (
            <Table.Row key={el.id}>
              <Table.Cell>{i}</Table.Cell>
              <Table.Cell>{el?.user?.group?.title || "-"}</Table.Cell>
              <Table.Cell>{el?.test?.topic?.title || "-"}</Table.Cell>
              <Table.Cell>{el?.test?.title || "-"}</Table.Cell>
              <Table.Cell>
                {el?.user?.surname || "-"} {el?.user?.firstName || "-"}{" "}
                {el?.user?.lastName || "-"}
              </Table.Cell>
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
      </ComponentCustomTable>
    </>
  );
};

export default StatsTestComponent;
