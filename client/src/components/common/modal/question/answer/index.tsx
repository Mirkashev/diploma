import { Form, Icon, Input } from "semantic-ui-react";
// TODO: refactor
const AnswerComponent = ({rows, setRows, keyP, value, isTrue}: any)=> {
  const removeRow = (e: any, keyP: string)=> {
    e.preventDefault();

    let tempArr = rows.filter((el: any) => el.key !== keyP);

    setRows([...tempArr.map((el: any)=> 
        ({
          ...el, 
          props: {
            ...el.props, 
            rows: tempArr
          }
        })
    )])
  }

  return (
    <Form.Field style={{display:'flex', flexGrow:1}}>
      <Input 
        style={{flexGrow:1, width:'100%'}}
        placeholder={`Введите ответ`}
        name='answer'
        defaultValue={value}
        required
      />
      <Input 
        style={{
          flexGrow:1, 
          width:'38px', 
          height:'38px',
          marginLeft:'12px'
        }}
        type="checkbox" 
        name='answer-true'
        defaultChecked={isTrue}
      />
      <Icon
        style={{
          display:'flex', 
          alignItems:'center', 
          justifyContent:'center', 
          border:'1px solid rgba(34,36,38,.15)', 
          width:'38px', 
          height:'38px',
          borderRadius:'3px',
          cursor:'pointer',
          marginLeft:'12px'

        }}
        onClick={(e: any)=> removeRow(e, keyP)}
        name='trash'
      />
    </Form.Field>
  )
}

export default AnswerComponent;