import { Dispatch, ReactNode, SetStateAction } from "react";
import { Exercise, Test, Theme } from "./types";
import { KeyedMutator } from "swr";
// TODO: refactor interfaces
export interface AdminThemeInterface {
  theme: Theme,
  stage: string,
  // testModal: ReactNode
  mutate: KeyedMutator<any>
}

export interface ChapterTheoryInterface {
  content: string,
  setData?: Dispatch<SetStateAction<string>>,
  sendTheory?: ()=> void,
  // theme: Theme,
}

export interface ChapterTestsInterface {
  tests: Array<Test>,
  themeId?: string,
  pathname?: string,
}

export interface ChapterExercisesInterface {
  exercises: Array<Exercise>,
  themeId: string,
  pathname: string,
}

export interface TestInterface {
  questions: Array<any>,
  test_id: number,
  title: string,
  deleteQ?: any,
}

export interface ExInterface {
  exercise: Exercise,
  dElements?: Array<ReactNode>,
  sElements?:Array<ReactNode>,
  changeDynamicElements?: (instrumentId:number, imgUrl?: string)=> void,
  instruments?: Array<any>
}

export interface ConnectedChapter  {
  theme: Theme,
  mutate: KeyedMutator<any>

}