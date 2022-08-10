import inquirer from 'inquirer'
import QuestionModel from '../model/question.model'

// 命令行交互 询问 questionList 中的问题并获取结果
const input = (questionList: Array<QuestionModel>) => inquirer.prompt(questionList)

export default input
