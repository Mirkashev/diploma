import { useRouter } from "next/router";
import { useContext } from "react";
import { TitlesContext } from "@/context/titles";
import { Button, Menu } from "semantic-ui-react";

const TopicsTabs = ({ children }: any) => {
  const router = useRouter();
  const { topicTitle, testTitle, exerciseTitle }: any =
    useContext(TitlesContext);

  const { id } = router.query;

  const isAdminPage = !!router.pathname.match("admin");

  console.log(topicTitle);

  return (
    <div>
      <div
        style={{ display: "flex", marginBottom: 10, alignItems: "flex-end" }}
      >
        <Button
          onClick={() =>
            router.push(isAdminPage ? `/admin/topics` : "/user/topics")
          }
          style={{
            height: 42,
            width: "150px",
            marginRight: 20,
            // margin: 0,
            // borderRadius: "4px",
            background: "#fff",
            border: "1px solid rgba(34, 36, 38, 0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          К списку тем
        </Button>
        <Menu
          tabular
          style={{
            boxShadow: "none",
            borderRadius: 0,
            width: "100%",
            margin: 0,
          }}
        >
          <Menu.Item
            onClick={() =>
              router.push(
                isAdminPage
                  ? `/admin/topics/${id}/theory`
                  : `/user/topics/${id}/theory`
              )
            }
            active={!!router.pathname.match("/theory")}
          >
            Теория
          </Menu.Item>
          <Menu.Item
            onClick={() =>
              router.push(
                isAdminPage
                  ? `/admin/topics/${id}/exercises`
                  : `/user/topics/${id}/exercises`
              )
            }
            active={
              exerciseTitle ? false : !!router.pathname.match("/exercises")
            }
          >
            Упражнения
          </Menu.Item>
          {exerciseTitle ? (
            <Menu.Item active={!!router.pathname.match("/exercises/")}>
              Упражнение: {exerciseTitle}
            </Menu.Item>
          ) : null}

          <Menu.Item
            onClick={() =>
              router.push(
                isAdminPage
                  ? `/admin/topics/${id}/tests`
                  : `/user/topics/${id}/tests`
              )
            }
            active={testTitle ? false : !!router.pathname.match("/tests")}
          >
            Тесты
          </Menu.Item>
          {testTitle ? (
            <Menu.Item active={!!router.pathname.match("/tests/")}>
              Тест: {testTitle}
            </Menu.Item>
          ) : null}
          <Menu.Menu position="right">
            <Menu.Item style={{ padding: 0 }}>
              <h1 style={{ padding: 0, margin: 0, fontSize: 18 }}>{`${
                topicTitle ? topicTitle : ""
              }`}</h1>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </div>

      {children}
    </div>
  );
};

export default TopicsTabs;
