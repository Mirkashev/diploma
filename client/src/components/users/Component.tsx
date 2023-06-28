import { Icon, Table } from "semantic-ui-react";
import ComponentCustomTable from "../common/table/customTable";
import UserModal from "@/components/common/modal/user/";
import DeleteComponent from "../common/deleteButton";

const ComponentUsers = ({ data }: any) => {
  return (
    <ComponentCustomTable
      headerArray={[
        [
          <>
            <span style={{ display: "inline-block", marginLeft: "4px" }}>
              Список пользователей:
            </span>
            <UserModal
              method="POST"
              route="/users/"
              triggerNode={<Icon name="plus" style={{ cursor: "pointer" }} />}
            />
          </>,
          "",
          "",
          "",
          "",
          "",
        ],
        ["Логин", "Фамилия", "Имя", "Отчество", "Группа", "Роль"],
      ]}
    >
      <Table.Body>
        {data?.map((el: any, i: any) => (
          <Table.Row key={el.login + i}>
            <Table.Cell>
              <span>{el.login}</span>
            </Table.Cell>
            <Table.Cell>{el?.surname || "не указана"}</Table.Cell>
            <Table.Cell>{el?.firstName || "не указано"}</Table.Cell>
            <Table.Cell>{el?.lastName || "не указано"}</Table.Cell>
            <Table.Cell>{el?.group?.title || "не указана"}</Table.Cell>
            <Table.Cell style={{ display: "flex" }}>
              <span style={{ width: "70%", display: "block" }}>
                {el?.role || "не указана"}
              </span>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "30%",
                }}
              >
                <UserModal
                  route={"/users/" + (el.id + "")}
                  getRoute={"/users/" + (el.id + "")}
                  mutateRoute={"/users/"}
                  method="PATCH"
                  title={el.login}
                  triggerNode={
                    <Icon
                      style={{ cursor: "pointer" }}
                      name="pencil alternate"
                    />
                  }
                />
                <DeleteComponent
                  route={"/users/" + el.id}
                  mutateRoute={"/users/"}
                />
              </div>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </ComponentCustomTable>
  );
};

export default ComponentUsers;
