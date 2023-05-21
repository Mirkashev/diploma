import { Button, Dropdown, Form, Grid, GridColumn, Header, Icon, Image, Menu, Segment, TextArea } from "semantic-ui-react";
import { ExInterface } from "../../interfaces";
import DynamicElement from "./dynamicElement";
import { ReactNode, useEffect, useState } from "react";
import AddInstrumentModal from "@/components/common/modal/instrument/Component";

const saveExerciseEl = async (id:number, data: string)=> {
    console.log(id, data);
    const response = await fetch('http://localhost:3030/instruments', {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
        "Authorization" : `Bearer ${localStorage.getItem('token')}`
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({title: data, themeId: id})
    })
    if(!response.ok) {
      alert('smthing wrong');
    }
}

export default function ExerciseComponent({exercise, toggleShowTest, dElements, changeDynamicElements, instruments}: ExInterface){
  console.log(exercise);

  const [exerciseData, setExerciseData] = useState('');

  return(
    <>
      <Button 
        // onClick={()=> sendTheory(theme.id, data)} 
        style={{marginTop:'20px', position: 'absolute', zIndex: '1', top: '-55px', right:'10px'}}
      >Сохранить
      </Button>
      <Menu attached='top' style={{marginBottom:'12px', marginTop:'0px'}}>
        <Menu.Item
          onClick={()=> toggleShowTest(false)}
        >назад</Menu.Item>
        <Menu.Item position='left' header>{exercise.title}</Menu.Item>
        <Dropdown position='right' item icon='wrench' simple>
          <Dropdown.Menu>
            <Dropdown.Item>Загрузить изображение</Dropdown.Item>
            <Dropdown.Item>Редактировать список инструментов</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu>
      <Grid >
        <GridColumn width={12} >
          <Segment>
            <Form>
              <TextArea placeholder='Введите описание' style={{ minHeight: 100 }} value={'описание задания будет приведено здесь'}/>
            </Form>
          </Segment>
          <Segment style={{width:'100%'}} className="dynamic-container">
            {dElements}
            <Image src={exercise?.url} style={{maxWidth:'400px', maxHeight: '800px', userSelect:'none', drag:'none'}} fluid centered/>
          </Segment>
        </GridColumn>
        <GridColumn width={4} style={{paddingLeft:0, overflow:'hidden'}} stretched>
          <Segment >
            <AddInstrumentModal 
              title={'Добавить новый инструмент'}
              data={exerciseData}
              setData={setExerciseData}
              save={saveExerciseEl}
              id={exercise?.id}
              />
            <p>Панель инструментов:</p> 
            {instruments?.map((el, i)=> 
            <Button key={'instrument_' + i * Math.random()}
              onClick={()=> changeDynamicElements ? changeDynamicElements() : null} 
              style={{padding:0, borderRadius:'100px', border:'1px solid #000'}}>
                <Image fluid style={{width:'32px', height:'32px',borderRadius:'100px'}} src={el.url}/>
            </Button>)}
          </Segment>
        </GridColumn>
      </Grid>

    </>
  )
}