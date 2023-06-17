import { ChapterTestsInterface } from "../../interfaces";
import { Button, Icon, Table } from "semantic-ui-react";
import TitleModal from "@/components/common/modal/titleNew";
import TopicsTabs from "@/components/common/nav/tabs/topicsTabs";
import TableContainerComponent from "@/components/common/table/tableContainer";
import TableHeaderComponent from "@/components/common/table/tableHeader";
import TableRowTitleComponent from "@/components/common/table/tableRowTitle";
import TableHeaderTitleComponent from "@/components/common/table/tableHeaderTitle";

const AdminTestComponent = ({
  themeId,
  tests,
  title,
}: ChapterTestsInterface) => {
  return (
    <>
      <TopicsTabs>
        <TableContainerComponent>
          <TableHeaderTitleComponent
            title={"Список тестов:"}
            route={"/tests/" + themeId}
            mutateRoute={"/topics/" + themeId}
          />
          <Table.Body>
            {tests?.map((el, i) => (
              <TableRowTitleComponent
                key={el.id}
                route={"/tests/" + el.id}
                mutateRoute={"/topics/" + themeId}
                title={el.title}
                pathname={`/admin/topics/${themeId}/tests/${el.id}`}
              />
            ))}
          </Table.Body>
        </TableContainerComponent>
      </TopicsTabs>
    </>
  );
};

export default AdminTestComponent;
