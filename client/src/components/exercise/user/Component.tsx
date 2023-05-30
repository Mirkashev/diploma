import { Button, Dropdown, Form, Grid, GridColumn, Header, Icon, Image, Menu, Segment, TextArea } from "semantic-ui-react";
import { ExInterface } from "../../interfaces";
import NavTop3 from "../../common/nav/top-layer3";
import { useState } from "react";
import { useRouter } from "next/router";
export default function UserExerciseComponent({exercise, dElements, changeDynamicElements, instruments, sElements}: ExInterface){
  const router = useRouter()
  const [isChecked, setIsChecked] = useState(false);
  const sendData = async ()=> {
    const exElems = document.querySelectorAll('.box-set');
    let positionsArray = exercise?.exerciseElCoordinates;

    exElems.forEach((el: any)=> {
      if(positionsArray) {
        for(let i = 0; i < positionsArray.length; i+=1) {
          if(
            positionsArray[i].exerciseElId == el.getAttribute('instrument_id') 
            && +positionsArray[i].x < +el.getAttribute('x') 
            && +positionsArray[i].y < +el.getAttribute('y')
            && +positionsArray[i].x + +positionsArray[i].width.replace('px', '') > 
            (+el.getAttribute('x') + +el.style.width.replace('px', ''))
            && +positionsArray[i].y + +positionsArray[i].height.replace('px', '') > 
            (+el.getAttribute('y') + +el.style.height.replace('px', ''))
            ) {
            console.log(true);
            // console.log();
            el.children[0].style.display = 'block';
            // 
            positionsArray.splice(i, 1);
            return;
          }
        }
      }
    })

    setIsChecked(true);
  }

  return(
    <>
      <NavTop3 title={exercise?.title}>
        {isChecked ? <Button style={{margin:0, borderRadius:0}} onClick={()=> router.reload()}>Перезапустить</Button> : <Button style={{margin:0, borderRadius:0}} onClick={sendData}>Проверить</Button>}
        
      </NavTop3>
      <Grid >
        <GridColumn width={12} >
          <Segment>
            <span>
              {exercise?.description}
            </span>
          </Segment>
          <Segment style={{width:'605px', height:'450px'}} className="dynamic-container">
            {sElements}
            {dElements}
            <Image src={exercise?.url} style={{maxWidth:'400px', maxHeight: '800px', userSelect:'none', drag:'none'}} fluid centered/>
          </Segment>
        </GridColumn>
        <GridColumn width={4} style={{paddingLeft:0, overflow:'hidden'}} stretched>
          <Segment >
            <p>Панель инструментов:</p> 
            {instruments?.map((el: any, i: number)=> 
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