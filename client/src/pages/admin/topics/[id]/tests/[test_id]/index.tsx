import Page from "@/layouts/page"
import TestView from "@/views/test";

export default function TestPage(){
  return (
    <Page title={'Редактор темы'}>
      <TestView/>
    </Page>
  );
}