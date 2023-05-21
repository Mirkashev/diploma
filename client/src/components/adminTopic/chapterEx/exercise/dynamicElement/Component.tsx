import React, { useState } from 'react';
import Draggable from 'react-draggable'; // The default
import { Icon, Segment } from 'semantic-ui-react';
import { Resizable, ResizableBox } from 'react-resizable';


export default function DynamicElement(){
  const [start, setStart] = useState(0);
  const [drag, setDrag] = useState(0);
  const [stop, setStop] = useState(0);
  const [sizes, setSizes] = useState({width: 75, height: 75})

  const handleStart = (e:any, data:any)=> {
    // console.log("START", e, data);
  }

  const handleDrag = (e:any, data:any)=> {
    // console.log("DRUG", e, data);


  }

  const handleStop = (e:any, data:any)=> {
    // console.log("STOP", e, data);


  }

  const onResize = (event:any, {node, size, handle}:any) => {
    setSizes({width: size.width, height: size.height});
  };

  return(
    <Draggable
      axis="both"
      handle=".handle"
      defaultPosition={{x: 0, y: 0}}
      position={undefined}
      // grid={[25, 25]}
      bounds='parent'
      scale={1}
      onStart={handleStart}
      onDrag={handleDrag}
      onStop={handleStop}>
          
      <Resizable height={sizes.height} width={sizes.width} onResize={onResize} minConstraints={[50, 50]} maxConstraints={[100, 100]}>
        <Segment className="box" 
          style={{
            width: sizes.width + 'px', 
            height: sizes.height + 'px', 
            border:'1px solid #000', 
            position: 'absolute',
            zIndex:1
          }}>
            <Icon className='handle' name="arrows alternate" style={{width:'10px', height:'10px', position: 'absolute', top:0, left:0 }}></Icon>
        </Segment>
      </Resizable>
    </Draggable>)
  }