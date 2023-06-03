import { Button, Dropdown, Form, Grid, GridColumn, Header, Icon, Image, Menu, Segment, TextArea } from "semantic-ui-react";
import { ExInterface } from "../../interfaces";
import DynamicElement from "./dynamicElement";
import { ReactNode, useEffect, useState } from "react";
import AddInstrumentModal from "@/components/common/modal/instrument";
import { useRouter } from "next/router";
import NavTop3 from "../../common/nav/top-layer3";
import { usePatchData, usePatchDataM, useUpload } from "@/hooks/fetching";
import toBase64, { dataURLtoFile } from "@/utils/fileToBase64";
import Link from "next/link";

export default function ExerciseComponent({exercise, dElements, changeDynamicElements, instruments}: ExInterface){
  const [descriptionV, setDescriptionV] = useState(exercise?.description);
  // console.log(exercise);
  const { trigger } = usePatchDataM('/exercises/'+exercise?.id);
  const imageSender = useUpload('/media/upload');

  const [img, setImg]:any = useState();
  const [file, setFile]: any = useState();

  useEffect(()=>{
    if(exercise) {
      setDescriptionV(exercise?.description);
    }
    if(exercise?.url) {
      setImg(exercise?.url);
    }
  }, [exercise])
  // todo: refactoring
  const sendData = async ()=> {
    const formData: any = new FormData();

    const exElems = document.querySelectorAll('.box');

    let tempArr:any = [];

    exElems.forEach((el:any)=> {
      tempArr.push(
        {
          x: el.getAttribute('x'), 
          y: el.getAttribute('y'), 
          width: el.style.width,
          height: el.style.height,
          exerciseElId: el.getAttribute('instrument_id'), 
          exerciseId: exercise.id + ''
        }
      )
    })

    let dataObj: any = {
      id: exercise.id,
      title: exercise.title,
      description: descriptionV,
      exerciseElCoordinates: tempArr,
    }

    if(file) {
      formData.append('file', file);

      dataObj.url = await (await imageSender.trigger(formData))?.json();

      console.log(dataObj.url)
    }

    const jsonData: any = JSON.stringify(dataObj);

    trigger(jsonData);
  }

  return(
    <>
      <Button 
        onClick={sendData} 
        style={{marginTop:'20px', position: 'absolute', zIndex: '1', top: '-55px', right:'10px'}}
      >Сохранить
      </Button>
      <NavTop3 title={exercise?.title}>
        <Dropdown position='right' item icon='wrench' simple>
          <Dropdown.Menu>
            <Dropdown.Item >
              <Form style={{border:'none'}}>
                <label className="input-file"
                  onChange={async (e:any)=> {
                    if(setImg) {
                      const base64Img = await toBase64(e.target.files[0]);
                      setImg(base64Img);
                    }
                    if(setFile) {
                      setFile(e.target.files[0]);
                    }
                  }}>
                  <input type="file" name="file" accept=".png, .jpg, .jpeg"/>		
                  <span>Загрузить изображение</span>
                </label>
              </Form>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link 
                href={{pathname:'/admin/instruments'}}>
                Редактировать список инструментов
              </Link>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </NavTop3>
      <Grid >
        <GridColumn width={12} >
          <Segment>
            <Form>
              <TextArea className='tempDescription' placeholder='Введите описание' style={{ minHeight: 100 }} onChange={(e)=>setDescriptionV(e.target.value)} value={descriptionV}/>
            </Form>
          </Segment>
          <Segment style={{width:'605px', height:'450px'}} className="dynamic-container">
            {dElements}
            <div
              style={{
                width:'100%',
                height:'100%',
                display:'flex',
                alignItems:'center',
                justifyContent: 'center'
              }}
            >
             <Image src={img} style={{ userSelect:'none', drag:'none', maxWidth:'100%', maxHeight:'100%'}} fluid centered verticalAlign="middle"/>
            </div>
          </Segment>
        </GridColumn>
        <GridColumn width={4} style={{paddingLeft:0, overflow:'hidden'}} stretched>
          <Segment >
            <AddInstrumentModal 
              title={'Добавить новый инструмент'}
              modalType='instrument'
              method='POST'
              route={'/instruments/'}
              />
            <p>Панель инструментов:</p> 
            {instruments?.map((el:any, i:number)=> 
            <Button key={'instrument_' + i * Math.random()}
              onClick={()=> changeDynamicElements ? changeDynamicElements(el?.id, el?.url) : null} 
              style={{padding:0, borderRadius:'100px', border:'1px solid #000'}}>
                <Image fluid style={{width:'32px', height:'32px',borderRadius:'100px'}} src={el.url}/>
            </Button>)}
          </Segment>
        </GridColumn>
      </Grid>

    </>
  )
}