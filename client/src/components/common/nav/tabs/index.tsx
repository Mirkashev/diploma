import { Menu } from "semantic-ui-react";

const TabsNavComponent = ({ children, links, rightNames }: any) => {
  console.log(rightNames);
  return (
    <div>
      <Menu tabular style={{ boxShadow: "none", borderRadius: 0 }}>
        {links?.map((item: any) => (
          <Menu.Item key={item.key} onClick={item.onClick} active={item.active}>
            {item.name}
          </Menu.Item>
        ))}
        <Menu.Menu position="right">
          <Menu.Item style={{ padding: 0 }}>
            <h1 style={{ padding: 0, margin: 0 }}>{rightNames}</h1>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
      {children}
    </div>
  );
};

export default TabsNavComponent;
