import { Button, Form, Image, Input, Modal } from 'semantic-ui-react'


const InstrumentModalComponent = ({title, triggerNode, img, uploadImage, isOpen, toggleIsOpen, submit}: any)=> {
  return (
    <Modal
      onClose={toggleIsOpen}
      onOpen={toggleIsOpen}
      open={isOpen}
      trigger={triggerNode || <Button style={{borderRadius:0}}>{title}</Button>}
      size="tiny"
    >
      <Modal.Content>
        <Form onSubmit={submit}>
          <Form.Field>
            <Modal.Header>{title ? 'Редактировать инструмент' : 'Добавить инструмент'}</Modal.Header>
          </Form.Field>
          <Form.Field>
            <Input type='text' name='title' style={{width:'100%'}} placeholder={`Введите название`} required defaultValue={title}/>
          </Form.Field>
          <Form.Field>
          <Image src={img}/>
            <label className="input-file" 
              onChange={uploadImage}
              style={{
                border: '1px solid #000',
                height: '36px',
                display:'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '4px'
              }}
            >
              <input type="file" name="file" accept=".png, .jpg, .jpeg"/>		
              <span>Загрузить изображение</span>
            </label>
          </Form.Field>
          <Button
              content="Сохранить"
              labelPosition='right'
              icon='checkmark'
              type='submit'
            />
        </Form>
      </Modal.Content>

    </Modal>
  )
}

export default InstrumentModalComponent;