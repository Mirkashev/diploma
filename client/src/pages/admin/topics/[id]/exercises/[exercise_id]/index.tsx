import Page from "@/layouts/page";
import ExerciseView from "@/views/exercise";

export default function ExercisePage(){
  return (
    <Page title={'Редактор темы'} isAdmin={true}>
      <ExerciseView/>
    </Page>
  )
}