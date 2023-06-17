import { Button, Icon, Table } from "semantic-ui-react";
import EditUserModal from "@/components/common/modal/user/";
import DeleteComponent from "../../deleteButton";
import Link from "next/link";
import AddUserModal from "@/components/common/modal/user/";
import TableContainerComponent from "../tableContainer";
import TableHeaderComponent from "../tableHeader";

export default function UsersTable({ array, pathname, route }: any) {
  return (
    <TableContainerComponent>
      <Table.Header
        style={{
          position: "sticky",
          top: "0px",
        }}
      >
        <Table.Row>
          <Table.HeaderCell style={{ padding: 10 }}>
            <span style={{ display: "inline-block", marginLeft: "4px" }}>
              Список пользователей:
            </span>
            <AddUserModal
              method="POST"
              route="/users/"
              triggerNode={<Icon name="plus" style={{ cursor: "pointer" }} />}
            />
          </Table.HeaderCell>
          <Table.HeaderCell></Table.HeaderCell>
          <Table.HeaderCell></Table.HeaderCell>
          <Table.HeaderCell></Table.HeaderCell>
          <Table.HeaderCell></Table.HeaderCell>
          <Table.HeaderCell></Table.HeaderCell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell style={{ padding: 10 }}>Логин</Table.HeaderCell>
          <Table.HeaderCell style={{ padding: 10 }}>Фамилия</Table.HeaderCell>
          <Table.HeaderCell style={{ padding: 10 }}>Имя</Table.HeaderCell>
          <Table.HeaderCell style={{ padding: 10 }}>Отчество</Table.HeaderCell>
          <Table.HeaderCell style={{ padding: 10 }}>Группа</Table.HeaderCell>
          <Table.HeaderCell style={{ padding: 10 }}>Роль</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {array?.map((el: any, i: any) => (
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
                <EditUserModal
                  route={route + (el.id + "")}
                  getRoute={route + (el.id + "")}
                  mutateRoute={route}
                  method="PATCH"
                  title={el.login}
                  triggerNode={
                    <Icon
                      style={{ cursor: "pointer" }}
                      name="pencil alternate"
                    />
                  }
                />
                <DeleteComponent route={route + el.id} mutateRoute={route} />
              </div>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </TableContainerComponent>
  );
}
