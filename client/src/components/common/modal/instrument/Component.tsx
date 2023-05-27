import toBase64 from "@/utils/fileToBase64";
import { useEffect, useState } from "react"
import { Button, Form, Image, Input, Modal } from 'semantic-ui-react'

//TODO: create + edit variations
export default function InstrumentModal({title, submit, open, setOpen, triggerNode, instrumentData}: any) {
  const [img, setImg]:any = useState();
  console.log(instrumentData?.[0])

  useEffect(()=> {
    if(instrumentData) {
      setImg(instrumentData?.[0]?.url)
      return;
    }

    setImg();
  }, [open, instrumentData])

  const uploadImage = async (e: any)=> {
    if(setImg) {
      const base64Img = await toBase64(e.target.files[0]);
      setImg(base64Img);
    }
  }


  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={triggerNode || <Button style={{borderRadius:0}}>{title}</Button>}
      size="tiny"
    >
      <Modal.Content>
        <Form onSubmit={submit}>
          <Form.Field>
            <Modal.Header>{title}</Modal.Header>
          </Form.Field>
          <Form.Field>
            <Input type='text' name='title' style={{width:'100%'}} placeholder={`Введите название`} required defaultValue={instrumentData?.[0]?.title}/>
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