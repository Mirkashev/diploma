import SideNav from "@/components/common/nav/left-side";
import NavTop2 from "@/components/common/nav/top-layer2/Сomponent";
import NavTop3 from "@/components/common/nav/top-layer3/Сomponent";
import {
  Button,
  Container,
  Dropdown,
  Icon,
  Menu,
  TextArea,
} from "semantic-ui-react";

const ExerciseAdminComponent = ({ data, onSave, children }: any) => {
  return (
    <>
      <NavTop2 title={data?.theme?.title} />
      <SideNav>
        <Container style={{ height: "55vh" }}>
          <NavTop3 title={data?.title || "загрузка..."}>
            <Button onClick={onSave} style={{ borderRadius: 0, margin: 0 }}>
              Сохранить схему
            </Button>
          </NavTop3>
          <TextArea
            placeholder="Введите описание задачи"
            style={{
              width: "100%",
              heigh: "10vh",
              resize: "none",
              borderRadius: "0 0 4px 4px",
              border: "1px solid #d4d4d5",
              padding: "10px",
              marginBottom: "8px",
            }}
          ></TextArea>
          <div
            style={{
              width: "100%",
              height: "100%",
              border: "1px solid #d4d4d5",
              borderRadius: "4px",
            }}
          >
            {children}
          </div>
        </Container>
      </SideNav>
    </>
  );
};

export default ExerciseAdminComponent;
