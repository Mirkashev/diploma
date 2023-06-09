import { Controls, Panel } from "reactflow";
import { Dropdown, Icon, Menu } from "semantic-ui-react";

const FlowControlsAdmin = ({
  addCircleNode,
  addSquareNode,
  addArrowNode,
}: any) => {
  return (
    <>
      <Controls />
      <Panel position="top-left">
        <Menu style={{ width: "100%" }}>
          <Dropdown item text="Строительные блоки схемы" simple>
            <Dropdown.Menu>
              <Dropdown.Item>
                <Icon name="dropdown" />
                <span className="text">Приборы </span>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={addCircleNode}>
                    Полевой прибор
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Item>
              <Dropdown.Item>
                <Icon name="dropdown" />
                <span className="text">Тело схемы</span>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={addSquareNode}>
                    Синий прямоугольник
                  </Dropdown.Item>
                  {/* <Dropdown.Item>Желтый квадрат</Dropdown.Item> */}
                </Dropdown.Menu>
              </Dropdown.Item>
              <Dropdown.Item>
                <Icon name="dropdown" />
                <span className="text">Линии</span>

                <Dropdown.Menu>
                  <Dropdown.Item type="default" onClick={addArrowNode}>
                    Горизонтальная линия
                  </Dropdown.Item>
                  <Dropdown.Item type="default-vertical" onClick={addArrowNode}>
                    Вертикальная линия
                  </Dropdown.Item>
                  <Dropdown.Item type="right" onClick={addArrowNode}>
                    Горизонтальная линия вправо
                  </Dropdown.Item>
                  <Dropdown.Item type="left" onClick={addArrowNode}>
                    Горизонтальная линия влево
                  </Dropdown.Item>
                  <Dropdown.Item type="up" onClick={addArrowNode}>
                    Вертикальная линия вверх
                  </Dropdown.Item>
                  <Dropdown.Item type="down" onClick={addArrowNode}>
                    Вертикальная линия вниз
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Item>
              <Dropdown.Item>
                <Icon name="dropdown" />
                <span className="text">Элементы схемы</span>
                <Dropdown.Menu>
                  <Dropdown.Item>Регулирующий клапан</Dropdown.Item>
                  <Dropdown.Item>Отсекатель</Dropdown.Item>
                  <Dropdown.Item>Задвижка</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu>
      </Panel>
    </>
  );
};

export default FlowControlsAdmin;
