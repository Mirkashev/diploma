import Page from "@/layouts/page";
import TopicsView from "@/views/topics";

export default function AdminTopicPage() {
  return (
    <Page title={"Темы"}>
      <TopicsView />
    </Page>
  );
}
