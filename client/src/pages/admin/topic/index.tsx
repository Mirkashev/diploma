import Page from "@/layouts/page";
import AdminTopic from '@/components/adminTopic/index';


export default function TopicPage(){
  return (
    <Page title={'Редактор темы'} isAdmin={true} >
      <AdminTopic/>
    </Page>
  )
}