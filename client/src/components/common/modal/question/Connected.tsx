import { useEffect, useState } from "react";
import QuestionModalComponent from "./Component";
import { patchData, postData } from "@/hooks/fetching";
import AnswerComponent from "./answer/";

const ConnectedQuestionModal = ({
  method,
  route,
  mutateRoute,
  question,
  triggerNode,
}: any) => {
  const [rows, setRows]: any = useState([]);

  const [open, setOpen] = useState(false);
  const send =
    method === "POST"
      ? postData(route, mutateRoute)
      : patchData(route, mutateRoute);

  const submit = async (e: any) => {
    e.preventDefault();

    let reqBody: any = {
      answers: [],
    };

    const formData = new FormData(e.target);

    let counter = 0;

    formData.forEach((value, key) => {
      if (key === "answer") {
        reqBody["answers"] = [
          ...reqBody["answers"],
          { title: value, isTrue: false },
        ];
        counter += 1;
      }

      if (key === "answer-true") {
        reqBody["answers"][counter - 1] = {
          ...reqBody["answers"][counter - 1],
          isTrue: !!value,
        };
      }

      if (key !== "answer" && key !== "answer-true") {
        reqBody[key] = value;
      }
    });

    reqBody = JSON.stringify(reqBody);

    const res = await send.trigger(reqBody);

    if (res) {
      setOpen(false);
    }
  };

  const addRow = (e: any) => {
    e.preventDefault();
    const key = "q_answer" + Math.random() * 10 * Math.random() * 100;

    rows.push(
      <AnswerComponent key={key} keyP={key} rows={rows} setRows={setRows} />
    );

    setRows([
      ...rows.map((el: any) => ({ ...el, props: { ...el.props, rows: rows } })),
    ]);
  };

  useEffect(() => {
    if (question) {
      console.log(question);
      const answers = question?.answers;
      answers.forEach((el: any) => {
        const key = "q_answer" + Math.random() * 10 * Math.random() * 100;
        rows.push(
          <AnswerComponent
            key={key}
            keyP={key}
            rows={rows}
            setRows={setRows}
            value={el.title}
            isTrue={el.isTrue}
          />
        );
      });

      setRows([
        ...rows.map((el: any) => ({
          ...el,
          props: { ...el.props, rows: rows },
        })),
      ]);
    }
  }, [question]);

  return (
    <QuestionModalComponent
      open={open}
      setOpen={setOpen}
      triggerNode={triggerNode}
      setRows={setRows}
      submit={submit}
      question={question}
      addRow={addRow}
      rows={rows}
    />
  );
};

export default ConnectedQuestionModal;
