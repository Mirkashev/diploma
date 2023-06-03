import { Button, Form, Modal } from "semantic-ui-react";

const QuestionModalComponent = ({
  open, 
  setOpen, 
  triggerNode, 
  setRows, 
  submit, 
  question, 
  addRow, 
  rows
}: any)=> {
  return (
    <Modal
      onClose={() => {
        setOpen(false);
        setRows([]);
      }}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={triggerNode || <Button style={{margin:0, borderRadius:0}}>Добавить вопрос</Button>}
      size="large"
    >
      <Modal.Header>{question ? 'Редактировать вопрос' : 'Добавить вопрос'}</Modal.Header>
        <Modal.Content>
          <Form onSubmit={(e)=> {
            submit(e);
            setRows([]);
          }}> 
            <Form.Field>
              <Form.TextArea 
                placeholder={`Введите вопрос`}
                name='title'
                required
                defaultValue={question?.title}
                />
            </Form.Field>
            <Button onClick={addRow} style={{marginBottom:'12px'}}>Добавить ответ на вопрос</Button>
            {rows}
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

export default QuestionModalComponent;