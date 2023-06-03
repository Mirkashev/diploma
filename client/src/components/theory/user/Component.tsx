import NavTop2 from "@/components/common/nav/top-layer2/Сomponent";
import { ChapterTheoryInterface } from "../../interfaces";
import parse from 'html-react-parser';
import SideNav from "@/components/common/nav/left-side";

export default function UserTheoryComponent({ content, title }: any){
  return (
    <>
      <NavTop2 title={title}/>
      <SideNav>{parse(content)}</SideNav>
    </>
  );
}