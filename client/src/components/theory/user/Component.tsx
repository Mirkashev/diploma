import { ChapterTheoryInterface } from "../../interfaces";
import parse from 'html-react-parser';

export default function UserTheoryComponent({ content }: ChapterTheoryInterface){
  return <>{parse(content)}</>
}