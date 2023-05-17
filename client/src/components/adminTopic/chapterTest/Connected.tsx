import { useState } from "react";
import ChapterTestComponent from "./Component";
import { ConnectedChapter } from "../types";

const sendTest = async (id: number, data: string)=> {
  const response = await fetch('http://localhost:3030/tests', {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
      "Authorization" : `Bearer ${localStorage.getItem('token')}`
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify({title: data, themeId: id})
  })

  if(!response.ok) {
    alert('smthing wrong');
  }
}


const ConnectedChapterTest = ({theme}: ConnectedChapter)=> {
  const [testData, setTestData] = useState('');
  const [showTest, toggleShowTest] = useState(false);
  // const []
  const [testWindowData, setTestWindowData] = useState({});

  return (
    <ChapterTestComponent
      testData={testData}
      setTestData={setTestData}
      sendTest={sendTest}
      theme={theme}
      showTest={showTest}
      toggleShowTest={toggleShowTest}
      testWindowData={testWindowData}
      setTestWindowData={setTestWindowData}
    />
  )
}

export default ConnectedChapterTest;