import parse from "html-react-parser";
import TabsNavComponent from "@/components/common/nav/tabs";
import { useRouter } from "next/router";

export default function UserTheoryComponent({ content, title }: any) {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <TabsNavComponent
        links={[
          {
            key: "topics",
            name: "Назад",
            onClick: () => router.push("/user/topics"),
          },
          {
            key: "theory",
            name: "Теория",
            active: !!router.pathname.match("/theory"),
            onClick: () => router.push(`/user/topics/${id}/theory`),
          },
          {
            key: "tests",
            name: "Тесты",
            active: !!router.pathname.match("/tests"),
            onClick: () => router.push(`/user/topics/${id}/tests`),
          },
          {
            key: "exercises",
            name: "Упражнения",
            active: !!router.pathname.match("/exercises"),
            onClick: () => router.push(`/user/topics/${id}/exercises`),
          },
        ]}
      >
        <div
          style={{
            maxHeight: "75vh",
            overflowY: "auto",
            // borderTop: "1px solid #d4d4d5",
            borderBottom: "1px solid #d4d4d5",
            padding: "20px",
          }}
        >
          {parse(content)}
        </div>
      </TabsNavComponent>
    </>
  );
}
