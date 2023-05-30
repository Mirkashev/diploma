import { Button, Dropdown, Form, Icon, Table } from "semantic-ui-react";
import { TestInterface } from "../../interfaces";
import NavTop3 from "../../common/nav/top-layer3/Сomponent";
import { useGetData, usePostData } from "@/hooks/fetching";
import { useContext } from "react";
import { AuthContext } from "@/context/auth";
import { useRouter } from "next/router";
import parsePathName from "../../../utils/parsePathname"

function UserTestQuestionComponent({questionId}: any) {
  const {data, isLoading, isError} = useGetData('/questions/getone/' + questionId);
  console.log(data?.[0])

  if(isLoading || !questionId) return <div>...Loading</div>;

  if(isError) return <div>There is some error, try to update page</div>

  return(
    <div>
      <div>
        <span>{data?.[0]?.title}</span>
        <input style={{display:'none'}} type='text' name='question' value={data?.[0]?.id} readOnly/>
      </div>
      <div>
        {data?.[0]?.answers?.map((el: any)=> {
          return(
          <div key={el.id} style={{display:'flex', alignItems:'center'}}>
            <input name='answer-true' type='checkbox'/>
            <input style={{display:'none'}} type='text' name='answer' value={el.id} readOnly/>
            <span style={{marginRight:'10px'}}>{el.title}</span>
          </div>
          )
        })}
      </div>


    </div>
  )

}

export default function UserTestComponent({ questions, test_id, title }: TestInterface){
  const router = useRouter();

  const {user}:any = useContext(AuthContext);

  const send = usePostData('/results/');


  const submit = async  (e: any)=>{
    e.preventDefault();

    let reqBody: any = {
      userId: user?.sub,
      testId: test_id,
      questions: [],
      // answers: [],
    };

    const formData = new FormData(e.target);

    let counter = 0;
    let questionCounter = -1;
    let isTrue = false;

    formData.forEach((value, key) => {
      // console.log(key);

      if(key === 'question') {
        reqBody.questions.push({questionId: +value, answers :[]});
        questionCounter += 1;
      }

      if(key === 'answer-true') {
        isTrue = true;
      }

      if(key === 'answer') {
        reqBody?.questions?.[questionCounter]?.answers.push({id: +value, isTrue: isTrue});
        counter += 1;
        isTrue = false;
      }
    });

    console.log(reqBody);


    reqBody = JSON.stringify(reqBody);

    // console.log(reqBody);

    const res: any = await send.trigger(reqBody);
    if(res){
      alert('Вы набрали ' + res.percent.toFixed(1) + '%');
      router.back();
    }

    // if(res) {
    //   setOpen(false);
    // }
  }

  return(
    <Form onSubmit={submit}>
      <NavTop3 title={title}>
        <Button type='submit' style={{margin: 0, borderRadius:0}}>Завершить тест</Button>
      </NavTop3>
      <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Вопрос</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
        <Table.Body>
          {questions?.map((el, i) => 
            <Table.Row key={el.title + i}>
              <Table.Cell>
                <UserTestQuestionComponent questionId={el?.id}/>
              </Table.Cell>
            </Table.Row>)}
      </Table.Body>
    </Table>
    </Form>
  )
}