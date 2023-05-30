import React, { useRef, useState } from 'react';
import Draggable from 'react-draggable'; // The default
import { Button, Icon, Image, Segment } from 'semantic-ui-react';


export default function DynamicElement({remove, instrumentId, xP, yP, dElements, keyP, imgUrl}:any){
  const [start, setStart] = useState(0);
  const [drag, setDrag] = useState(0);
  const [stop, setStop] = useState(0);
  const [x, setX] = useState(+xP);
  const [y, setY] = useState(+yP);

  const handleStart = (e:any, data:any)=> {
    // console.log('start')
    // console.log("START", e, data);
  }

  const handleDrag = (e:any, data:any)=> {
    // console.log("DRUG", e, data);


  }

  const handleStop = (e:any, data:any)=> {

    // console.log("STOP", e, data.x);
    setX(data.x);
    setY(data.y);

  }

  return(
    <Draggable
      axis="both"
      handle=".handle"
      defaultPosition={{x: x, y: y}}
      position={undefined}
      grid={[1, 1]}
      bounds='parent'
      scale={1}
      onStart={handleStart}
      onDrag={handleDrag}
      onStop={handleStop}>
        <Segment className="box-set"
          x={x}
          y={y}
          instrument_id={instrumentId}
          style={{
            width: 50 + 'px', 
            height: 50 + 'px', 
            border:'1px solid #000', 
            position: 'absolute',
            zIndex: 1,
            backgroundImage: `url(${imgUrl})`,
            backgroundSize: 'contain',
            backgroundRepeat:'no-repeat',
            backgroundPosition:'center',
            margin:0
          }}>
            <div style={{backgroundColor:'#9eff00', position:'absolute', zIndex:2, width:'50%', height:'50%', borderRadius:'100px', display:'none'}}></div>
            <div style={{backgroundColor:'#8e0922', position:'absolute', zIndex:2, width:'50%', height:'50%', borderRadius:'100px', display:'none'}}></div>
            <Icon className='handle' name="arrows alternate" style={{width:'10px', height:'10px', position: 'absolute', top:0, left:0 }}></Icon>
            <Icon onClick={()=>remove(keyP, dElements)}  name="trash" style={{width:'10px', height:'10px', position: 'absolute', top:0, right:0 }}></Icon>
        </Segment>
    </Draggable>)
  }