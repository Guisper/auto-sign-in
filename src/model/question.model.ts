type ChoiceModel = {
  name: string
  value: number | boolean
}

export default interface QuestionModel {
  name: string
  type: string
  message: string
  mask?: boolean
  validate?: Function
  choices?: Array<string | ChoiceModel>
  default?: string | number
}
