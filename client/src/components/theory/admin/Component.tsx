import { Button } from "semantic-ui-react";
import { ChapterTheoryInterface } from "../../interfaces";
import dynamic from "next/dynamic";
import SideNav from "@/components/common/nav/left-side";
import NavTop2 from "@/components/common/nav/top-layer2/Сomponent";
const CKeditor = dynamic(() => import("@/components/common/ckEditor"), { ssr: false });

export default function ChapterTheoryComponent({ sendTheory, content, setData, title }: ChapterTheoryInterface){
  return (
    <>
      <NavTop2 title={title} activeButton={
        <Button 
          onClick={sendTheory} 
          type="submit"
          style={{background:'rgba(255,255,255,.85)', color:'#000'}}
        >Сохранить
        </Button>
      }/>
      <SideNav>

        <CKeditor
          style={{width:'100%'}}
          name="description"
          onChange={setData}
          value={content}
          editorLoaded={true}
        />
      </SideNav>

  </>
  )
}