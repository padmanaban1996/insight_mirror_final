export class Questions {
  _id: string
  title: string
  paragraph: string
  image: string
  matchfollow: Imatch[]
  a: string
  b: string
  c: string
  d: string
  correctAnswer: string
  qtype: string
  createdBy: string
  seconds: number
  answer: boolean
  msg?: string
}
export class Imatch {
  optionLeft: string[]
  optionRight: string[]
  correctAnswers: ImatchAns[]
}
export class ImatchAns {
  opt: string
  ans: string
}