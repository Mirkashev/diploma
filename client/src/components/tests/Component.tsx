import AddModal from "@/components/common/modal/";
import Table from "@/components/common/table/Component";
import { ChapterTestsInterface } from "../interfaces";
import { GET_TOPIC_WITH_RELATIONS, TEST_ROUTE } from "@/constants";

export default function ChapterTestComponent({
  themeId,
  tests,
  pathname
}: ChapterTestsInterface) {
  
  return(
    <>
      <AddModal 
        route={TEST_ROUTE + themeId}
        method='POST'
        mutateRoute={GET_TOPIC_WITH_RELATIONS + themeId}
      />
      <Table 
        array={tests}
        pathname={pathname}
        route={TEST_ROUTE}
        mutateRoute={GET_TOPIC_WITH_RELATIONS + themeId}
      />
    </>
  )
}