import AddModal from "@/components/common/modal";
import Table from "@/components/common/table/Component";
import { ChapterExercisesInterface } from "../../interfaces";
import { GET_TOPIC_WITH_RELATIONS } from "@/constants";

export default function ChapterExComponent({ exercises, themeId, pathname}: ChapterExercisesInterface) {
  console.log(GET_TOPIC_WITH_RELATIONS + themeId)
  return(
    <>
      <AddModal
        route={'/exercises/' + themeId}
        method='POST'
        mutateRoute={GET_TOPIC_WITH_RELATIONS + themeId}
      />
      <Table 
        array={exercises}
        pathname={pathname}
      />
    </>
  )
}