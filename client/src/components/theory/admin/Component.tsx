import { Button, Icon } from "semantic-ui-react";
import { ChapterTheoryInterface } from "../../interfaces";
import dynamic from "next/dynamic";
import TopicsTabs from "@/components/common/nav/tabs/topicsTabs";
const CKeditor = dynamic(() => import("@/components/common/ckEditor"), {
  ssr: false,
});

export default function ChapterTheoryComponent({
  sendTheory,
  content,
  setData,
  title,
}: ChapterTheoryInterface) {
  return (
    <>
      <TopicsTabs>
        <Icon
          name="save"
          size="large"
          style={{
            position: "absolute",
            top: 54,
            zIndex: 1,
            right: 2,
            padding: 10,
            width: 39,
            height: 39,
            cursor: "pointer",
          }}
          onClick={() => sendTheory()}
        />
        <CKeditor
          style={{ width: "100%", height: "85vh" }}
          name="description"
          onChange={setData}
          value={content}
          editorLoaded={true}
        />
      </TopicsTabs>
    </>
  );
}
