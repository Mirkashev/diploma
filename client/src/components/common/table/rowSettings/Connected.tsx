import { Icon } from "semantic-ui-react";
import TitleModal from "../../modal/titleNew";
import ComponentRowSettings from "./Component";
import { ReactNode } from "react";
import QuestionModalComponent from "../../modal/question/Component";

const ConnectedRowSettings = ({
  route,
  mutateRoute,
  title,
  type,
  question,
}: any) => {
  let modal: ReactNode = (
    <TitleModal
      route={route}
      mutateRoute={mutateRoute}
      method="PATCH"
      title={title}
      triggerNode={
        <Icon style={{ cursor: "pointer" }} name="pencil alternate" />
      }
    />
  );

  if (type === "question") {
    modal = (
      <QuestionModalComponent
        route={route}
        mutateRoute={mutateRoute}
        method="PATCH"
        title={title}
        question={question}
        triggerNode={
          <Icon style={{ cursor: "pointer" }} name="pencil alternate" />
        }
      />
    );
  }

  // if (type === "group") {
  // }

  // if (type === "user") {
  // }
  return (
    <ComponentRowSettings
      route={route}
      mutateRoute={mutateRoute}
      modal={modal}
    />
  );
};

export default ConnectedRowSettings;
