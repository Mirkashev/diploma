import { Button } from "semantic-ui-react";
import { ChapterTheoryInterface } from "../../interfaces";
import dynamic from "next/dynamic";
import TabsNavComponent from "@/components/common/nav/tabs";
import { useRouter } from "next/router";
const CKeditor = dynamic(() => import("@/components/common/ckEditor"), {
  ssr: false,
});

export default function ChapterTheoryComponent({
  sendTheory,
  content,
  setData,
  title,
}: ChapterTheoryInterface) {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <TabsNavComponent
        links={[
          {
            key: "topics",
            name: "Назад",
            onClick: () => router.push("/admin/topics"),
          },
          {
            key: "theory",
            name: "Теория",
            active: !!router.pathname.match("/theory"),
            onClick: () => router.push(`/admin/topics/${id}/theory`),
          },
          {
            key: "tests",
            name: "Тесты",
            active: !!router.pathname.match("/tests"),
            onClick: () => router.push(`/admin/topics/${id}/tests`),
          },
          {
            key: "exercises",
            name: "Упражнения",
            active: !!router.pathname.match("/exercises"),
            onClick: () => router.push(`/admin/topics/${id}/exercises`),
          },
        ]}
      >
        <Button
          style={{
            position: "absolute",
            top: "59px",
            zIndex: 1,
            right: "9px",
            padding: "10px",
            background: "#fff",
            border: "1px solid #000",
            borderRadius: "0px",
          }}
          icon="save"
          onClick={() => sendTheory()}
        />
        <CKeditor
          style={{ width: "100%", height: "85vh" }}
          name="description"
          onChange={setData}
          value={content}
          editorLoaded={true}
        />
      </TabsNavComponent>
    </>
  );
}
