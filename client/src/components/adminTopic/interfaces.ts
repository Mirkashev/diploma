import { Dispatch, ReactNode, SetStateAction } from "react";
import { Exercise, Test, Theme } from "./types";
import { KeyedMutator } from "swr";
// TODO: refactor interfaces
export interface AdminThemeInterface {
  theme: Theme,
  chapter: string,
  handleChapter: Dispatch<SetStateAction<string>>,
  // testModal: ReactNode
  mutate: KeyedMutator<any>
}

export interface ChapterTheoryInterface {
  data: string,
  setData: Dispatch<SetStateAction<string>>,
  sendTheory: (id: number, data: string)=> {},
  theme: Theme,
}

export interface ChapterTestsInterface {
  theme: Theme,
  // testData: string,
  // setTestData: Dispatch<SetStateAction<string>>,
  // sendTest: (id: number, data: string)=> {},
  mutate: KeyedMutator<any>,
  showTest: boolean,
  toggleShowTest: Dispatch<SetStateAction<boolean>>,
  testWindowData: any,
  setTestWindowData:Dispatch<SetStateAction<Test>>,
}

export interface TestInterface {
  test: Test,
  toggleShowTest: Dispatch<SetStateAction<boolean>>,
}

export interface ExInterface {
  exercise: Exercise,
  toggleShowTest: Dispatch<SetStateAction<boolean>>,
  dElements?: Array<ReactNode>,
  changeDynamicElements?: ()=> void,
  instruments?: Array<any>

}

export interface ConnectedChapter  {
  theme: Theme,
  mutate: KeyedMutator<any>

}