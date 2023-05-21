import AddModal from "@/components/common/modal/title";
import Table from "@/components/common/table/Component";
import Test from "./test";
import { ChapterTestsInterface } from "../interfaces";

export default function ChapterTestComponent({
  mutate,
  theme, 
  showTest, 
  toggleShowTest, 
  testWindowData, 
  setTestWindowData
}: ChapterTestsInterface) {
  
  return(
    <>
      {showTest ? 
        <Test test={testWindowData} toggleShowTest={toggleShowTest}/>
      :
      <>
        <AddModal
          title={'Добавить тест'} 
          id={theme?.id}
          route={'/tests'}
          mutate={mutate}
        />
        <Table 
          array={theme?.tests}
          toggleShowTest={toggleShowTest}
          setTestWindowData={setTestWindowData}
        />
      </>
      }
    </>
  )
}