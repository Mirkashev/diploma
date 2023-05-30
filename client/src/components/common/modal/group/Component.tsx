import { Button, Container, Dropdown, Header, Image, Input, Modal } from "semantic-ui-react";

export default function GroupModalComponent({
  title, 
  submit, 
  open, 
  setOpen, 
  triggerNode, 
  groupData,
  setRole
}: any) {

  return(
      <Modal
        size="tiny"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={triggerNode || <Button style={{borderRadius:0}}>{title}</Button>}
      >
        <form onSubmit={submit} style={{padding:'20px'}}>
          <Header>{title}</Header>
          <Container style={{display:'flex', flexDirection:'column'}}>
            <Header>Данные группы:</Header>
              <Input 
                type='text' 
                name='login' 
                style={{ marginBottom: '12px'}} 
                placeholder={`Введите название группы`} 
                required 
                defaultValue={groupData?.title}
              />
            <Button
              style={{marginTop:'12px'}}
              content="Сохранить"
              labelPosition='right'
              icon='checkmark'
              positive
              type="submit"
            />
          </Container>

        </form>
      </Modal>
  )
}