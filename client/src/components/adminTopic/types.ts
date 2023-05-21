export type Theme = {
  id: number,
  title: string,
  theory: {
    content: string,
  },
  tests: Array<any>,
  exercises: Array<any>
}

export type Test ={
  id: number,
  title: string,
  questions: Array<any>
}

export type Exercise ={
  id: number,
  title: string,
  coordiantes?: Array<any>,
  url?: string
}



export type ConnectedChapterTheoryType = {
  theme: Theme,
}