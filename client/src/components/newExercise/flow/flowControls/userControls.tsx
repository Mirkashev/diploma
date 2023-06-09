import { Controls, Panel } from "reactflow";
import { Dropdown, Icon, Menu } from "semantic-ui-react";

const FlowControls = ({ children }: any) => {
  return (
    <>
      <Controls />
      <Panel position="top-left">
        <Menu style={{ width: "100%", zIndex: 9 }}>
          <Dropdown item text="Строительные блоки схемы" simple>
            <Dropdown.Menu>
              <Dropdown.Item>
                <Icon name="dropdown" />
                <span className="text">Приборы </span>
                <Dropdown.Menu style={{ height: "250px", overflowY: "scroll" }}>
                  {children}
                </Dropdown.Menu>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu>
      </Panel>
    </>
  );
};

export default FlowControls;
