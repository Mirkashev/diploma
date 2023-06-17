import parse from "html-react-parser";
import TopicsTabs from "@/components/common/nav/tabs/topicsTabs";

export default function UserTheoryComponent({ content, title }: any) {
  return (
    <>
      <TopicsTabs>
        <div
          style={{
            maxHeight: "75vh",
            overflowY: "auto",
            // borderTop: "1px solid #d4d4d5",
            borderBottom: "1px solid #d4d4d5",
            padding: "20px",
          }}
        >
          {parse(content)}
        </div>
      </TopicsTabs>
    </>
  );
}
