import { useState } from "react";
import ChapterExComponent from "./Component";
import { ConnectedChapter } from "../interfaces";
import { usePostData } from "@/hooks/fetching";


const ConnectChapterEx = ({theme, mutate}: ConnectedChapter)=> {
  const [testData, setTestData] = useState('');
  const [showTest, toggleShowTest] = useState(false);
  const [testWindowData, setTestWindowData] = useState({});
  const { trigger, isMutating, error} = usePostData('/exercises');


  const sendTest = async (id: number, data: string)=> {
    const temp: any = JSON.stringify({title: data, themeId: id})
    trigger(temp);

    if(error) {
      alert("error");
      return;
    }

    mutate();
  }

  return (
    <ChapterExComponent
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

export default ConnectChapterEx;