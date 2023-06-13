import { TitlesContext } from "@/context/titles";
import { useContext } from "react";
import { Button, Menu } from "semantic-ui-react";

const TabsNavComponent = ({ children, links }: any) => {
  const { topicTitle, testTitle, exerciseTitle, groupTitle }: any =
    useContext(TitlesContext);
  return (
    <div>
      <Menu tabular style={{ boxShadow: "none", borderRadius: 0 }}>
        {links?.map((item: any) => (
          <Menu.Item key={item.key} onClick={item.onClick} active={item.active}>
            {item.name}
          </Menu.Item>
        ))}
        <Menu.Menu position="right">
          <Menu.Item>
            {groupTitle ? groupTitle : ""}
            {topicTitle ? topicTitle : ""}
            {testTitle ? "/" + testTitle : ""}
            {exerciseTitle ? "/" + exerciseTitle : ""}
          </Menu.Item>
        </Menu.Menu>
      </Menu>
      {children}
    </div>
  );
};

export default TabsNavComponent;
