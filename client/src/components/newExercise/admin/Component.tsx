import TopicsTabs from "@/components/common/nav/tabs/topicsTabs";

const ExerciseAdminComponent = ({ data, onSave, children }: any) => {
  return (
    <>
      <TopicsTabs>
        <div
          style={{
            width: "100%",
            height: "75vh",
            border: "1px solid #d4d4d5",
          }}
        >
          {children}
        </div>
      </TopicsTabs>
    </>
  );
};

export default ExerciseAdminComponent;
