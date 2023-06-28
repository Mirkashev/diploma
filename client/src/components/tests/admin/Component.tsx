import { ChapterTestsInterface } from "../../interfaces";
import { Icon, Table } from "semantic-ui-react";
import TitleModal from "@/components/common/modal/titleNew";
import TopicsTabs from "@/components/common/nav/tabs/topicsTabs";
import ComponentCustomTable from "@/components/common/table/customTable";
import Link from "next/link";
import RowSettings from "@/components/common/table/rowSettings";

const AdminTestComponent = ({ themeId, tests }: ChapterTestsInterface) => {
  return (
    <>
      <TopicsTabs>
        <ComponentCustomTable
          headerArray={[
            <>
              <span style={{ display: "inline-block", marginRight: "4px" }}>
                Список тестов:
              </span>
              <TitleModal
                method="POST"
                route={"/tests/" + themeId}
                mutateRoute={"/topics/" + themeId}
                triggerNode={<Icon name="plus" style={{ cursor: "pointer" }} />}
              />
            </>,
          ]}
        >
          <Table.Body>
            {tests?.map((el, i) => (
              <Table.Row key={el.id}>
                <Table.Cell style={{ display: "flex", padding: 0 }}>
                  <Link
                    href={{
                      pathname: `/admin/topics/${themeId}/tests/${el.id}`,
                    }}
                    style={{
                      display: "block",
                      width: "93%",
                      padding: 10,
                    }}
                  >
                    {el.title}
                  </Link>
                  <RowSettings
                    route={"/tests/" + el.id}
                    mutateRoute={"/topics/" + themeId}
                    title={el.title}
                  />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </ComponentCustomTable>
      </TopicsTabs>
    </>
  );
};

export default AdminTestComponent;
