import Page from "@/layouts/page";
import ExercisesView from "@/views/exercises";


export default function ExercisesPage(){
  return (
    <Page title={'Редактор темы'} isAdmin={true} >
      <ExercisesView/>
    </Page>
  )
}