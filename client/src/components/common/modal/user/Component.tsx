import toBase64 from "@/utils/fileToBase64";
import { useEffect, useState } from "react";
import { Button, Dropdown, Form, Header, Image, Input, Modal } from "semantic-ui-react";

export default function UserModalComponent({
  title, 
  submit, 
  open, 
  setOpen, 
  triggerNode, 
  userData
}: any) {
  const [img, setImg]: any = useState();

  useEffect(()=> {
    if(userData) {
      setImg(userData?.url)
      return;
    }

    setImg();
  }, [open, userData])

  const uploadImage = async (e: any)=> {
    if(setImg) {
      const base64Img = await toBase64(e.target.files[0]);
      setImg(base64Img);
    }
  }

  return(
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={triggerNode || <Button style={{borderRadius:0}}>{title}</Button>}
      >
        <form onSubmit={submit} style={{padding:'20px'}}>
          <Header>{title}</Header>
          <Modal.Content style={{display:'flex'}}>
            <div style={{position:'relative', display:'flex', alignItems:'center', justifyContent:'center', width:'100%'}}>
              <Image src={img || 'https://react.semantic-ui.com/images/wireframe/image.png'} wrapped />
              <label className="input-file" 
                onChange={uploadImage}
                style={{
                  border: '1px solid #000',
                  height: '36px',
                  display:'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '4px',
                  position:'absolute',
                }}
              >
                <input type="file" name="file" accept=".png, .jpg, .jpeg"/>		
                <span>Загрузить изображение</span>
              </label>
            </div>
            <Modal.Description 
              style={{
                width:'60%', 
                marginLeft:'20px', 
                display:'flex', 
                flexDirection:"column", 
                justifyContent:'space-between'
              }}>
              <Header>Пользовательские данные:</Header>
              <Input 
                type='text' 
                name='login' 
                style={{ marginBottom: '12px'}} 
                placeholder={`Введите логин`} 
                required 
                defaultValue={userData?.login}
              />
              <Input 
                type='text' 
                name='password' 
                style={{ marginBottom: '12px'}} 
                placeholder={`Введите пароль`} 
                required 
                defaultValue={userData?.password}
              />
              <Input 
                type='text' 
                name='surname' 
                style={{marginBottom: '12px'}} 
                placeholder={`Введите фамилию`} 
                defaultValue={userData?.surname}
              />
              <Input 
                type='text' 
                name='firstName' 
                style={{ marginBottom: '12px'}} 
                placeholder={`Введите имя`} 
                defaultValue={userData?.firstName}

              />
              <Input 
                type='text' 
                name='lastName' 
                style={{ marginBottom: '12px'}} 
                placeholder={`Введите отчество`} 
                defaultValue={userData?.lastName}
              />
              <Dropdown placeholder="Выберите роль"
                name='role'
                type='text'
                selection 
                defaultValue={userData?.role === 'teacher' ? 'teacher' : 'student'}
                options={[{key:'student', text:'Студент', value:'student'}, {key:'teacher', text:'Преподаватель', value:'teacher'}]} 
              />
            </Modal.Description>
          </Modal.Content>
          <Button
            style={{marginTop:'12px'}}
            content="Сохранить"
            labelPosition='right'
            icon='checkmark'
            positive
            type="submit"
          />
        </form>
      </Modal>
  )
}