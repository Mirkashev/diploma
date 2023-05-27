import { useEffect, useState } from "react";
import { Button, Form, Icon, Input, Modal } from "semantic-ui-react";

function AnswerComponent({rows, setRows, keyP, value, isTrue}: any){
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


export default function QuestionModal({title, submit, open, setOpen, triggerNode, question}: any) {
  const [rows, setRows]: any = useState([]);

  const addRow = (e: any)=> {
    e.preventDefault();
    const key = 'q_answer' + (Math.random() * 10 * Math.random() * 100);

    rows.push(<AnswerComponent key={key} keyP={key} rows={rows} setRows={setRows}/>);
    
    setRows([...rows.map((el: any)=> ({...el, props: {...el.props, rows: rows}}))]);
  }

  useEffect(()=> {
    if(question) {
      const answers = question[0].answers;
      answers.forEach((el: any)=> {
        const key = 'q_answer' + (Math.random() * 10 * Math.random() * 100);
        rows.push(<AnswerComponent key={key} keyP={key} rows={rows} setRows={setRows} value={el.title} isTrue={el.isTrue}/>);
      })
  
      setRows([...rows.map((el: any)=> ({...el, props: {...el.props, rows: rows}}))])
    }
  }, [question])


  return (
    <Modal
      onClose={() => {
        setOpen(false);
        setRows([]);
      }}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={triggerNode}
      size="large"
    >
      <Modal.Header>{title ? 'Редактировать вопрос' : 'Добавить вопрос'}</Modal.Header>
        <Modal.Content>
          <Form onSubmit={(e)=> {
            submit(e);
            setRows([]);
          }}> 
            <Form.Field>
              <Form.TextArea 
                placeholder={`Введите вопрос`}
                name='title'
                required
                defaultValue={title}
                />
            </Form.Field>
            <Button onClick={addRow} style={{marginBottom:'12px'}}>Добавить ответ на вопрос</Button>
            {rows}
            <Form.Field>
              <Form.Button
                content='Сохранить'
                type="submit"
              />
            </Form.Field>
          </Form>
        </Modal.Content>

    </Modal>
  )
}