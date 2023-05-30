import { Button } from "semantic-ui-react";
import { ChapterTheoryInterface } from "../../interfaces";
import dynamic from "next/dynamic";
const CKeditor = dynamic(() => import("@/components/common/ckEditor"), { ssr: false });

export default function ChapterTheoryComponent({ sendTheory, content, setData }: ChapterTheoryInterface){
  return (
    <>
      <Button 
        onClick={sendTheory} 
        type="submit"
        style={{marginTop:'20px', position: 'absolute', zIndex: '1', top: '-55px', right:'10px'}}
      >Сохранить
      </Button>
        <CKeditor
          style={{width:'100%'}}
          name="description"
          onChange={(data: string) => {
            setData(data);
          }}
          value={content}
          editorLoaded={true}
        />
  </>
  )
}