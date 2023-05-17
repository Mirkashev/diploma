// import CKeditor from "@/components/common/ckEditor";
import { Button } from "semantic-ui-react";
import { ChapterTheoryInterface } from "../interfaces";
import dynamic from "next/dynamic";
const CKeditor = dynamic(() => import("@/components/common/ckEditor"), { ssr: false });

export default function ChapterTheoryComponent({ theme, editorLoaded, sendTheory, data, setData }: ChapterTheoryInterface){

  return (
    <>
      <Button 
        onClick={()=> sendTheory(theme.id, data)} 
        style={{marginTop:'20px', position: 'absolute', zIndex: '1', top: '-55px', right:'10px'}}
      >Сохранить
      </Button>
      <CKeditor
        style={{width:'100%'}}
        name="description"
        onChange={(data: string) => {
          setData(data);
        }}
        value={data}
        editorLoaded={editorLoaded}
      />
  </>
  )
}