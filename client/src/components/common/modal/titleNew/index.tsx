import { patchData, postData } from "@/hooks/fetching";
import useToggle from "@/hooks/toggle";
import { Button, Form, Modal } from "semantic-ui-react";

const TitleModal = ({
  method,
  route,
  mutateRoute,
  triggerNode,
  title,
}: any) => {
  const { value, toggle } = useToggle(false);
  const send =
    method === "POST"
      ? postData(route, mutateRoute)
      : patchData(route, mutateRoute);
  // TODO: REFACTOR
  const submit = async (e: any) => {
    e.preventDefault();

    let reqBody: any = {};
    const formData = new FormData(e.target);
    formData.forEach((value, key) => (reqBody[key] = value));

    reqBody = JSON.stringify(reqBody);

    const res = await send.trigger(reqBody);

    if (res && value) {
      toggle();
    }
  };

  return (
    <Modal
      onClose={toggle}
      onOpen={toggle}
      open={value}
      trigger={
        triggerNode || (
          <Button style={{ borderRadius: 0, margin: 0 }}>
            {title ? "Редактировать" : "Добавить"}
          </Button>
        )
      }
      size="mini"
    >
      <Modal.Header>{title ? "Редактировать" : "Добавить"}</Modal.Header>
      <Modal.Content>
        <Form onSubmit={submit}>
          <Form.Field>
            <Form.Input
              placeholder={`Введите название`}
              name="title"
              required
              defaultValue={title}
            />
          </Form.Field>
          <Form.Field>
            <Form.Button content="Сохранить" type="submit" />
          </Form.Field>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export default TitleModal;
