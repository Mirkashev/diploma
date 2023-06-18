import { AuthContext } from "@/context/auth";
import { useGetData, patchData } from "@/hooks/fetching";
import Page from "@/layouts/page";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import {
  Button,
  Container,
  Dropdown,
  Form,
  Icon,
  Modal,
  Table,
} from "semantic-ui-react";
import { mutate } from "swr";
import TabsNavComponent from "../common/nav/tabs";
import TableContainerComponent from "../common/table/tableContainer";
import TableHeaderComponent from "../common/table/tableHeader";
// import AddGroupModal from '@/components/common/modal'

function AddToGroupModal() {
  const router = useRouter();

  const { group_id } = router.query;
  const [open, setOpen] = useState(false);
  const [selectedUser, setUser]: any = useState({});
  // добавить роут где group_id === null
  const { data, isLoading, isError, mutate } = useGetData("/users/nogroup");
  // console.log(data);

  if (isLoading) return <div>...Loading</div>;

  if (isError) return <div>There is some error, try to update page</div>;

  const submit = async (e: any) => {
    const send = patchData("/users/" + selectedUser.id, "/groups/" + group_id);

    e.preventDefault();

    const res = await send.trigger(
      JSON.stringify({ ...selectedUser, groupId: group_id })
    );

    if (res) {
      setOpen(false);
      mutate();
    }
  };

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Icon name="plus" />}
      size="mini"
    >
      <Form style={{ padding: "20px" }} onSubmit={submit}>
        <Form.Field>
          <Dropdown
            placeholder="Выберите пользователя"
            id="role"
            name="role"
            type="text"
            selection
            // defaultValue={userData?.role === 'teacher' ? 'teacher' : 'student'}
            options={data?.map((el: any) => ({
              key: el.id,
              text: "логин: " + el.login + "; фамилия: " + el?.surname,
              value: Math.random() + "val" + el.login,
              onClick: () => setUser(el),
            }))}
          />
        </Form.Field>
        <Form.Field>
          <Button type="submit">Добавить</Button>
        </Form.Field>
      </Form>
    </Modal>
  );
}

const GroupComponent = () => {
  const { user }: any = useContext(AuthContext);
  const router = useRouter();

  const { group_id, id } = router.query;

  const { data, isLoading, isError } = useGetData("/groups/" + group_id);

  const removeFromGroup = async (el: any) => {
    const patchUser = patchData("/users/" + el.id, "/groups/" + group_id);
    el.groupId = null;

    await patchUser.trigger(JSON.stringify(el));

    mutate("/users/nogroup");
  };

  if (isLoading) return <div>...Loading</div>;

  if (isError) return <div>There is some error, try to update page</div>;

  return (
    <TabsNavComponent
      links={[
        {
          key: "groups",
          name: "Назад",
          onClick: () => router.push(`/${user?.role}/groups`),
        },
      ]}
    >
      <TableContainerComponent>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell style={{ display: "flex" }}>
              <span style={{ marginRight: "4px" }}>
                Список пользователей группы:{" "}
              </span>{" "}
              <AddToGroupModal />
            </Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell>Логин</Table.HeaderCell>
            <Table.HeaderCell>Фамиля</Table.HeaderCell>
            <Table.HeaderCell>Имя</Table.HeaderCell>
            <Table.HeaderCell
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              Отчество
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
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
                  onClick={() => removeFromGroup(el)}
                  name="trash alternate"
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </TableContainerComponent>
    </TabsNavComponent>
  );
};

export default GroupComponent;
