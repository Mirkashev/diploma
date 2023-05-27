import React, { useRef, useState } from 'react';
import Draggable from 'react-draggable'; // The default
import { Button, Icon, Segment } from 'semantic-ui-react';
import { Resizable, ResizableBox } from 'react-resizable';


export default function DynamicElement({remove, instrumentId, xP, yP, width, height, dElements, keyP}:any){
  const [start, setStart] = useState(0);
  const [drag, setDrag] = useState(0);
  const [stop, setStop] = useState(0);
  const [sizes, setSizes] = useState({width: +width.replace('px', ''), height: +height.replace('px', '')})
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

  const onResize = (event:any, {node, size, handle}:any) => {
    setSizes({width: size.width, height: size.height});
  };

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
          
      <Resizable height={sizes.height} width={sizes.width} onResize={onResize} minConstraints={[50, 50]} maxConstraints={[100, 100]}>
        <Segment className="box"
          x={x}
          y={y}
          instrument_id={instrumentId}
          style={{
            width: sizes.width + 'px', 
            height: sizes.height + 'px', 
            border:'1px solid #000', 
            position: 'absolute',
            zIndex:1
          }}>
            <Icon className='handle' name="arrows alternate" style={{width:'10px', height:'10px', position: 'absolute', top:0, left:0 }}></Icon>
            {/* <Button icon='trash' style={{width:'10px', height:'10px', position: 'absolute', top:0, right:0 }} onClick={()=> console.log('remove')}/> */}
            <Icon onClick={()=>remove(keyP, dElements)}  name="trash" style={{width:'10px', height:'10px', position: 'absolute', top:0, right:0 }}></Icon>
        </Segment>
      </Resizable>
    </Draggable>)
  }