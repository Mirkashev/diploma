export type Theme = {
  id: number,
  title: string,
  theory: {
    content: string,
  },
  tests: Array<any>,
}

export type Test ={
  id: number,
  title: string,
  questions: Array<any>
}

export type ConnectedChapter = {
  theme: Theme,
}

export type ConnectedChapterTheoryType = {
  theme: Theme,
  editorLoaded: boolean
}