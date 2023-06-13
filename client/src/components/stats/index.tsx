import Page from "@/layouts/page";
import { Container, Table, Menu, Dropdown } from "semantic-ui-react";
import { useGetData } from "@/hooks/fetching";
import { useRouter } from "next/router";
import * as FileSaver from "file-saver";
import XLSX from "sheetjs-style";
import { AuthContext } from "@/context/auth";
import { useContext } from "react";

const ExportToExcel = ({ apiData, fileName }: any) => {
  const dataToJson = (apiData: any) => {
    return apiData.map((el: any) => {
      return {
        Группа: el.user.group.title,
        Тема: el.test.theme.title,
        Тест: el.test.title,
        ФИО: `${el.user.surname} ${el.user.firstName} ${el.user.lastName}`,
        Проценты: el.percent,
        "Дата прохождения": el.createdAt,
      };
    });
  };

  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = (apiData: any, fileName: any) => {
    const ws = XLSX.utils.json_to_sheet(apiData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <Menu.Item
      name="export"
      style={{ cursor: "pointer" }}
      onClick={(e) => exportToCSV(dataToJson(apiData), fileName)}
    >
      <b>Выгрузить таблицу</b>
    </Menu.Item>
  );
};

const StatsComponent = () => {
  const router = useRouter();
  const { data, isLoading, isError } = useGetData("/results/");
  const { user }: any = useContext(AuthContext);

  if (isLoading) return <div>...Loading</div>;

  if (isError) return <div>There is some error, try to update page</div>;

  const filterData = (data: any) => {
    return data
      ?.filter(
        ({
          test: {
            theme: { title: theme },
          },
        }: any) => theme.includes(router.query.theme) || !router.query?.theme
      )
      ?.filter(({ user }: any) => {
        if (user?.group?.title) {
          console.log(user.group);
          return (
            user?.group.title.includes(router.query.group) ||
            !router.query?.group
          );
        }
      });
  };

  return (
    <>
      <Menu
        style={{
          width: "100%",
        }}
      >
        <Menu.Menu position="right">
          <ExportToExcel
            apiData={filterData(data)}
            fileName={"exportedData " + new Date().toDateString()}
          />
        </Menu.Menu>
      </Menu>
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
              <Table.HeaderCell>
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
                />
              </Table.HeaderCell>
              <Table.HeaderCell>
                <Dropdown
                  placeholder="Тема"
                  selection
                  onChange={(event, { value }: any) =>
                    router.push(
                      {
                        pathname: `/${user?.role}/stats`,
                        query: { ...router.query, theme: value },
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
                                theme: { title },
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
                />
              </Table.HeaderCell>
              <Table.HeaderCell>Тест</Table.HeaderCell>
              <Table.HeaderCell>ФИО</Table.HeaderCell>
              <Table.HeaderCell>Проценты</Table.HeaderCell>
              <Table.HeaderCell>Дата прохождения</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {filterData(data)?.map((el: any, i: any) => (
              <Table.Row key={el.id + i * Math.random()}>
                <Table.Cell>{i}</Table.Cell>
                <Table.Cell>{el?.user?.group?.title || "-"}</Table.Cell>
                <Table.Cell>{el?.test?.theme?.title || "-"}</Table.Cell>
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
        </Table>
      </div>
    </>
  );
};

export default StatsComponent;
