import NavTop2 from "@/components/common/nav/top-layer2/Сomponent";
import { ChapterTheoryInterface } from "../../interfaces";
import parse from "html-react-parser";
import SideNav from "@/components/common/nav/left-side";

export default function UserTheoryComponent({ content, title }: any) {
  return (
    <>
      <NavTop2 title={title} />
      <SideNav>
        <div
          style={{
            height: "75vh",
            overflowY: "scroll",
            borderTop: "1px solid #d4d4d5",
            borderBottom: "1px solid #d4d4d5",
            padding: "20px 0",
          }}
        >
          {parse(content)}
        </div>
      </SideNav>
    </>
  );
}
