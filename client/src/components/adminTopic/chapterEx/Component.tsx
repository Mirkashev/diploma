import AddModal from "@/components/common/modal/title/Component";
import Table from "@/components/common/table/Component";
import Exercise from "./exercise";
import { ChapterTestsInterface } from "../interfaces";

export default function ChapterExComponent({
  testData, 
  setTestData, 
  sendTest, 
  theme, 
  showTest, 
  toggleShowTest, 
  testWindowData, 
  setTestWindowData
}: ChapterTestsInterface) {
  // todo: refactor
  if(showTest) {
    return (
      <Exercise exercise={testWindowData} toggleShowTest={toggleShowTest}/>
    )
  }

  return(
    <>
      <AddModal
        title={'Добавить упражнение'} 
        data={testData}
        setData={setTestData}
        save={sendTest}
        id={theme?.id}
      />
      <Table 
        array={theme?.exercises}
        toggleShowTest={toggleShowTest}
        setTestWindowData={setTestWindowData}
      />
    </>
  )
}