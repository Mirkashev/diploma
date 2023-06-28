import { patchData, useGetData } from "@/hooks/fetching";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button, Dropdown, Form, Icon, Modal } from "semantic-ui-react";

const AddToGroupModal = () => {
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
};

export default AddToGroupModal;
