import TabsNavComponent from "@/components/common/nav/tabs";

import { useRouter } from "next/router";

const ExerciseAdminComponent = ({ data, onSave, children }: any) => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <TabsNavComponent
        links={[
          {
            key: "topics",
            name: "Назад",
            onClick: () => router.push(`/admin/topics`),
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
            active: false,
            onClick: () => router.push(`/admin/topics/${id}/exercises`),
          },
        ]}
      >
        <div
          style={{
            width: "100%",
            height: "75vh",
            border: "1px solid #d4d4d5",
          }}
        >
          {children}
        </div>
      </TabsNavComponent>
    </>
  );
};

export default ExerciseAdminComponent;
