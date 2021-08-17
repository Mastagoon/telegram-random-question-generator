const { Telegraf } = require('telegraf')
const questions = require("./data/questionList.json").data

require("dotenv").config()

const repeated = []


const bot = new Telegraf(process.env.BOT_TOKEN)
bot.launch()

//we're gonna use the text event instead of bot.command. to support arabic commands.
bot.on(`text`, async ctx => {
    if(ctx.message.text.toLowerCase() === "question")
        axeQuestion(ctx)
})

const axeQuestion = ctx => {
    const q = questions[Math.floor(Math.random() * questions.length)]
    if(repeated.includes(q.question)) return axeQuestion(ctx)
    repeated.push(q.question)
    ctx.telegram.sendMessage(ctx.message.chat.id, q.question)    
}

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))