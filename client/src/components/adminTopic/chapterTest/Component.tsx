import AddModal from "@/components/common/modal/title/Component";
import Table from "@/components/common/table/Component";
import Test from "./test";
import { ChapterTestsInterface } from "../interfaces";

export default function ChapterTestComponent({
  testData, 
  setTestData, 
  sendTest, 
  theme, 
  showTest, 
  toggleShowTest, 
  testWindowData, 
  setTestWindowData
}: ChapterTestsInterface) {

  if(showTest) {
    return (
      <Test test={testWindowData} toggleShowTest={toggleShowTest}/>
    )
  }

  return(
    <>
      <AddModal
        title={'Добавить тест'} 
        data={testData}
        setData={setTestData}
        save={sendTest}
        id={theme?.id}
      />
      <Table 
        array={theme?.tests}
        toggleShowTest={toggleShowTest}
        setTestWindowData={setTestWindowData}
      />
    </>
  )
}