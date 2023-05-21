import { Button, Form, Header, Image, Input, Modal } from 'semantic-ui-react'

export default function AddModal({title, submit, open, setOpen}: any) {
  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button style={{borderRadius:0}}>{title}</Button>}
      size="mini"
    >
      <Modal.Header>{title}</Modal.Header>
        <Modal.Content>
          <Form onSubmit={submit}> 
            <Form.Field>
              <Form.Input 
                placeholder={`Введите название`}
                name='title'
                required
                />
            </Form.Field>
            <Form.Field>
              <Form.Button
                content='Сохранить'
                type="submit"
              />
            </Form.Field>
          </Form>
        </Modal.Content>

    </Modal>
  )
}