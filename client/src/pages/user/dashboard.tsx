import Page from "@/layouts/page";
// import AdminTopicsView from "@/views/adminTopics";
import TopicsView from "@/views/topics";
import DashboardView from "@/views/DashboardView";


export default function Dashboard(){
    // TODO: понять как прокидывать метаданные для компонентов всех через layout
    return (
        <Page title={'Дэшборд'} isAdmin={false} >
            <DashboardView/>
        </Page>
    )
}
