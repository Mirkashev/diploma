import { useState } from "react"
import { Button, Header, Image, Input, Modal } from 'semantic-ui-react'

//TODO: create + edit variations
export default function AddInstrumentModal({title, data, setData, save, id}: any) {
  const [open, setOpen] = useState(false);

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
        <Modal.Description>
          {/* <Header>Введите название темы</Header> */}
          {/* добавить поле для загрузки изображения */}
          <Input style={{width:'100%'}} placeholder={`Введите название`} onChange={(e)=> setData(e.target.value)}/>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button
          content="Сохранить"
          labelPosition='right'
          icon='checkmark'
          onClick={() => {
            setOpen(false);
            if(id) {
              save(id, data);
              return;
            }

            save(data);
          }}
          // positive
        />
      </Modal.Actions>
    </Modal>
  )
}