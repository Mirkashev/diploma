import { Icon, Table } from "semantic-ui-react";
import AddToGroupModal from "../common/modal/inGroup";
import ComponentButton from "../common/button";
import ComponentCustomTable from "../common/table/customTable";

const ComponentGroup = ({ data, goBack, removeFromGroup }: any) => {
  return (
    <>
      <div style={{ marginBottom: 10 }}>
        <ComponentButton onClick={goBack}>Назад</ComponentButton>
      </div>
      <ComponentCustomTable
        headerArray={[
          [
            <>
              <span style={{ marginRight: "4px" }}>
                Список пользователей группы:{" "}
              </span>{" "}
              <AddToGroupModal />
            </>,
            "",
            "",
            "",
          ],
          ["Логин", "Фамиля", "Имя", "Отчество"],
        ]}
      >
        <Table.Body>
          {data?.users?.map((el: any, i: any) => (
            <Table.Row key={i + Math.random()}>
              <Table.Cell>
                <span>{el.login}</span>
              </Table.Cell>
              <Table.Cell>
                <span>{el?.surname || "Не указана"}</span>
              </Table.Cell>
              <Table.Cell>
                <span>{el?.firstName || "Не указана"}</span>
              </Table.Cell>
              <Table.Cell
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <span>{el?.lastName || "Не указана"}</span>
                <Icon
                  style={{ cursor: "pointer" }}
                  onClick={removeFromGroup(el)}
                  name="trash alternate"
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </ComponentCustomTable>
    </>
  );
};

export default ComponentGroup;
