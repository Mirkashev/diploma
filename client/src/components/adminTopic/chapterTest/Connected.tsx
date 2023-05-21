import { useState } from "react";
import ChapterTestComponent from "./Component";
import { ConnectedChapter } from "../interfaces";

// todo: refactor garbage component
const ConnectedChapterTest = ({theme, mutate}: ConnectedChapter)=> {
  const [showTest, toggleShowTest] = useState(false);
  const [testWindowData, setTestWindowData] = useState({});

  return (
    <ChapterTestComponent
      mutate={mutate}
      theme={theme}
      showTest={showTest}
      toggleShowTest={toggleShowTest}
      testWindowData={testWindowData}
      setTestWindowData={setTestWindowData}
    />
  )
}

export default ConnectedChapterTest;