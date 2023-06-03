import { useRouter } from "next/router";
import UserTestComponent from "./Component";
import { useContext } from "react";
import { usePostData } from "@/hooks/fetching";
import { AuthContext } from "@/context/auth";
import NavTop2 from "@/components/common/nav/top-layer2/Сomponent";
import SideNav from "@/components/common/nav/left-side";

const ConnectedUserTest = ({ questions, title, mainTitle }:any)=> {
  const router = useRouter();
  const { test_id } = router.query;

  const {user}:any = useContext(AuthContext);

  const send = usePostData('/results/');

  const submit = async  (e: any)=>{
    e.preventDefault();

    let reqBody: any = {
      userId: user?.sub,
      testId: test_id,
      questions: [],
    };

    const formData = new FormData(e.target);

    let counter = 0;
    let questionCounter = -1;
    let isTrue = false;

    formData.forEach((value, key) => {
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

    const res: any = await send.trigger(reqBody);
    if(res){
      alert('Вы набрали ' + res.percent.toFixed(1) + '%');
      router.back();
    }
  }

  return (
    <>
      <NavTop2 title={mainTitle}/>
      <SideNav>
        <UserTestComponent
          questions={questions}
          submit={submit}
          title={title}
        />
      </SideNav>
    </>

  )
}

export default ConnectedUserTest;