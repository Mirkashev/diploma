import Page from "@/layouts/page";
// import AdminTopicsView from "@/views/adminTopics";
import TopicsView from "@/views/topics";


export default function TopicPage(){
  // TODO: понять как прокидывать метаданные для компонентов всех через layout
  return (
    <Page title={'Темы'} isAdmin={false} >
      <TopicsView/>
    </Page>
  )
}