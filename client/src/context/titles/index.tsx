import React, { createContext, useState } from "react";

const TitlesContext = createContext({
  topicTitle: null,
  testTitle: null,
  exerciseTitle: null,
  groupTitle: null,
  setTopicTitle: (title: string) => {},
  setTestTitle: (title: string) => {},
  setExerciseTitle: (title: string) => {},
  setGroupTitle: (title: string) => {},
});

const TitlesProvider = (props: any) => {
  const [topicTitle, setTopicTitle] = useState("");
  const [testTitle, setTestTitle] = useState("");
  const [exerciseTitle, setExerciseTitle] = useState("");
  const [groupTitle, setGroupTitle] = useState("");

  return (
    <TitlesContext.Provider
      value={{
        topicTitle,
        testTitle,
        exerciseTitle,
        groupTitle,
        setExerciseTitle,
        setTestTitle,
        setTopicTitle,
        setGroupTitle,
      }}
      {...props}
    />
  );
};

export { TitlesContext, TitlesProvider };
