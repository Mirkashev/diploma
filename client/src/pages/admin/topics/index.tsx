import Page from "@/layouts/page";
import TopicsView from "@/views/topics";


export default function AdminTopicPage(){
  // TODO: понять как прокидывать метаданные для компонентов всех через layout
  return (
    <Page title={'Темы'} >
      <TopicsView/>
    </Page>
  )
}