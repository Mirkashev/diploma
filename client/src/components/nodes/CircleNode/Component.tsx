import React, {memo} from 'react';
import {Button, Form, Popup} from "semantic-ui-react";
import {Handle, Position} from "reactflow";

const CircleNode = ({data, id, isConnectable, ...props}) => {
    const {label, update, onConnect} = data;


    const onChange = (label) => {
        update(id, {
            label
        })
    }

    return (
        <Popup
            on='click'
            // content='I will not flip!'
            pinned
            style={{
                marginLeft: '8px'
            }}
            trigger={
            <div style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                border: '1px solid black',
                textAlign: 'center',
                padding: 'auto',
                fontSize: '10px'
            }}>
                <Handle
                    type="source"
                    position={Position.Top}
                    style={{ background: 'transparent', marginTop: '5px' }}
                    // onConnect={(params) => console.log('handle onConnect', params)}
                    isConnectable={isConnectable}
                />
                <Handle
                    type="target"
                    position={Position.Bottom}
                    style={{ background: 'transparent', marginBottom: '5px' }}
                    // onConnect={(params) => console.log('handle onConnect', params)}
                    isConnectable={isConnectable}
                />
                {/*<Button onClick={onChange}>Click me</Button>*/}
                <div style={{wordWrap: 'break-word', maxWidth: '18px', lineHeight: '10px', margin: 'auto', paddingTop: '4px'}}>{data.label}</div>
            </div>
        }>
            <div>
                <Form.Input defaultValue={data.label} onChange={(event) => onChange(event.target.value)}/>
            </div>
        </Popup>

    )
}

export default memo(CircleNode);
