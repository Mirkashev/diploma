import React, { memo } from "react";
import { Button, Form, Popup } from "semantic-ui-react";
import { Handle, Position } from "reactflow";
import styles from './index.module.css'

const CircleNode = ({ data, id, isConnectable, ...props }: any) => {
  const { label, update, onConnect, type } = data;

  const deviceSymbols = [
      ['A', 'D', 'E', 'F', 'G', 'H', 'K', 'L', 'M', 'P', 'R', 'S', 'T', 'U', 'V', 'W'],
      ['Q', 'J', 'F', 'D'],
      ['I', 'R', 'C', 'S', 'A', 'E', 'T', 'K', 'Y', 'V']
  ]

  const onChange = (field: any, value) => {
    update(id, {
      [field]: value
    });
  };

  return (
    <Popup
      on="click"
      // content='I will not flip!'
      pinned
      style={{
        marginLeft: "8px",
      }}
      trigger={
          <div style={{
              border: ['rsu', 'paz'].includes(type) ? '1px solid black' : undefined
          }}>
              <div
                  className={type === 'paz' ? styles.paz : undefined}
                  style={{
                      width: "45px",
                      height: "45px",
                      borderRadius: "50%",
                      border: type !== 'paz' ? "1px solid black" : undefined,
                      textAlign: "center",
                      padding: "auto",
                      fontSize: "10px",
                  }}
              >
                  <Handle
                      type="source"
                      position={Position.Top}
                      style={{
                          //   background: "transparent",
                          marginTop: "5px",
                          //   color: "#000",
                      }}
                      // onConnect={(params) => console.log('handle onConnect', params)}
                      isConnectable={isConnectable}
                  />
                  <Handle
                      type="target"
                      position={Position.Bottom}
                      style={{
                          //   background: "transparent",
                          marginBottom: "5px",
                          //   color: "#000",
                      }}
                      // onConnect={(params) => console.log('handle onConnect', params)}
                      isConnectable={isConnectable}
                  />
                  {/*<Button onClick={onChange}>Click me</Button>*/}
                  <div
                      style={{
                          wordWrap: "break-word",
                          maxWidth: "18px",
                          lineHeight: "10px",
                          margin: "auto",
                          paddingTop: "12px",
                      }}
                  >
                      {data.label}
                  </div>
              </div>
              <div
                  style={['panel', 'rsu', 'paz'].includes(type)  ? {
                      height: '1px',
                      background: 'black',
                      position: 'relative',
                      width: '45px',
                      top: '-22.5px'
                  } : undefined}
              ></div>
              <div style={type === 'add_panel' ? {
                  height: '3px',
                  // background: 'black',
                  position: 'relative',
                  borderTop: '1px solid black',
                  borderBottom: '1px solid black',
                  width: '45px',
                  top: '-24px'
              } : undefined}>

              </div>
          </div>
      }
    >
      <div style={{
          padding: '5px',
          boxShadow: '2px'
      }}>
        <Form.Input
          defaultValue={data.label}
          label={'Прибор'}
          onChange={(event) => onChange('label', event.target.value)}
        />
          <div style={{marginTop: '8px'}}>
              <Form.Select
                  defaultValue={type}
                  onChange={(event, {value}) => onChange('type', value)}
                  options={
                  [
                      {
                          value: 'field',
                          text: 'Полевой прибор'
                      },
                      {
                          value: 'panel',
                          text: 'Щитовой прибор'
                      },
                      {
                          value: 'add_panel',
                          text: 'Прибор на доп панели'
                      },
                      {
                          value: 'rsu',
                          text: 'Контур РСУ'
                      },
                      {
                          value: 'paz',
                          text: 'Контур ПАЗ'
                      },
                  ]
              }/>
          </div>

      </div>
    </Popup>
  );
};

export default memo(CircleNode);
