import { Dispatch, ReactNode, SetStateAction } from "react";
import { Test, Theme } from "./types";
// TODO: refactor interfaces
export interface AdminThemeInterface {
  editorLoaded: boolean,
  theme: Theme,
  chapter: string,
  handleChapter: Dispatch<SetStateAction<string>>,
  // testModal: ReactNode
}

export interface ChapterTheoryInterface {
  editorLoaded: boolean,
  data: string,
  setData: Dispatch<SetStateAction<string>>,
  sendTheory: (id: number, data: string)=> {},
  theme: Theme
}

export interface ChapterTestsInterface {
  theme: Theme,
  testData: string,
  setTestData: Dispatch<SetStateAction<string>>,
  sendTest: (id: number, data: string)=> {},
  showTest: boolean,
  toggleShowTest: Dispatch<SetStateAction<boolean>>
  testWindowData: any,
  setTestWindowData:Dispatch<SetStateAction<Test>>
}

export interface TestInterface {
  test: Test
  toggleShowTest: Dispatch<SetStateAction<boolean>>
}